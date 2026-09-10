import { useState } from "react";
import { formatPrice } from "../data/listings";
import ListingCard from "../components/ListingCard";
import { useListings } from "../hooks/useListings";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page, id?: string) => void };

const AD_TYPES = ["Billboard", "Digital Billboard", "Bus Shelter", "Wall", "Indoor Advertising", "Transit"];
const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu"];

export default function SearchPage({ onNav }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");
  const [view, setView] = useState<"list" | "map">("list");
  const [filterOpen, setFilterOpen] = useState(false);
  const { listings } = useListings();

  const toggleType = (t: string) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const filtered = listings.filter(l => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(l.type)) return false;
    if (selectedCity && l.city !== selectedCity) return false;
    if (l.price < minPrice || l.price > maxPrice) return false;
    if (availableOnly && l.availability !== "Available") return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const Filters = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Type */}
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 14 }}>Advertising Type</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {AD_TYPES.map(t => (
            <label key={t} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(t)}
                onChange={() => toggleType(t)}
                style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }}
              />
              <span style={{ fontSize: 14, color: selectedTypes.includes(t) ? "var(--foreground)" : "var(--secondary-foreground)", transition: "color 0.15s" }}>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 14 }}>City</h3>
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: selectedCity ? "var(--foreground)" : "var(--muted-foreground)", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", colorScheme: "dark" }}
        >
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 14 }}>Price Range / month</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={e => setMinPrice(Number(e.target.value) || 0)}
            style={{ flex: 1, background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "8px 10px", color: "var(--foreground)", fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none" }}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={e => setMaxPrice(Number(e.target.value) || 500000)}
            style={{ flex: 1, background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "8px 10px", color: "var(--foreground)", fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none" }}
          />
        </div>
        <input type="range" min={0} max={500000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>₦0</span>
          <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>up to {formatPrice(maxPrice)}</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 14 }}>Availability</h3>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={e => setAvailableOnly(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }}
          />
          <span style={{ fontSize: 14, color: "var(--secondary-foreground)" }}>Available now only</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setSelectedTypes([]); setSelectedCity(""); setMinPrice(0); setMaxPrice(500000); setAvailableOnly(false); }}
        style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "8px 12px", borderRadius: "var(--radius)", color: "var(--muted-foreground)", fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
          {filtered.length} spaces found
        </p>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", marginBottom: 0 }}>
          Find Advertising Spaces
        </h1>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{ display: "none", background: "var(--secondary)", border: "1px solid var(--border)", cursor: "pointer", padding: "8px 14px", borderRadius: "var(--radius)", color: "var(--foreground)", fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="show-mobile-flex"
          >
            ⚙️ Filters {selectedTypes.length + (selectedCity ? 1 : 0) + (availableOnly ? 1 : 0) > 0 && `(${selectedTypes.length + (selectedCity ? 1 : 0) + (availableOnly ? 1 : 0)})`}
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "8px 12px", color: "var(--foreground)", fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none", colorScheme: "dark" }}
          >
            {["Recommended", "Price: Low to High", "Price: High to Low", "Most Viewed", "Newest"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", background: "var(--secondary)", borderRadius: "var(--radius)", padding: 3, border: "1px solid var(--border)" }}>
          {(["list", "map"] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: view === v ? "var(--primary)" : "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 14px",
                borderRadius: "calc(var(--radius) - 2px)",
                color: view === v ? "var(--primary-foreground)" : "var(--muted-foreground)",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {v === "list" ? "≡ List" : "⊞ Map"}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile filter panel */}
      {filterOpen && (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20, marginBottom: 20 }}>
          <Filters />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 28 }} className="search-layout">
        {/* Sidebar filters — desktop */}
        <aside style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, alignSelf: "start", position: "sticky", top: 80 }} className="desktop-only">
          <Filters />
        </aside>

        {/* Results */}
        <main>
          {view === "map" ? (
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                height: 480,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 48 }}>🗺️</div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18 }}>Interactive Map View</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: 14, textAlign: "center", maxWidth: 320 }}>
                Map integration ready — connect your preferred mapping provider (Google Maps, Mapbox) to display {filtered.length} available spaces.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {filtered.slice(0, 4).map(l => (
                  <div key={l.id} style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}
                    onClick={() => onNav("detail", l.id)}
                  >
                    📍 {l.city}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 24px" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No spaces found</h3>
                  <p style={{ color: "var(--muted-foreground)", fontSize: 15 }}>Try adjusting your filters to see more results.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {filtered.map(l => (
                    <ListingCard
                      key={l.id}
                      listing={l}
                      onView={id => onNav("detail", id)}
                      onBook={id => onNav("booking", id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .search-layout { grid-template-columns: 1fr !important; }
          .desktop-only { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
