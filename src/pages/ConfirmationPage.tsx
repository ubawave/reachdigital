import type { Booking } from "../api";
import { formatPrice } from "../data/listings";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page, id?: string) => void; booking: Booking | null };

const fmtDate = (d?: string) => (d ? d.slice(0, 10) : "—");

export default function ConfirmationPage({ onNav, booking }: Props) {
  const ref = booking?.reference || "RD-000000";
  const paid = booking?.status === "PAID";

  return (
    <div style={{ maxWidth: 640, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
      {/* Success icon */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "linear-gradient(135deg, var(--primary), #15803d)",
        margin: "0 auto 28px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36,
        boxShadow: "0 0 0 16px rgba(22,163,74,0.08)",
      }}>
        ✓
      </div>

      <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: "-0.02em", marginBottom: 12 }}>
        {paid ? "Booking Confirmed!" : "Booking Request Received"}
      </h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
        {paid
          ? "Your payment has been received and your campaign slot is secured. Our team will contact you within 24 hours."
          : "Your booking has been submitted. Complete payment to confirm your campaign slot."}
      </p>

      {/* Reference card */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28, marginBottom: 28, textAlign: "left" }}>
        {/* Ref number */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 4 }}>Booking Reference</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "var(--primary)", letterSpacing: "0.05em" }}>{ref}</p>
          </div>
          <div style={{ background: paid ? "rgba(34,197,94,0.1)" : "rgba(251,191,36,0.1)", border: paid ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(251,191,36,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: paid ? "#22c55e" : "#fbbf24", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {paid ? "Payment Confirmed" : "Pending Payment"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Advertising Space", value: booking?.listing.name || "Advertising space" },
            { label: "Location", value: booking?.listing.location || "—" },
            { label: "Campaign", value: booking?.campaign || "—" },
            { label: "Campaign Dates", value: `${fmtDate(booking?.startDate)} – ${fmtDate(booking?.endDate)}` },
            { label: "Total Amount", value: booking ? formatPrice(booking.total) : "—" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "right", maxWidth: "60%" }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's next */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 24, marginBottom: 28, textAlign: "left" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>What happens next?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "📧", title: "Confirmation email sent", desc: "Check your inbox for the booking summary." },
            { icon: "📞", title: "Our team will call you", desc: "Within 24 hours to confirm your booking." },
            { icon: "🖼️", title: "Submit your artwork", desc: "Send campaign artwork when ready — no rush." },
            { icon: "🚀", title: "Campaign goes live", desc: "Your ad appears on your chosen start date." },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: 12 }}>
              <div style={{ fontSize: 20, flexShrink: 0, width: 32, textAlign: "center" }}>{item.icon}</div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => onNav("dashboard")}
          style={{
            width: "100%",
            background: "var(--primary)",
            border: "none",
            cursor: "pointer",
            padding: "13px",
            borderRadius: "var(--radius)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--primary-foreground)",
          }}
        >
          View Booking in Dashboard →
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              flex: 1,
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              padding: "11px",
              borderRadius: "var(--radius)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            ↓ Download Confirmation
          </button>
          <button
            onClick={() => onNav("contact")}
            style={{
              flex: 1,
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              padding: "11px",
              borderRadius: "var(--radius)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            Contact Support
          </button>
        </div>
        <button
          onClick={() => onNav("search")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "11px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--muted-foreground)",
          }}
        >
          Browse More Ad Spaces
        </button>
      </div>
    </div>
  );
}
