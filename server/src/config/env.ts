import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("7d"),
  PAYSTACK_SECRET_KEY: z.string().min(1),
  PAYSTACK_PUBLIC_KEY: z.string().min(1),
  FRONTEND_URL: z.string().default("http://localhost:8443"),
  SMTP_HOST: z.string().default("smtp.ethereal.email"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.string().default("false"),
  SMTP_USER: z.string().default(""),
  SMTP_PASS: z.string().default(""),
  SMTP_FROM: z.string().default("Reach Digital <no-reply@reachdigital.ng>"),
  PORT: z.coerce.number().default(4000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
