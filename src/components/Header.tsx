import { useState } from "react";
import Logo from "./Logo";
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

type Props = {
  current: Page;
  onNav: (p: Page) => void;
};

export default function Header({ current, onNav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Find Ad Spaces", page: "search" },
    { label: "How It Works", page: "how-it-works" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7,17,31,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNav("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Logo height={44} />
        </button>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNav(link.page)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: 6,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color:
                  current === link.page
                    ? "var(--primary)"
                    : "var(--secondary-foreground)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (current !== link.page)
                  (e.target as HTMLElement).style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                if (current !== link.page)
                  (e.target as HTMLElement).style.color =
                    "var(--secondary-foreground)";
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          className="hidden-mobile"
        >
          {user ? (
            <>
              <button
                onClick={() => onNav("dashboard")}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "var(--radius)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  transition: "border-color 0.15s",
                }}
              >
                👤 {user.name.split(" ")[0]}
              </button>
              <button
                onClick={() => {
                  logout();
                  onNav("home");
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 8px",
                  borderRadius: "var(--radius)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => onNav("login")}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--foreground)",
                transition: "border-color 0.15s",
              }}
            >
              Log In
            </button>
          )}
          <button
            onClick={() => onNav("search")}
            style={{
              background: "var(--primary)",
              border: "none",
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: "var(--radius)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--primary-foreground)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.opacity = "0.9")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.opacity = "1")
            }
          >
            Find an Ad Space
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--foreground)",
            fontSize: 22,
            display: "none",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--card)",
            borderTop: "1px solid var(--border)",
            padding: 16,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                onNav(link.page);
                setMenuOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 0",
                textAlign: "left",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--foreground)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  onNav("home");
                  setMenuOpen(false);
                }}
                style={{
                  flex: 1,
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "var(--radius)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => {
                  onNav("login");
                  setMenuOpen(false);
                }}
                style={{
                  flex: 1,
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "var(--radius)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Log In
              </button>
            )}
            <button
              onClick={() => {
                onNav("search");
                setMenuOpen(false);
              }}
              style={{
                flex: 1,
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "var(--radius)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--primary-foreground)",
              }}
            >
              Find an Ad Space
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
