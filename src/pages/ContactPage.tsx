import { useState } from "react";
import { contactApi } from "../api";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page) => void };

export default function ContactPage({ onNav }: Props) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setBusy(true);
    try {
      await contactApi.send({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject || "General Enquiry",
        message: form.message,
      });
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send message");
    } finally {
      setBusy(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "11px 14px",
    color: "var(--foreground)",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--muted-foreground)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6,
  };

  if (sent) {
    return (
      <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>✉️</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 12 }}>Message Sent!</h2>
        <p style={{ color: "var(--secondary-foreground)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          Thanks for getting in touch. Our team will respond within 24 business hours.
        </p>
        <button onClick={() => onNav("home")} style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Get in touch</p>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.03em", marginBottom: 12 }}>Contact Reach Digital</h1>
        <p style={{ color: "var(--secondary-foreground)", fontSize: 17 }}>We'd love to help you find the right advertising space.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "start" }} className="contact-layout">
        {/* Form */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" placeholder="Babatunde Folarin" value={form.name} onChange={e => update("name", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" placeholder="you@company.com" value={form.email} onChange={e => update("email", e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Phone</label>
            <input type="tel" placeholder="+234 812 345 6789" value={form.phone} onChange={e => update("phone", e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Subject</label>
            <select value={form.subject} onChange={e => update("subject", e.target.value)}
              style={{ ...inputStyle, colorScheme: "dark", appearance: "none" }}>
              <option value="">Select a subject</option>
              {["Booking Enquiry", "Space Availability", "Technical Issue", "Billing", "Partnership", "Other"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Message *</label>
            <textarea
              placeholder="Tell us about your campaign requirements, budget, and target locations..."
              value={form.message}
              onChange={e => update("message", e.target.value)}
              rows={6}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          {error && (
            <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius)", padding: 12, marginBottom: 16, fontSize: 13, color: "#f87171" }}>
              {error}
            </div>
          )}
          <button
            onClick={submit}
            disabled={busy}
            style={{ width: "100%", background: "var(--primary)", border: "none", cursor: busy ? "not-allowed" : "pointer", padding: "13px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--primary-foreground)", opacity: busy ? 0.7 : 1 }}
          >
            {busy ? "Sending…" : "Send Message →"}
          </button>
        </div>

        {/* Info sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "📧", title: "Email", value: "hello@reachdigital.ng", sub: "We reply within 24 hours" },
            { icon: "📞", title: "Phone", value: "+234 812 345 6789", sub: "Mon–Fri, 9am–6pm WAT" },
            { icon: "📍", title: "Head Office", value: "3b Eko Atlantic Way, VI", sub: "Lagos, Nigeria" },
          ].map(item => (
            <div key={item.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{item.value}</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{item.sub}</p>
              </div>
            </div>
          ))}

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Prefer to browse first?</p>
            <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: 16 }}>Explore our full inventory of 500+ advertising spaces across Nigeria.</p>
            <button onClick={() => onNav("search")} style={{ width: "100%", background: "var(--primary)", border: "none", cursor: "pointer", padding: "10px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
              Browse Ad Spaces →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
