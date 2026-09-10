import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

type Page =
  | "home"
  | "search"
  | "detail"
  | "booking"
  | "confirmation"
  | "dashboard"
  | "how-it-works"
  | "about"
  | "contact"
  | "login"
  | "register";

type Props = { onNav: (p: Page) => void; message?: string };

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

export default function LoginPage({ onNav, message }: Props) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      onNav("dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: "60px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Welcome back
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 15 }}>
          Log in to manage your advertising bookings.
        </p>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 28 }}>
        {message && (
          <div style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "var(--radius)", padding: 12, marginBottom: 16, fontSize: 13, color: "var(--primary)" }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius)", padding: 12, marginBottom: 16, fontSize: 13, color: "#f87171" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} style={inputStyle} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>

        <button
          onClick={submit}
          disabled={busy}
          style={{ width: "100%", background: "var(--primary)", border: "none", cursor: busy ? "not-allowed" : "pointer", padding: "13px", borderRadius: "var(--radius)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--primary-foreground)", opacity: busy ? 0.7 : 1 }}
        >
          {busy ? "Logging in…" : "Log In →"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--muted-foreground)" }}>
          New here?{" "}
          <button onClick={() => onNav("register")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
