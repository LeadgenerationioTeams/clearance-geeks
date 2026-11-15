import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createStripeClient,
  getStripeWebhookSecret,
} from "@/lib/stripe/server";
import { getBooking, updateBooking } from "@/lib/bin-booking/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = createStripeClient();
  const webhookSecret = getStripeWebhookSecret();
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      const paymentStatus =
        session.mode === "subscription" ? "subscription_active" : "paid";
      await updateBooking(bookingId, {
        paymentStatus,
        stripeSessionId: session.id,
        stripeCustomerId:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id,
        stripeSubscriptionId:
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id,
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const bookingId = sub.metadata?.bookingId;
    if (bookingId) {
      await updateBooking(bookingId, {
        paymentStatus: "canceled",
        stripeSubscriptionId: sub.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}