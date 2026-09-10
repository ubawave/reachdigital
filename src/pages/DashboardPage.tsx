import { useEffect, useState } from "react";
import { LISTINGS, formatPrice } from "../data/listings";
import { useAuth } from "../auth/AuthContext";
import { bookingsApi, paymentsApi, type Booking } from "../api";
import { openPaystackPopup } from "../lib/paystack";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact";
type Props = { onNav: (p: Page, id?: string) => void };

const SAVED = LISTINGS.slice(2, 5);

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "⊞" },
  { id: "bookings", label: "My Bookings", icon: "📋" },
  { id: "saved", label: "Saved Spaces", icon: "♡" },
  { id: "messages", label: "Messages", icon: "💬", badge: 2 },
  { id: "profile", label: "Profile", icon: "👤" },
];

export default function DashboardPage({ onNav }: Props) {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingRef, setPayingRef] = useState<string | null>(null);

  const loadBookings = () => {
    bookingsApi
      .list()
      .then((r) => setBookings(r.bookings))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadBookings, []);

  const paidBookings = bookings.filter((b) => b.status === "PAID");
  const totalSpent = paidBookings.reduce((s, b) => s + b.total, 0);

  const statusColor = (s: string) =>
    s === "PAID"
      ? { bg: "#0d3326", text: "#34d399" }
      : s === "PENDING"
        ? { bg: "#2d2206", text: "#fbbf24" }
        : { bg: "#112038", text: "#64748b" };

  const statusLabel = (s: string) =>
    s === "PAID"
      ? "Paid"
      : s === "PENDING"
        ? "Pending Payment"
        : s === "COMPLETED"
          ? "Completed"
          : s;

  const payNow = async (booking: Booking) => {
    if (!user) return;
    setPayingRef(booking.id);
    try {
      const init = await paymentsApi.initialize(booking.id);
      await openPaystackPopup({
        email: user.email,
        amountKobo: booking.total * 100,
        reference: init.reference,
        metadata: { booking_id: booking.id, listing_id: booking.listingId },
        handlers: {
          onSuccess: async () => {
            try {
              await paymentsApi.verify(init.reference);
            } catch {
              // ignore — the webhook will reconcile if this fails
            }
            loadBookings();
          },
          onClose: () => setPayingRef(null),
        },
      });
    } catch {
      // ignore; user can retry
    } finally {
      setPayingRef(null);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }} className="dashboard-layout">
        {/* Sidebar */}
        <aside style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 20, alignSelf: "start", position: "sticky", top: 80 }}>
          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--primary-foreground)", flexShrink: 0 }}>{user ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "—"}</div>
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>{user?.name || "Your Account"}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{user?.company || user?.email || ""}</p>
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: "var(--radius)",
                  background: activeNav === item.id ? "rgba(22,163,74,0.1)" : "none",
                  border: activeNav === item.id ? "1px solid rgba(22,163,74,0.2)" : "1px solid transparent",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: activeNav === item.id ? "var(--primary)" : "var(--secondary-foreground)",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span>{item.icon}</span>
                  {item.label}
                </span>
                {item.badge && (
                  <span style={{ background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => onNav("search")}
              style={{
                width: "100%",
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--primary-foreground)",
              }}
            >
              + Book New Space
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main>
          {(activeNav === "overview" || activeNav === "bookings") && (
            <div>
              {activeNav === "overview" && (
                <>
                  <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>
                    Welcome back, Adaeze 👋
                  </h1>
                  <p style={{ color: "var(--muted-foreground)", marginBottom: 28 }}>Here's an overview of your advertising campaigns.</p>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 32 }}>
                    {[
                      { label: "Active Campaigns", value: String(paidBookings.length), icon: "📣", color: "#34d399" },
                      { label: "Total Spent", value: formatPrice(totalSpent), icon: "💰", color: "var(--primary)" },
                      { label: "Spaces Saved", value: String(SAVED.length), icon: "♡", color: "#f472b6" },
                      { label: "Total Bookings", value: String(bookings.length), icon: "🏆", color: "#60a5fa" },
                    ].map(s => (
                      <div key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20 }}>
                        <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: s.color, marginBottom: 4 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
                {activeNav === "overview" ? "Upcoming Campaigns" : "All Bookings"}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {loading ? (
                  <p style={{ color: "var(--muted-foreground)", fontSize: 14 }}>Loading bookings…</p>
                ) : bookings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>No bookings yet</h3>
                    <p style={{ color: "var(--muted-foreground)", fontSize: 14, marginBottom: 20 }}>Find an advertising space and make your first booking.</p>
                    <button onClick={() => onNav("search")} style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
                      Browse Ad Spaces →
                    </button>
                  </div>
                ) : (
                  bookings.filter(b => (activeNav === "overview" ? b.status === "PAID" : true)).map(b => {
                    const sc = statusColor(b.status);
                    const isPending = b.status === "PENDING";
                    return (
                      <div key={b.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 20, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ width: 80, height: 56, borderRadius: "var(--radius)", overflow: "hidden", background: "#0d1d30", flexShrink: 0 }}>
                          <img src={b.listing.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15 }}>{b.listing.name}</p>
                            <span style={{ background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{statusLabel(b.status)}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 4 }}>📍 {b.listing.location}</p>
                          <p style={{ fontSize: 13, color: "var(--secondary-foreground)" }}>📅 {b.startDate.slice(0, 10)} — {b.endDate.slice(0, 10)}</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "var(--primary)", marginBottom: 4 }}>{formatPrice(b.total)}</p>
                          <p style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 10 }}>Ref: {b.reference}</p>
                          {isPending ? (
                            <button
                              onClick={() => payNow(b)}
                              disabled={payingRef === b.id}
                              style={{
                                background: "var(--primary)",
                                border: "none",
                                cursor: "pointer",
                                padding: "6px 14px",
                                borderRadius: "var(--radius)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                color: "var(--primary-foreground)",
                              }}
                            >
                              {payingRef === b.id ? "Opening…" : "Pay Now"}
                            </button>
                          ) : (
                            <button
                              onClick={() => onNav("detail", b.listing.id)}
                              style={{
                                background: "var(--secondary)",
                                border: "1px solid var(--border)",
                                cursor: "pointer",
                                padding: "6px 14px",
                                borderRadius: "var(--radius)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "var(--foreground)",
                              }}
                            >
                              View Space
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeNav === "saved" && (
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>Saved Spaces</h1>
              <p style={{ color: "var(--muted-foreground)", marginBottom: 28 }}>Advertising spaces you've bookmarked for later.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
                {SAVED.map(l => (
                  <div key={l.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                    <div style={{ height: 140, background: "#0d1d30", position: "relative" }}>
                      <img src={l.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button style={{ position: "absolute", top: 8, right: 8, background: "rgba(7,17,31,0.7)", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "var(--primary)" }}>♥</button>
                    </div>
                    <div style={{ padding: 14 }}>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{l.name}</p>
                      <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 12 }}>📍 {l.location}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 15, color: "var(--primary)" }}>{formatPrice(l.price)}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--muted-foreground)" }}>/mo</span></span>
                        <button onClick={() => onNav("detail", l.id)} style={{ background: "var(--primary)", border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--primary-foreground)" }}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "messages" && (
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 28 }}>Messages</h1>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { from: "Reach Digital Support", msg: "Your booking RD-847291 has been confirmed! Your campaign goes live on 1 September.", time: "2h ago", unread: true },
                  { from: "Account Manager", msg: "Hi Adaeze, I'd love to walk you through some new premium placements in VI.", time: "1d ago", unread: true },
                  { from: "Reach Digital", msg: "Invoice #INV-2026-0234 is ready for download.", time: "3d ago", unread: false },
                ].map((m, i) => (
                  <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 18, display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer", transition: "border-color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2a4060"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--primary-foreground)", flexShrink: 0 }}>RD</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>{m.from}</p>
                        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{m.time}</span>
                      </div>
                      <p style={{ fontSize: 14, color: m.unread ? "var(--secondary-foreground)" : "var(--muted-foreground)", lineHeight: 1.5 }}>{m.msg}</p>
                    </div>
                    {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: 4 }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "profile" && (
            <div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 28 }}>Profile Settings</h1>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28, maxWidth: 560 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { label: "Full Name", value: "Adaeze Okonkwo", type: "text" },
                    { label: "Company", value: "FinanceNG Ltd", type: "text" },
                    { label: "Email", value: "adaeze@financeng.com", type: "email" },
                    { label: "Phone", value: "+234 812 345 6789", type: "tel" },
                    { label: "State", value: "Lagos", type: "text" },
                    { label: "Industry", value: "Financial Services", type: "text" },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} defaultValue={f.value}
                        style={{ width: "100%", background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--foreground)", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: 20, background: "var(--primary)", border: "none", cursor: "pointer", padding: "10px 24px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)" }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .dashboard-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
