import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

type Page =
  | "home"
  | "search"
  | "detail"
  | "booking"
  | "confirmation"
  | "dashboard"
  | "how-it-works"
  | "about"
  | "contact"
  | "login"
  | "register";

type Props = { onNav: (p: Page) => void };

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

export default function RegisterPage({ onNav }: Props) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", company: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    setError("");
    setBusy(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        company: form.company || undefined,
      });
      onNav("dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Create your account
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 15 }}>
          Book and manage advertising spaces in minutes.
        </p>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28 }}>
        {error && (
          <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius)", padding: 12, marginBottom: 16, fontSize: 13, color: "#f87171" }}>
            {error}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input type="text" placeholder="Adaeze Okonkwo" value={form.name} onChange={e => update("name", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Company</label>
            <input type="text" placeholder="Your Company Ltd" value={form.company} onChange={e => update("company", e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" placeholder="you@company.com" value={form.email} onChange={e => update("email", e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>Phone</label>
            <input type="tel" placeholder="+234 812 345 6789" value={form.phone} onChange={e => update("phone", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password *</label>
            <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => update("password", e.target.value)} style={inputStyle} />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={busy}
          style={{ width: "100%", background: "var(--primary)", border: "none", cursor: busy ? "not-allowed" : "pointer", padding: "13px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--primary-foreground)", opacity: busy ? 0.7 : 1 }}
        >
          {busy ? "Creating account…" : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <button onClick={() => onNav("login")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
