import Logo from "./Logo";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";

type Props = { onNav: (p: Page) => void };

export default function Footer({ onNav }: Props) {
  return (
    <footer style={{ background: "#040a06", borderTop: "1px solid var(--border)", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Logo height={64} />
            </div>
            <p style={{ color: "var(--muted-foreground)", fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Nigeria's leading platform for discovering and booking premium advertising spaces.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["X", "in", "ig"].map(s => (
                <div key={s} style={{ width: 32, height: 32, background: "var(--secondary)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--foreground)" }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 16 }}>Platform</h4>
            {[
              { label: "Find Ad Spaces", page: "search" as Page },
              { label: "How It Works", page: "how-it-works" as Page },
              { label: "Locations", page: "search" as Page },
              { label: "Pricing", page: "search" as Page },
            ].map(item => (
              <button key={item.label} onClick={() => onNav(item.page)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "var(--secondary-foreground)", fontSize: 14, padding: "4px 0", textAlign: "left", transition: "color 0.15s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--foreground)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--secondary-foreground)"}
              >{item.label}</button>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 16 }}>Company</h4>
            {[
              { label: "About Us", page: "about" as Page },
              { label: "Contact", page: "contact" as Page },
              { label: "Blog", page: "home" as Page },
              { label: "Careers", page: "home" as Page },
            ].map(item => (
              <button key={item.label} onClick={() => onNav(item.page)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "var(--secondary-foreground)", fontSize: 14, padding: "4px 0", textAlign: "left", transition: "color 0.15s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--foreground)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--secondary-foreground)"}
              >{item.label}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 16 }}>Contact</h4>
            <p style={{ color: "var(--secondary-foreground)", fontSize: 14, lineHeight: 1.8 }}>
              hello@reachdigital.ng<br />
              +234 812 345 6789<br />
              Lagos · Abuja · Port Harcourt
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
            © 2026 Reach Digital. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(t => (
              <span key={t} style={{ color: "var(--muted-foreground)", fontSize: 13, cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
