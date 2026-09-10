import { Router } from "express";
import { prisma } from "../db";
import { verifyWebhookSignature } from "../services/paystack";
import { sendPaymentReceipt } from "../services/email";

const router = Router();

async function handleChargeSuccess(data: {
  reference: string;
  amount: number;
  currency: string;
  channel?: string;
  paid_at?: string | null;
  [key: string]: unknown;
}) {
  const booking = await prisma.booking.findUnique({
    where: { reference: data.reference },
    include: { listing: true, user: true },
  });
  if (!booking || booking.status === "PAID") {
    return; // nothing to do / idempotent
  }

  const paidAt = data.paid_at ? new Date(data.paid_at) : new Date();
  await prisma.payment.upsert({
    where: { bookingId: booking.id },
    update: {
      status: "SUCCESS",
      paystackRef: data.reference,
      channel: data.channel,
      currency: data.currency,
      amount: data.amount,
      paidAt,
      raw: data as object,
    },
    create: {
      bookingId: booking.id,
      reference: booking.reference,
      status: "SUCCESS",
      paystackRef: data.reference,
      channel: data.channel,
      currency: data.currency,
      amount: data.amount,
      paidAt,
      raw: data as object,
    },
  });

  await prisma.booking.update({
    where: { id: booking.id },
    data: { status: "PAID" },
  });

  await sendPaymentReceipt(booking.user.email, booking.user.name, {
    reference: booking.reference,
    listingName: booking.listing.name,
    location: booking.listing.location,
    startDate: booking.startDate.toISOString().slice(0, 10),
    endDate: booking.endDate.toISOString().slice(0, 10),
    total: booking.total,
  }).catch((e) => console.error("webhook receipt email error:", e));
}

router.post("/paystack", async (req, res) => {
  const raw = req.rawBody;
  const signature = req.headers["x-paystack-signature"] as string | undefined;

  if (!raw || !verifyWebhookSignature(raw, signature)) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  const event = req.body as { event?: string; data?: { reference?: string } };

  try {
    if (event.event === "charge.success" && event.data?.reference) {
      await handleChargeSuccess(event.data as Parameters<typeof handleChargeSuccess>[0]);
    }
    res.json({ received: true });
  } catch (e) {
    console.error("webhook processing error:", e);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;
