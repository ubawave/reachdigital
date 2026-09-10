import crypto from "node:crypto";
import { env } from "../config/env";

const BASE = "https://api.paystack.co";

export type PaystackVerifyData = {
  id: number;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  paid_at: string | null;
  customer: { email: string };
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

export async function initializeTransaction(params: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, string>;
}) {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const data = (await res.json()) as {
    status: boolean;
    message: string;
    data: { authorization_url: string; access_code: string; reference: string };
  };

  if (!res.ok || !data.status) {
    throw new Error(data.message || "Paystack initialize failed");
  }

  return data.data;
}

export async function verifyTransaction(reference: string): Promise<PaystackVerifyData> {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
  });

  const data = (await res.json()) as {
    status: boolean;
    message: string;
    data: PaystackVerifyData;
  };

  if (!res.ok || !data.status) {
    throw new Error(data.message || "Paystack verify failed");
  }

  return data.data;
}

export function verifyWebhookSignature(body: string, signature: string | undefined): boolean {
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha512", env.PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
