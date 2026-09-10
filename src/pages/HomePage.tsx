import { useState } from "react";
import { CATEGORIES, LOCATIONS } from "../data/listings";
import ListingCard from "../components/ListingCard";
import { useListings } from "../hooks/useListings";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page, id?: string) => void };

const STATS = [
  { value: "500+", label: "Advertising Spaces" },
  { value: "20+", label: "Cities Covered" },
  { value: "100+", label: "Businesses Served" },
  { value: "1,000+", label: "Campaigns Completed" },
];

const HOW_STEPS = [
  { num: "01", title: "Search", desc: "Find advertising spaces in your preferred city, area, or format.", icon: "🔍" },
  { num: "02", title: "Explore", desc: "Review location details, dimensions, pricing, and availability.", icon: "🗺️" },
  { num: "03", title: "Book", desc: "Select your campaign dates and submit your booking request.", icon: "📅" },
  { num: "04", title: "Advertise", desc: "Launch your campaign and reach thousands of your target audience.", icon: "📣" },
];

const TESTIMONIALS = [
  {
    quote: "We booked a premium Lagos billboard in under 10 minutes. The process was seamless and the results exceeded our expectations.",
    name: "Adaeze Okonkwo",
    role: "Marketing Director, FinanceNG",
    avatar: "AO",
  },
  {
    quote: "Reach Digital simplified our outdoor advertising strategy across 5 cities. Incredible platform for modern brands.",
    name: "Babatunde Folarin",
    role: "Brand Manager, TelecomCo",
    avatar: "BF",
  },
  {
    quote: "The search and filter experience is best-in-class. We found exactly the right spaces for our campaign budget.",
    name: "Chidinma Eze",
    role: "Campaign Lead, RetailChain",
    avatar: "CE",
  },
];

export default function HomePage({ onNav }: Props) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const { listings } = useListings();

  const handleSearch = () => onNav("search");

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#07111f",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1785522564396-4c4d97bf689d?w=1920&h=1080&fit=crop&auto=format"
            alt="City billboards at dusk"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,17,31,0.4) 0%, rgba(7,17,31,0.75) 60%, #07111f 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.05em" }}>
              500+ Premium Ad Spaces Available Now
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 1.1,
              color: "var(--foreground)",
              letterSpacing: "-0.03em",
              marginBottom: 20,
              maxWidth: 760,
            }}
          >
            Find the Perfect{" "}
            <span style={{ color: "var(--primary)" }}>Advertising Space</span>{" "}
            for Your Brand
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--secondary-foreground)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            Discover premium advertising spaces in strategic locations across Nigeria. Search, compare, and book the right space for your next campaign.
          </p>

          {/* Search card */}
          <div
            style={{
              background: "rgba(13,29,48,0.92)",
              backdropFilter: "blur(16px)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              padding: 24,
              maxWidth: 860,
            }}
          >
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 16, color: "var(--foreground)" }}>
              Find an Advertising Space
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {/* Location */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Search Location</label>
                <input
                  type="text"
                  placeholder="City, area or landmark..."
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "10px 12px",
                    color: "var(--foreground)",
                    fontSize: 14,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                  }}
                />
              </div>
              {/* Type */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Type of Space</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "10px 12px",
                    color: type ? "var(--foreground)" : "var(--muted-foreground)",
                    fontSize: 14,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option value="">All types</option>
                  {["Billboard", "Digital Billboard", "Bus Shelter", "Wall", "Street Furniture", "Indoor"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              style={{
                width: "100%",
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                padding: "13px 24px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--primary-foreground)",
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.9"}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}
            >
              Search Spaces →
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "64px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Browse by format</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              Popular Ad Categories
            </h2>
          </div>
          <button onClick={() => onNav("search")} style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "8px 18px", borderRadius: "var(--radius)", color: "var(--foreground)", fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            View All →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => onNav("search")}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "none",
                cursor: "pointer",
                background: "#0d1d30",
                display: "block",
                width: "100%",
              }}
            >
              <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.transform = "scale(1.05)"}
                onMouseLeave={e => (e.target as HTMLElement).style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,17,31,0.85) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, textAlign: "left" }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--foreground)", marginBottom: 2 }}>{cat.name}</p>
                <p style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>{cat.count} spaces available</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section style={{ padding: "0 24px 64px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Hand-picked</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              Featured Advertising Spaces
            </h2>
          </div>
          <button onClick={() => onNav("search")} style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "8px 18px", borderRadius: "var(--radius)", color: "var(--foreground)", fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            View All →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {listings.slice(0, 6).map(l => (
            <ListingCard
              key={l.id}
              listing={l}
              onView={id => onNav("detail", id)}
              onBook={id => onNav("booking", id)}
            />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Simple process</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.02em" }}>
              How It Works
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {HOW_STEPS.map((step, i) => (
              <div key={step.num} style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: i === 0 ? "var(--primary)" : "var(--secondary)",
                    border: i === 0 ? "none" : "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "var(--border)", letterSpacing: "-0.03em" }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              onClick={() => onNav("search")}
              style={{
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                padding: "13px 32px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--primary-foreground)",
              }}
            >
              Start Searching Now →
            </button>
          </div>
        </div>
      </section>

      {/* TRUST / STATS */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, background: "var(--card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden", marginBottom: 64 }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: "32px 28px", borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", color: "var(--primary)", letterSpacing: "-0.03em", marginBottom: 6 }}>{s.value}</div>
                <div style={{ color: "var(--muted-foreground)", fontSize: 14, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              Trusted by Leading Brands
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
                <div style={{ color: "var(--primary)", fontSize: 24, marginBottom: 12 }}>"</div>
                <p style={{ color: "var(--secondary-foreground)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--primary-foreground)" }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section style={{ padding: "0 24px 72px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Nationwide coverage</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              Explore by Location
            </h2>
          </div>
          <button onClick={() => onNav("search")} style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "8px 18px", borderRadius: "var(--radius)", color: "var(--foreground)", fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            View All Locations →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {LOCATIONS.map(loc => (
            <button
              key={loc.name}
              onClick={() => onNav("search")}
              style={{
                position: "relative",
                height: 180,
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "none",
                cursor: "pointer",
                background: "#0d1d30",
              }}
            >
              <img src={loc.image} alt={loc.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.7"}
                onMouseLeave={e => (e.target as HTMLElement).style.opacity = "0.5"}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,17,31,0.9) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, textAlign: "left" }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--foreground)", marginBottom: 2 }}>{loc.name}</p>
                <p style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>{loc.count} spaces · {loc.state}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Trusted by leading brands</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
            Brands That Reach Farther With Us
          </h2>
        </div>

        {/* Scrolling marquee strip */}
        <div style={{ overflow: "hidden", marginBottom: 48 }}>
          <div style={{
            display: "flex", gap: 40, alignItems: "center",
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}>
            {[...Array(2)].flatMap(() => [
              "MTN Nigeria", "Airtel", "GTBank", "Access Bank", "Dangote Group",
              "Indomie", "Unilever", "Pepsi", "Nigerian Breweries", "Zenith Bank",
              "UBA", "FBN Holdings", "Shoprite", "Total Energies", "Flutterwave",
            ]).map((brand, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 24px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                whiteSpace: "nowrap",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--secondary-foreground)" }}>{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { value: "10", unit: "yrs", label: "Years of Experience", desc: "Delivering strategic outdoor advertising across Nigeria." },
            { value: "340", unit: "+", label: "Campaigns Executed", desc: "From planning to placement, high-impact campaigns nationwide." },
            { value: "1M", unit: "+", label: "Daily Impressions", desc: "Our placements reach millions of commuters every day." },
            { value: "100", unit: "+", label: "Brands Served", desc: "From startups to multinationals, we've driven results for all." },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 44, color: "var(--primary)", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "var(--primary)" }}>{s.unit}</span>
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.label}</p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* CTA BANNER */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", background: "linear-gradient(135deg, var(--primary) 0%, #15803d 100%)", borderRadius: "var(--radius-xl)", padding: "52px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3.5vw, 36px)", color: "#07111f", letterSpacing: "-0.02em", marginBottom: 8 }}>
              Ready to Launch Your Campaign?
            </h2>
            <p style={{ color: "rgba(7,17,31,0.7)", fontSize: 16, lineHeight: 1.5 }}>
              Browse 500+ premium ad spaces and book in minutes.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => onNav("search")}
              style={{
                background: "#07111f",
                border: "none",
                cursor: "pointer",
                padding: "13px 28px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              Find an Ad Space
            </button>
            <button
              onClick={() => onNav("how-it-works")}
              style={{
                background: "rgba(7,17,31,0.15)",
                border: "1px solid rgba(7,17,31,0.3)",
                cursor: "pointer",
                padding: "13px 28px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#07111f",
              }}
            >
              How It Works
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
