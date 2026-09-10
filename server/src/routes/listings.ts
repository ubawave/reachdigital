import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { q, city, type, availability } = req.query as Record<string, string | undefined>;

    const where: Prisma.ListingWhereInput = {};
    if (city) where.city = city;
    if (type) where.type = type;
    if (availability) where.availability = availability;
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { location: { contains: q } },
        { city: { contains: q } },
        { area: { contains: q } },
        { state: { contains: q } },
      ];
    }

    const listings = await prisma.listing.findMany({ where, orderBy: { id: "asc" } });
    res.json({ listings });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.id } });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ listing });
  } catch (e) {
    next(e);
  }
});

export default router;
