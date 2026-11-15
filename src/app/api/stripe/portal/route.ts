import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe/server";
import { getBooking } from "@/lib/bin-booking/store";
import { resolveSiteUrl } from "@/lib/env.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = createStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  let bookingId: string | undefined;
  try {
    const body = (await request.json()) as { bookingId?: string };
    bookingId = body.bookingId;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!bookingId) {
    return NextResponse.json({ error: "bookingId required" }, { status: 400 });
  }

  const booking = await getBooking(bookingId);
  if (!booking?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No Stripe customer for this booking yet." },
      { status: 404 },
    );
  }

  const siteUrl = resolveSiteUrl();
  const session = await stripe.billingPortal.sessions.create({
    customer: booking.stripeCustomerId,
    return_url: `${siteUrl}/services/bin-collection-booking/confirmation?booking=${bookingId}`,
  });

  return NextResponse.json({ url: session.url });
}