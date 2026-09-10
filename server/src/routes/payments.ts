import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";
import { env } from "../config/env";
import { initializeTransaction, verifyTransaction } from "../services/paystack";
import { sendPaymentReceipt } from "../services/email";

const router = Router();
router.use(requireAuth);

const initializeSchema = z.object({ bookingId: z.string().min(1) });
const verifySchema = z.object({ reference: z.string().min(1) });

router.post("/initialize", async (req, res, next) => {
  try {
    const { bookingId } = initializeSchema.parse(req.body);
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId: req.user!.sub },
      include: { listing: true, user: true },
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.status === "PAID") {
      return res.status(400).json({ error: "Booking already paid" });
    }

    let payment = await prisma.payment.findUnique({ where: { bookingId: booking.id } });
    if (!payment) {
      payment = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          reference: booking.reference,
          amount: booking.total * 100,
        },
      });
    }

    const tx = await initializeTransaction({
      email: booking.user.email,
      amountKobo: booking.total * 100,
      reference: booking.reference,
      callbackUrl: `${env.FRONTEND_URL}/?paid=${booking.reference}`,
      metadata: {
        booking_id: booking.id,
        listing_id: booking.listingId,
      },
    });

    res.json({
      accessCode: tx.access_code,
      reference: booking.reference,
      authorizationUrl: tx.authorization_url,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { reference } = verifySchema.parse(req.body);
    const booking = await prisma.booking.findFirst({
      where: { reference, userId: req.user!.sub },
      include: { listing: true, user: true },
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const data = await verifyTransaction(reference);
    if (data.status !== "success") {
      await prisma.payment.update({
        where: { bookingId: booking.id },
        data: { status: "FAILED", raw: data as object },
      });
      return res.status(400).json({ error: "Payment was not successful", status: data.status });
    }

    const paidAt = data.paid_at ? new Date(data.paid_at) : new Date();
    await prisma.payment.update({
      where: { bookingId: booking.id },
      data: {
        status: "SUCCESS",
        paystackRef: data.reference,
        channel: data.channel,
        currency: data.currency,
        amount: data.amount,
        paidAt,
        raw: data as object,
      },
    });

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "PAID" },
      include: { listing: true, user: true },
    });

    sendPaymentReceipt(updated.user.email, updated.user.name, {
      reference: updated.reference,
      listingName: updated.listing.name,
      location: updated.listing.location,
      startDate: updated.startDate.toISOString().slice(0, 10),
      endDate: updated.endDate.toISOString().slice(0, 10),
      total: updated.total,
    }).catch((e) => console.error("receipt email error:", e));

    res.json({ booking: updated });
  } catch (e) {
    next(e);
  }
});

export default router;
