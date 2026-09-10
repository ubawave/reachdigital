import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db";
import { sendContactAck, sendAdminContactNotification } from "../services/email";

const router = Router();

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

router.post("/", async (req, res, next) => {
  try {
    const body = schema.parse(req.body);
    await prisma.contactMessage.create({ data: body });

    sendContactAck(body.email, body.name).catch((e) => console.error("contact ack error:", e));
    sendAdminContactNotification(body).catch((e) => console.error("admin notify error:", e));

    res.status(201).json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;
