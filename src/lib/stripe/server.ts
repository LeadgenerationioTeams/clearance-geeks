import Stripe from "stripe";
import type { BinBookingFrequency } from "@/config/bin-booking";

export function getStripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY?.trim();
}

export function getStripeWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim();
}

export function createStripeClient(): Stripe | null {
  const key = getStripeSecretKey();
  if (!key) return null;
  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
}

export function stripeFrequency(
  frequency: BinBookingFrequency,
): Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring {
  switch (frequency) {
    case "weekly":
      return { interval: "week", interval_count: 1 };
    case "fortnightly":
      return { interval: "week", interval_count: 2 };
    case "monthly":
      return { interval: "month", interval_count: 1 };
    default:
      return { interval: "week", interval_count: 1 };
  }
}