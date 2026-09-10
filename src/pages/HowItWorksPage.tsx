type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page, id?: string) => void };

const STEPS = [
  {
    num: "01",
    title: "Search & Discover",
    desc: "Use our powerful search to find advertising spaces by city, type, budget, and availability. Filter results to match your exact campaign requirements.",
    details: ["Search by city, area, or format", "Filter by budget and size", "View availability calendar", "Compare multiple options"],
    icon: "🔍",
  },
  {
    num: "02",
    title: "Explore the Space",
    desc: "View detailed listings with high-quality images, exact location data, dimensions, estimated impressions, pricing, and availability.",
    details: ["Photo gallery and street view", "Precise location on map", "Traffic and audience data", "Full technical specifications"],
    icon: "🗺️",
  },
  {
    num: "03",
    title: "Book & Confirm",
    desc: "Select your campaign dates, choose your package, and complete the booking in minutes. Our team confirms within 24 hours.",
    details: ["Select campaign dates", "Choose a package", "Submit in under 5 minutes", "Instant booking reference"],
    icon: "📅",
  },
  {
    num: "04",
    title: "Launch Your Campaign",
    desc: "Submit your artwork, we handle installation, and your campaign goes live on your chosen start date. Track performance in your dashboard.",
    details: ["Artwork submission online", "Professional installation team", "Campaign goes live on time", "Track reach in dashboard"],
    icon: "📣",
  },
];

const FAQS = [
  { q: "How long does booking confirmation take?", a: "Our team reviews and confirms bookings within 24 business hours. You receive a reference number immediately upon submission." },
  { q: "Can I cancel or change my booking?", a: "Changes can be requested up to 7 days before the campaign start date. Cancellation policies vary by space and are shown before you confirm." },
  { q: "Who handles printing and installation?", a: "Reach Digital manages production and installation for standard spaces. You provide artwork; we do the rest." },
  { q: "What artwork format do I need?", a: "PDF at 300 DPI or higher, sized to the exact dimensions of your chosen space. Our team can guide you if needed." },
  { q: "Are prices per month or total campaign cost?", a: "Prices shown are per calendar month. Multi-month campaigns are priced proportionally, often with discounts." },
];

export default function HowItWorksPage({ onNav }: Props) {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(to bottom, var(--card), var(--background))", borderBottom: "1px solid var(--border)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Simple. Fast. Transparent.</p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em", marginBottom: 16 }}>How Reach Digital Works</h1>
          <p style={{ color: "var(--secondary-foreground)", fontSize: 18, lineHeight: 1.7 }}>
            From search to launch — book your advertising space in four simple steps.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 48,
                alignItems: "center",
                padding: "52px 0",
                borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
              }}
              className="how-step"
            >
              {/* Content — alternating sides on desktop */}
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 42, color: "var(--border)", letterSpacing: "-0.04em" }}>{step.num}</span>
                </div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 14 }}>{step.title}</h2>
                <p style={{ color: "var(--secondary-foreground)", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{step.desc}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.details.map(d => (
                    <li key={d} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--foreground)" }}>
                      <span style={{ color: "var(--primary)", fontSize: 16 }}>✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  aspectRatio: "16/10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 72,
                  flexDirection: "column",
                  gap: 12,
                }}>
                  {step.icon}
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--muted-foreground)" }}>Step {step.num}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", marginBottom: 40, textAlign: "center" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)", padding: "24px 0" }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{faq.q}</p>
                <p style={{ color: "var(--secondary-foreground)", fontSize: 15, lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.02em", marginBottom: 12 }}>Ready to Get Started?</h2>
        <p style={{ color: "var(--secondary-foreground)", fontSize: 16, marginBottom: 32 }}>Browse 500+ premium advertising spaces across Nigeria.</p>
        <button
          onClick={() => onNav("search")}
          style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "14px 36px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--primary-foreground)" }}
        >
          Find an Advertising Space →
        </button>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .how-step { grid-template-columns: 1fr !important; }
          .how-step > div { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
