import { Listing, formatPrice } from "../data/listings";

type Props = {
  listing: Listing;
  onView: (id: string) => void;
  onBook: (id: string) => void;
};

export default function ListingCard({ listing, onView, onBook }: Props) {
  const badgeColor =
    listing.availability === "Available"
      ? { bg: "#0d3326", text: "#34d399" }
      : listing.availability === "Available Soon"
      ? { bg: "#0f2d1a", text: "#4ade80" }
      : { bg: "#2a1212", text: "#f87171" };

  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.borderColor = "#2a4060";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", background: "#0d1d30" }}>
        <img
          src={listing.image}
          alt={listing.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: badgeColor.bg,
            color: badgeColor.text,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: "3px 8px",
            borderRadius: 20,
            letterSpacing: "0.05em",
          }}
        >
          {listing.availability}
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(7,17,31,0.75)",
            color: "var(--primary)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: "3px 8px",
            borderRadius: 20,
          }}
        >
          {listing.type}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--foreground)",
              marginBottom: 4,
              lineHeight: 1.3,
            }}
          >
            {listing.name}
          </h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            <span>📍</span> {listing.location}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[listing.dimensions, listing.lighting, listing.impressions].map((tag) => (
            <span
              key={tag}
              style={{
                background: "var(--secondary)",
                color: "var(--secondary-foreground)",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 4,
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "var(--muted-foreground)", fontSize: 12 }}>From</span>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: "var(--foreground)",
              }}
            >
              {formatPrice(listing.price)}
              <span style={{ fontWeight: 400, fontSize: 13, color: "var(--muted-foreground)" }}> / month</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onView(listing.id)}
              style={{
                flex: 1,
                background: "var(--secondary)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                cursor: "pointer",
                padding: "9px 12px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = "#1a2d45"}
              onMouseLeave={e => (e.target as HTMLElement).style.background = "var(--secondary)"}
            >
              View Details
            </button>
            <button
              onClick={() => onBook(listing.id)}
              style={{
                flex: 1,
                background: "var(--primary)",
                border: "none",
                color: "var(--primary-foreground)",
                cursor: "pointer",
                padding: "9px 12px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.9"}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
