import { useEffect, useState } from "react";
import { formatPrice, LISTINGS } from "../data/listings";
import { useListings } from "../hooks/useListings";
import { useAuth } from "../auth/AuthContext";
import { bookingsApi, paymentsApi, type Booking } from "../api";
import { openPaystackPopup } from "../lib/paystack";

type Page = "home" | "search" | "detail" | "booking" | "confirmation" | "dashboard" | "how-it-works" | "about" | "contact" | "login";
type Props = { id: string; onNav: (p: Page, id?: string) => void; onBooked: (b: Booking) => void };

const STEPS = ["Select Dates", "Confirm Space", "Your Details", "Upload Artwork", "Review & Confirm"];

export default function BookingPage({ id, onNav, onBooked }: Props) {
  const { listings } = useListings();
  const listing = listings.find(l => l.id === id) || listings[0] || LISTINGS[0];
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", campaign: "", startDate: "", endDate: "" });
  const [artworkFile, setArtworkFile] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: f.name || user.name || "",
        email: f.email || user.email || "",
        company: f.company || user.company || "",
        phone: f.phone || user.phone || "",
      }));
    }
  }, [user]);

  const months = (() => {
    if (!form.startDate || !form.endDate) return 1;
    const s = new Date(`${form.startDate}T00:00:00`);
    const e = new Date(`${form.endDate}T00:00:00`);
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || e <= s) return 1;
    const days = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000));
    return Math.max(1, Math.ceil(days / 30));
  })();
  const estTotal = listing.price * months + Math.round(listing.price * months * 0.1) + 15000;

  const confirmBooking = async () => {
    if (!user) {
      onNav("login");
      return;
    }
    if (!form.startDate || !form.endDate) {
      setError("Please select your campaign start and end dates.");
      setStep(0);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { booking } = await bookingsApi.create({
        listingId: listing.id,
        startDate: form.startDate,
        endDate: form.endDate,
        campaign: form.campaign || undefined,
        artworkUrl: artworkFile || undefined,
      });
      await openPaystackPopup({
        email: user.email,
        amountKobo: booking.total * 100,
        reference: booking.reference,
        metadata: { booking_id: booking.id, listing_id: booking.listingId },
        handlers: {
          onSuccess: async () => {
            try {
              const { booking: paid } = await paymentsApi.verify(booking.reference);
              onBooked(paid);
              onNav("confirmation");
            } catch (e) {
              setError(e instanceof Error ? e.message : "Payment verification failed. Your booking is saved as pending — pay from the dashboard.");
              setSubmitting(false);
            }
          },
          onClose: () => setSubmitting(false),
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create booking");
      setSubmitting(false);
    }
  };

  const updateForm = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 40, overflowX: "auto", paddingBottom: 4 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: i < step ? "var(--primary)" : i === step ? "var(--primary)" : "var(--secondary)",
              border: i === step ? "3px solid var(--primary)" : i < step ? "none" : "2px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 13,
              color: i <= step ? "var(--primary-foreground)" : "var(--muted-foreground)",
              boxShadow: i === step ? "0 0 0 4px rgba(22,163,74,0.15)" : "none",
              transition: "all 0.2s",
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: i === step ? "var(--primary)" : "var(--muted-foreground)", whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: 40, height: 2, background: i < step ? "var(--primary)" : "var(--border)", margin: "0 8px", marginBottom: 20, transition: "background 0.2s" }} />
          )}
        </div>
      ))}
    </div>
  );

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
    colorScheme: "dark",
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

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
      {/* Back */}
      <button onClick={() => step > 0 ? setStep(s => s - 1) : onNav("detail", id)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginBottom: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        ← {step > 0 ? "Back" : "Back to Details"}
      </button>

      <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>Book Advertising Space</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: 15, marginBottom: 32 }}>{listing.name} · {listing.location}</p>

      <StepIndicator />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }} className="booking-layout">
        {/* Step content */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28 }}>
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Select Campaign Dates</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={labelStyle}>Campaign Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => updateForm("startDate", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Campaign End Date</label>
                  <input type="date" value={form.endDate} onChange={e => updateForm("endDate", e.target.value)} style={inputStyle} />
                </div>
                {form.startDate && form.endDate && (
                  <div style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "var(--radius)", padding: 14 }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--primary)", marginBottom: 4 }}>
                      Campaign Duration
                    </p>
                    <p style={{ fontSize: 13, color: "var(--secondary-foreground)" }}>
                      {form.startDate} — {form.endDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Confirm Advertising Space</h2>
              <div style={{ display: "flex", gap: 16, background: "var(--secondary)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 24 }}>
                <div style={{ width: 120, flexShrink: 0, background: "#0d1d30" }}>
                  <img src={listing.image} alt={listing.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{listing.name}</p>
                  <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 8 }}>📍 {listing.location}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {[listing.type, listing.dimensions, listing.lighting].map(t => (
                      <span key={t} style={{ background: "var(--muted)", fontSize: 11, padding: "2px 8px", borderRadius: 4, color: "var(--secondary-foreground)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ color: "var(--secondary-foreground)", fontSize: 14, lineHeight: 1.7 }}>{listing.description}</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Your Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" placeholder="Adaeze Okonkwo" value={form.name} onChange={e => updateForm("name", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input type="text" placeholder="Your Company Ltd" value={form.company} onChange={e => updateForm("company", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" placeholder="hello@yourcompany.com" value={form.email} onChange={e => updateForm("email", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" placeholder="+234 812 345 6789" value={form.phone} onChange={e => updateForm("phone", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Campaign / Brand Name *</label>
                  <input type="text" placeholder="e.g. September Brand Campaign" value={form.campaign} onChange={e => updateForm("campaign", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Upload Artwork</h2>
              <p style={{ color: "var(--muted-foreground)", fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
                Upload your campaign artwork. Required dimensions: <strong style={{ color: "var(--foreground)" }}>{listing.dimensions}</strong>. Accepted formats: PDF, PNG, JPG (min 300 DPI for print).
              </p>
              <div
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 48,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                onClick={() => setArtworkFile("campaign-artwork.pdf")}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
                {artworkFile ? (
                  <>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--primary)", marginBottom: 4 }}>{artworkFile}</p>
                    <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Click to replace</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: 4 }}>Drag & drop or click to upload</p>
                    <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>PDF, PNG, JPG up to 100MB</p>
                  </>
                )}
              </div>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 12 }}>Artwork can also be submitted after booking confirmation.</p>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Review Booking</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { label: "Advertising Space", value: listing.name },
                  { label: "Location", value: listing.location },
                  { label: "Type", value: listing.type },
                  { label: "Dimensions", value: listing.dimensions },
                  { label: "Campaign", value: form.campaign || "September Campaign" },
                  { label: "Start Date", value: form.startDate || "01 Sept 2026" },
                  { label: "End Date", value: form.endDate || "30 Sept 2026" },
                  { label: "Advertiser", value: form.name || "Adaeze Okonkwo" },
                  { label: "Company", value: form.company || "Your Company" },
                  { label: "Email", value: form.email || "hello@company.com" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "var(--radius)", padding: 16, marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "var(--secondary-foreground)", fontSize: 13 }}>Space rental</span>
                  <span style={{ fontSize: 13 }}>{formatPrice(listing.price * months)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "var(--secondary-foreground)", fontSize: 13 }}>Production</span>
                  <span style={{ fontSize: 13 }}>{formatPrice(Math.round(listing.price * months * 0.1))}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "var(--secondary-foreground)", fontSize: 13 }}>Service fee</span>
                  <span style={{ fontSize: 13 }}>{formatPrice(15000)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid rgba(22,163,74,0.2)" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15 }}>Total</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--primary)" }}>
                    {formatPrice(estTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius)", padding: 12, marginTop: 20, fontSize: 13, color: "#f87171" }}>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28, gap: 10 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", padding: "10px 20px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                Back
              </button>
            )}
            <button
              onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : confirmBooking()}
              disabled={submitting}
              style={{ background: "var(--primary)", border: "none", cursor: submitting ? "not-allowed" : "pointer", padding: "10px 24px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--primary-foreground)", opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Processing…" : step < STEPS.length - 1 ? "Continue →" : "Confirm & Pay ✓"}
            </button>
          </div>
        </div>

        {/* Summary sidebar */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 20 }}>
          <div style={{ height: 100, background: "#0d1d30", borderRadius: "var(--radius)", overflow: "hidden", marginBottom: 14 }}>
            <img src={listing.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{listing.name}</p>
          <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 16 }}>📍 {listing.location}</p>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Monthly rate</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{formatPrice(listing.price)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Est. total</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--primary)" }}>{formatPrice(estTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .booking-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
