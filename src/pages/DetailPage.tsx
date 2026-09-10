import { useState } from "react";
import { formatPrice } from "../data/listings";
import { useListings } from "../hooks/useListings";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { id: string; onNav: (p: Page, id?: string) => void };

export default function DetailPage({ id, onNav }: Props) {
  const { listings } = useListings();
  const listing = listings.find(l => l.id === id) || listings[0];
  const [activeImg, setActiveImg] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pkg, setPkg] = useState("Standard");

  const related = listings.filter(l => l.id !== listing.id && l.city === listing.city).slice(0, 3);

  const badgeColor =
    listing.availability === "Available"
      ? { bg: "#0d3326", text: "#34d399" }
      : listing.availability === "Available Soon"
      ? { bg: "#2d2206", text: "#22c55e" }
      : { bg: "#2a1212", text: "#f87171" };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--muted-foreground)" }}>
        <button onClick={() => onNav("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: 13 }}>Home</button>
        <span>/</span>
        <button onClick={() => onNav("search")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: 13 }}>Find Ad Spaces</button>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{listing.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }} className="detail-layout">
        {/* Left */}
        <div>
          {/* Gallery */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "16/9", background: "#0d1d30", marginBottom: 10 }}>
              <img
                src={listing.images[activeImg] || listing.image}
                alt={listing.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 72, height: 48, borderRadius: "var(--radius)", overflow: "hidden", padding: 0, border: i === activeImg ? "2px solid var(--primary)" : "2px solid transparent", cursor: "pointer",
                    background: "#0d1d30",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Header info */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ background: badgeColor.bg, color: badgeColor.text, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {listing.availability}
              </span>
              <span style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {listing.type}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", marginBottom: 8 }}>
              {listing.name}
            </h1>
            <p style={{ color: "var(--muted-foreground)", fontSize: 15, display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <span>📍</span> {listing.location}
            </p>
            <p style={{ color: "var(--secondary-foreground)", fontSize: 15, lineHeight: 1.8 }}>
              {listing.description}
            </p>
          </div>

          {/* Details grid */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Space Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { label: "Type", value: listing.type },
                { label: "Dimensions", value: listing.dimensions },
                { label: "Lighting", value: listing.lighting },
                { label: "Facing", value: listing.facing },
                { label: "Traffic", value: listing.traffic },
                { label: "Est. Impressions", value: listing.impressions },
                { label: "City", value: listing.city },
                { label: "Area", value: listing.area },
              ].map(d => (
                <div key={d.label}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{d.label}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Features</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {listing.features.map(f => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "var(--foreground)" }}>
                  <span style={{ color: "var(--primary)" }}>✓</span> {f}
                </span>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Location</h2>
            <div style={{ background: "var(--secondary)", borderRadius: "var(--radius)", height: 200, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 32 }}>📍</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>{listing.location}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Interactive map — connect Google Maps or Mapbox</p>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 20 }}>More Spaces in {listing.city}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {related.map(l => (
                  <button
                    key={l.id}
                    onClick={() => onNav("detail", l.id)}
                    style={{
                      background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden",
                      cursor: "pointer", textAlign: "left", padding: 0,
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2a4060"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                  >
                    <div style={{ height: 120, background: "#0d1d30", overflow: "hidden" }}>
                      <img src={l.image} alt={l.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 14 }}>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{l.name}</p>
                      <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 8 }}>📍 {l.location}</p>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "var(--primary)" }}>{formatPrice(l.price)}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--muted-foreground)" }}>/mo</span></p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking widget — sticky */}
        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28 }}>
            <div style={{ marginBottom: 20 }}>
              <span style={{ color: "var(--muted-foreground)", fontSize: 13 }}>From</span>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                {formatPrice(listing.price)}
                <span style={{ fontWeight: 400, fontSize: 14, color: "var(--muted-foreground)" }}> / month</span>
              </div>
            </div>

            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
              Book This Advertising Space
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--foreground)", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", colorScheme: "dark" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--foreground)", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", colorScheme: "dark" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Package</label>
                <select value={pkg} onChange={e => setPkg(e.target.value)}
                  style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--foreground)", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", colorScheme: "dark" }}>
                  {["Standard", "Premium (+ Design Support)", "Full Service"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Cost breakdown */}
            <div style={{ background: "var(--secondary)", borderRadius: "var(--radius)", padding: 14, marginBottom: 20, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--secondary-foreground)" }}>
                <span>Space rental (1 month)</span>
                <span>{formatPrice(listing.price)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--secondary-foreground)" }}>
                <span>Production & installation</span>
                <span>{formatPrice(Math.round(listing.price * 0.1))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--secondary-foreground)" }}>
                <span>Service fee</span>
                <span>{formatPrice(15000)}</span>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--foreground)" }}>Estimated Total</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "var(--primary)" }}>
                  {formatPrice(listing.price + Math.round(listing.price * 0.1) + 15000)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNav("booking", listing.id)}
              style={{
                width: "100%",
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                padding: "14px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--primary-foreground)",
                marginBottom: 12,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.9"}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}
            >
              Continue to Booking →
            </button>
            <button
              style={{
                width: "100%",
                background: "none",
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
              ♡ Save to Wishlist
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted-foreground)", marginTop: 12 }}>
              No charge until booking is confirmed
            </p>
          </div>

          {/* Contact box */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20, marginTop: 16 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Have questions?</p>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 14, lineHeight: 1.6 }}>Our team is ready to help you find the perfect space for your campaign.</p>
            <button onClick={() => onNav("contact")} style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", cursor: "pointer", padding: "10px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
