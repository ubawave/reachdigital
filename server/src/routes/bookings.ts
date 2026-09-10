import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";
import { computePricing } from "../lib/pricing";
import { generateReference } from "../lib/reference";
import { sendBookingConfirmation } from "../services/email";

const router = Router();
router.use(requireAuth);

const createSchema = z.object({
  listingId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  campaign: z.string().optional(),
  artworkUrl: z.string().optional(),
});

function toDate(value: string): Date {
  // Parse as UTC to avoid local-timezone shifts when stored in DATE columns.
  return new Date(`${value}T00:00:00.000Z`);
}

router.post("/", async (req, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const listing = await prisma.listing.findUnique({ where: { id: body.listingId } });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const start = toDate(body.startDate);
    const end = toDate(body.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid dates — use YYYY-MM-DD" });
    }
    if (end <= start) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    const pricing = computePricing(listing.price, start, end);
    const user = await prisma.user.findUnique({ where: { id: req.user!.sub } });

    const booking = await prisma.booking.create({
      data: {
        reference: generateReference(),
        listingId: listing.id,
        userId: req.user!.sub,
        startDate: start,
        endDate: end,
        months: pricing.months,
        rental: pricing.rental,
        production: pricing.production,
        serviceFee: pricing.serviceFee,
        total: pricing.total,
        campaign: body.campaign,
        artworkUrl: body.artworkUrl,
      },
      include: { listing: true },
    });

    if (user) {
      sendBookingConfirmation(user.email, user.name, {
        reference: booking.reference,
        listingName: listing.name,
        location: listing.location,
        startDate: body.startDate,
        endDate: body.endDate,
        total: pricing.total,
      }).catch((e) => console.error("booking email error:", e));
    }

    res.status(201).json({ booking });
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user!.sub },
      include: { listing: true, payment: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ bookings });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: req.params.id, userId: req.user!.sub },
      include: { listing: true, payment: true },
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ booking });
  } catch (e) {
    next(e);
  }
});

export default router;
