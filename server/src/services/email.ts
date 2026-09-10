import nodemailer from "nodemailer";
import { env } from "../config/env";
import { formatNaira } from "../lib/format";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE === "true",
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

function shell(title: string, body: string): string {
  return `
    <div style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
        <div style="background:#07111f;border-radius:12px 12px 0 0;padding:20px 24px;">
          <span style="color:#22c55e;font-weight:800;font-size:18px;">Reach Digital</span>
        </div>
        <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:28px 24px;color:#0f172a;">
          <h1 style="font-size:20px;margin:0 0 16px;color:#07111f;">${title}</h1>
          ${body}
          <p style="margin:24px 0 0;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:16px;">
            Reach Digital — Premium advertising spaces across Nigeria.
          </p>
        </div>
      </div>
    </div>`;
}

async function sendMail(to: string, subject: string, html: string) {
  if (!env.SMTP_USER) {
    // No SMTP credentials configured — log instead of failing (dev convenience).
    console.log(`[email:mock] to=${to} subject="${subject}"`);
    return;
  }
  await transporter.sendMail({ from: env.SMTP_FROM, to, subject, html });
}

export type BookingEmailData = {
  reference: string;
  listingName: string;
  location: string;
  startDate: string;
  endDate: string;
  total: number;
};

export async function sendBookingConfirmation(
  to: string,
  name: string,
  data: BookingEmailData,
) {
  const body = `
    <p>Hi ${name},</p>
    <p>Thanks for booking with Reach Digital. Your request has been received and is awaiting payment.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#64748b;">Reference</td><td style="font-weight:700;">${data.reference}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Space</td><td>${data.listingName}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Location</td><td>${data.location}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Dates</td><td>${data.startDate} — ${data.endDate}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Total</td><td style="font-weight:700;">${formatNaira(data.total)}</td></tr>
    </table>
    <p>Complete payment to confirm your campaign slot.</p>`;
  await sendMail(to, `Booking ${data.reference} received`, shell("Booking Received", body));
}

export async function sendPaymentReceipt(
  to: string,
  name: string,
  data: BookingEmailData,
) {
  const body = `
    <p>Hi ${name},</p>
    <p>Your payment has been received and your booking is now confirmed. 🎉</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#64748b;">Reference</td><td style="font-weight:700;">${data.reference}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Space</td><td>${data.listingName}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Location</td><td>${data.location}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Dates</td><td>${data.startDate} — ${data.endDate}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Amount paid</td><td style="font-weight:700;">${formatNaira(data.total)}</td></tr>
    </table>
    <p>Our team will reach out within 24 hours to coordinate your campaign artwork.</p>`;
  await sendMail(to, `Payment receipt for ${data.reference}`, shell("Payment Confirmed", body));
}

export async function sendContactAck(to: string, name: string) {
  const body = `
    <p>Hi ${name},</p>
    <p>Thanks for contacting Reach Digital. Our team will respond within 24 business hours.</p>`;
  await sendMail(to, "We received your message", shell("Message Received", body));
}

export async function sendAdminContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const body = `
    <p>A new contact message was submitted.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#64748b;">Name</td><td>${data.name}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Email</td><td>${data.email}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Phone</td><td>${data.phone || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Subject</td><td>${data.subject}</td></tr>
    </table>
    <p style="white-space:pre-line;background:#f8fafc;padding:12px;border-radius:8px;">${data.message}</p>`;
  await sendMail(env.SMTP_FROM, `New contact message: ${data.subject}`, shell("New Contact Message", body));
}
