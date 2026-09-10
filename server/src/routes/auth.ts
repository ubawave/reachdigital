import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../db";
import { signToken } from "../lib/jwt";
import { requireAuth } from "../middleware/auth";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function publicUser(u: {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  company: string | null;
}) {
  return { id: u.id, email: u.email, name: u.name, phone: u.phone, company: u.company };
}

router.post("/register", async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        phone: body.phone,
        company: body.company,
      },
    });

    const token = signToken({ sub: user.id, email: user.email });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken({ sub: user.id, email: user.email });
    res.json({ token, user: publicUser(user) });
  } catch (e) {
    next(e);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.sub } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: publicUser(user) });
  } catch (e) {
    next(e);
  }
});

export default router;
