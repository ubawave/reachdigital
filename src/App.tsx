import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import DashboardPage from "./pages/DashboardPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import type { Booking } from "./api";

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

function AppShell() {
  const [page, setPage] = useState<Page>("home");
  const [activeId, setActiveId] = useState<string>("RD-001");
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const { user } = useAuth();

  const navigate = (p: Page, id?: string) => {
    if (id) setActiveId(id);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const noFooter =
    page === "booking" || page === "confirmation" || page === "login" || page === "register";

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      <Header current={page} onNav={navigate} />

      <main style={{ flex: 1 }}>
        {page === "home" && <HomePage onNav={navigate} />}
        {page === "search" && <SearchPage onNav={navigate} />}
        {page === "detail" && <DetailPage id={activeId} onNav={navigate} />}
        {page === "booking" && (
          <BookingPage id={activeId} onNav={navigate} onBooked={setLastBooking} />
        )}
        {page === "confirmation" && (
          <ConfirmationPage onNav={navigate} booking={lastBooking} />
        )}
        {page === "dashboard" &&
          (user ? (
            <DashboardPage onNav={navigate} />
          ) : (
            <LoginPage onNav={navigate} message="Log in to view your dashboard." />
          ))}
        {page === "how-it-works" && <HowItWorksPage onNav={navigate} />}
        {page === "about" && <AboutPage onNav={navigate} />}
        {page === "contact" && <ContactPage onNav={navigate} />}
        {page === "login" && <LoginPage onNav={navigate} />}
        {page === "register" && <RegisterPage onNav={navigate} />}
      </main>

      {!noFooter && <Footer onNav={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
