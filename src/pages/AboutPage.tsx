type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page) => void };

const MEDIA_OPTIONS = [
  {
    title: "Billboards",
    desc: "Premium large-format billboard placements across high-traffic urban corridors. From LED digital boards to static formats, we help brands dominate attention in locations that matter most — delivering both reach and impact. Each placement is backed by data including traffic volume, audience reach, and location insights.",
    icon: "🗼",
  },
  {
    title: "Transit Advertising",
    desc: "Brand your message across buses, BRT corridors, and transit terminals. Reach commuters throughout their daily journey with high-frequency, high-visibility placements.",
    icon: "🚌",
  },
  {
    title: "Street Furniture",
    desc: "Bus shelters, kiosks, and street panels positioned at pedestrian level for close-range, high-dwell-time engagement in commercial and residential districts.",
    icon: "🏙️",
  },
  {
    title: "Lamppost Advertising",
    desc: "Street-level lamppost banners along key urban routes, creating corridor branding that reinforces message frequency and brand recall across entire districts.",
    icon: "💡",
  },
  {
    title: "Bridge & Wall Panels",
    desc: "Large-scale bridge headers and wall panels in premium city locations. Unmissable, high-impact formats that command attention from vehicle and pedestrian traffic alike.",
    icon: "🧱",
  },
  {
    title: "Special Projects & Activations",
    desc: "Custom OOH activations, stunts, and unconventional placements tailored to campaign objectives. When standard formats aren't enough, we create moments that become conversations.",
    icon: "✨",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Insights & Planning", desc: "We analyze your audience, objectives, and market to define the right strategy and campaign direction." },
  { num: "02", title: "Media Strategy & Placement", desc: "We identify high-impact locations and platforms to ensure your message reaches the right audience at scale." },
  { num: "03", title: "Creative Execution", desc: "We develop and deploy compelling visuals and messaging designed to capture attention and drive recall." },
  { num: "04", title: "Deployment & Monitoring", desc: "We manage installation, rollout, and performance tracking to ensure seamless execution and optimal results." },
];

const CITIES = ["Kano", "Onitsha", "Enugu", "Port Harcourt", "Benin City", "Abuja", "Lagos", "Other States"];

export default function AboutPage({ onNav }: Props) {
  return (
    <div style={{ overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "#060f0a" }}>
          <img
            src="https://images.unsplash.com/photo-1580239808566-2f1c56a693ac?w=1920&h=900&fit=crop&auto=format"
            alt="Lagos aerial view"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,15,10,0.9) 40%, rgba(6,15,10,0.3) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>A Strategic Approach</p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5.5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            We understand that every campaign is unique.
          </h1>
          <p style={{ color: "var(--secondary-foreground)", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.8, maxWidth: 580 }}>
            We take a strategic and flexible approach to plan, place, and execute outdoor advertising that delivers real impact. From the initial brief, our team dives deep into your brand, audience, and campaign goals — developing ideas and strategies that shape effective media placements.
          </p>
        </div>
      </section>

      {/* STRATEGIC INTRO */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--secondary-foreground)", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.9 }}>
            We combine <strong style={{ color: "var(--foreground)" }}>research, creativity, and strategic location planning</strong> to ensure every campaign maximizes visibility, engagement, and return on investment.
          </p>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: -20, right: -10,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: 80,
                color: i === 0 ? "rgba(22,163,74,0.08)" : "rgba(255,255,255,0.03)",
                lineHeight: 1, userSelect: "none",
              }}>{step.num}</div>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: i === 0 ? "var(--primary)" : "var(--secondary)",
                border: i === 0 ? "none" : "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: 13,
                color: i === 0 ? "var(--primary-foreground)" : "var(--muted-foreground)",
                marginBottom: 20,
              }}>{step.num}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: 14, lineHeight: 1.75 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEASURABLE IMPACT */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="impact-grid">
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>We Deliver Measurable Impact</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>
              We connect brands with people through strategic, high-impact media.
            </h2>
            <p style={{ color: "var(--secondary-foreground)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              From billboards and transit branding to unconventional media placements, we design campaigns that capture attention, influence perception, and deliver measurable success.
            </p>
            <button onClick={() => onNav("search")} style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
              Start a Campaign →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { value: "10", unit: "yrs", label: "Experience" },
              { value: "340", unit: "+", label: "Campaigns" },
              { value: "1M", unit: "+", label: "Daily Impressions" },
              { value: "20", unit: "+", label: "Cities Covered" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, textAlign: "center" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, color: "var(--primary)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {s.value}<span style={{ fontSize: 18 }}>{s.unit}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 6, fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR HOLDINGS / WHAT WE DO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Our Holdings · What We Do</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="holdings-grid">
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              We connect brands to high-impact locations and deliver visibility where it matters most.
            </h2>
            <p style={{ color: "var(--secondary-foreground)", fontSize: 16, lineHeight: 1.85, paddingTop: 4 }}>
              Our media network spans strategic, high-traffic environments designed to maximize brand exposure, audience engagement, and measurable campaign performance across Nigeria.
            </p>
          </div>
        </div>

        {/* Media options grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {MEDIA_OPTIONS.map((opt, i) => (
            <div
              key={opt.title}
              style={{
                background: i === 0 ? "var(--primary)" : "var(--card)",
                border: `1px solid ${i === 0 ? "transparent" : "var(--border)"}`,
                borderRadius: "var(--radius-xl)",
                padding: 28,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => { if (i > 0) (e.currentTarget as HTMLElement).style.borderColor = "#1f4a2b"; }}
              onMouseLeave={e => { if (i > 0) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{opt.icon}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12, color: i === 0 ? "var(--primary-foreground)" : "var(--foreground)" }}>{opt.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: i === 0 ? "rgba(240,255,244,0.8)" : "var(--muted-foreground)" }}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ color: "var(--secondary-foreground)", fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.9, marginBottom: 40 }}>
            We manage campaigns from strategy to execution, ensuring every placement delivers maximum visibility and measurable impact. Whether it's billboards, transit media, or street-level activations, our approach is built around precision, timing, and audience relevance.
          </p>
          <p style={{ color: "var(--secondary-foreground)", fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.9, marginBottom: 56 }}>
            Working closely with our clients, we translate brand objectives into high-performing outdoor campaigns. From planning and location selection to deployment and monitoring, we provide a seamless, end-to-end media experience.
          </p>

          {/* CEO quote */}
          <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: 32 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(16px, 2.2vw, 22px)", lineHeight: 1.7, color: "var(--foreground)", marginBottom: 20, fontStyle: "italic" }}>
              "We start by understanding your audience, your message, and where attention truly lives. From there, we strategically place your brand in high-impact locations — combining data, creativity, and execution to deliver visibility that drives real results."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "var(--primary-foreground)" }}>RD</div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>Founder & CEO</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Reach Digital Limited</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING CITIES TICKER */}
      <section style={{ padding: "40px 0", background: "#060f0a", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
        {[1, 2].map(row => (
          <div key={row} style={{ overflow: "hidden", marginBottom: row === 1 ? 10 : 0 }}>
            <div style={{
              display: "flex", gap: 32, width: "max-content",
              animation: `ticker${row} 30s linear infinite`,
              animationDirection: row === 2 ? "reverse" : "normal",
            }}>
              {[...Array(4)].flatMap(() => CITIES).map((city, i) => (
                <span key={i} style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: i % (CITIES.length) === 0 ? "var(--primary)" : "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                }}>
                  {city} <span style={{ color: "var(--primary)", margin: "0 8px" }}>✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* MEDIA BOOKINGS CTA */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="cta-grid">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>
                Media Bookings · Mon – Fri 8:00am – 6:00pm
              </p>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
                Solutions for today,{" "}
                <span style={{ color: "var(--primary)" }}>visibility</span>{" "}
                for tomorrow.
              </h2>
              <p style={{ color: "var(--secondary-foreground)", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                Reach your audience where it matters most. From high-traffic billboards to strategic transit placements, we deliver data-driven outdoor media that maximizes visibility, recall, and ROI.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => onNav("search")} style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "13px 28px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
                  View Our Media Options →
                </button>
                <button onClick={() => onNav("contact")} style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "13px 28px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>
                  Say Hi
                </button>
              </div>
            </div>

            {/* Campaign preview card */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <div style={{ height: 220, background: "#0b1710", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1745725427532-4c52cdc6d4ae?w=800&h=400&fit=crop&auto=format"
                  alt="Campaign in action"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                />
                <div style={{ position: "absolute", top: 14, left: 14, background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}>
                  LIVE CAMPAIGN
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Watch Our Campaigns in Action</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6 }}>See how we've helped 100+ brands reach millions across Nigeria's most strategic locations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .impact-grid, .holdings-grid, .cta-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes ticker1 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ticker2 { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
