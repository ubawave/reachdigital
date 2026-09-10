import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { ZodError } from "zod";
import { env } from "./config/env";
import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listings";
import bookingRoutes from "./routes/bookings";
import paymentRoutes from "./routes/payments";
import contactRoutes from "./routes/contact";
import webhookRoutes from "./routes/webhook";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }),
  );

  // Keep the raw body so Paystack webhook signatures can be verified.
  app.use(
    express.json({
      verify: (req, _res, buf) => {
        (req as express.Request & { rawBody?: string }).rawBody = buf.toString();
      },
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, ts: new Date().toISOString() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/listings", listingRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/webhooks", webhookRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err.issues.map((i) => i.message).join(", ") });
    }
    console.error(err);
    const status = (err as { status?: number }).status || 500;
    const message = (err as { message?: string }).message || "Internal server error";
    res.status(status).json({ error: message });
  });

  return app;
}
