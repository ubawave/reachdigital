import { api } from "./client";
import type { Listing } from "../data/listings";

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  company: string | null;
};

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED";

export type Booking = {
  id: string;
  reference: string;
  status: BookingStatus;
  startDate: string;
  endDate: string;
  months: number;
  rental: number;
  production: number;
  serviceFee: number;
  total: number;
  campaign: string | null;
  artworkUrl: string | null;
  createdAt: string;
  listingId: string;
  userId: string;
  listing: Listing;
  payment?: { status: string } | null;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
};

export type CreateBookingInput = {
  listingId: string;
  startDate: string;
  endDate: string;
  campaign?: string;
  artworkUrl?: string;
};

export const authApi = {
  register: (body: RegisterInput) =>
    api<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: (body: { email: string; password: string }) =>
    api<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  me: () => api<{ user: User }>("/auth/me"),
};

export const listingsApi = {
  list: () => api<{ listings: Listing[] }>("/listings"),
  get: (id: string) => api<{ listing: Listing }>(`/listings/${id}`),
};

export const bookingsApi = {
  create: (body: CreateBookingInput) =>
    api<{ booking: Booking }>("/bookings", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  list: () => api<{ bookings: Booking[] }>("/bookings"),
};

export const paymentsApi = {
  initialize: (bookingId: string) =>
    api<{ accessCode: string; reference: string; authorizationUrl: string }>(
      "/payments/initialize",
      { method: "POST", body: JSON.stringify({ bookingId }) },
    ),
  verify: (reference: string) =>
    api<{ booking: Booking }>("/payments/verify", {
      method: "POST",
      body: JSON.stringify({ reference }),
    }),
};

export const contactApi = {
  send: (body: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => api<{ ok: boolean }>("/contact", { method: "POST", body: JSON.stringify(body) }),
};
