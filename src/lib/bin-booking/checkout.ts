import { randomUUID } from "node:crypto";
import {
  BIN_BOOKING_SERVICES,
  binBookingConfig,
  getBinBookingService,
  type BinBookingFrequency,
} from "@/config/bin-booking";
import {
  chargeAmountPence,
  computeCartTotals,
  exVatToStripeUnit,
  subscriptionUnitDisplayPence,
  type BookingType,
} from "@/lib/bin-booking/pricing";
import { saveBooking } from "@/lib/bin-booking/store";
import type { BinBookingDraft, StoredBinBooking } from "@/lib/bin-booking/types";
import { createStripeClient, stripeFrequency } from "@/lib/stripe/server";
import { resolveSiteUrl } from "@/lib/env.server";
import type Stripe from "stripe";

function buildLineItems(
  draft: BinBookingDraft,
  bookingType: BookingType,
  dateCount: number,
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const visits =
    bookingType === "subscription" ? 1 : Math.max(1, dateCount);

  return draft.lines.map((line) => {
    const svc = getBinBookingService(line.serviceId);
    if (!svc) throw new Error(`Unknown service ${line.serviceId}`);

    const exUnit =
      bookingType === "subscription"
        ? (subscriptionUnitDisplayPence(line.serviceId) ??
          svc.unitPriceExVatPence)
        : svc.unitPriceExVatPence;

    const unitIncVat = exVatToStripeUnit(exUnit);
    const productName =
      bookingType === "subscription"
        ? `${svc.stripeProductLabel} (subscription, 15% off)`
        : visits > 1
          ? `${svc.stripeProductLabel} × ${visits} visits`
          : svc.stripeProductLabel;

    if (bookingType === "subscription") {
      const freq = draft.schedule.frequency as BinBookingFrequency;
      return {
        quantity: line.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: unitIncVat,
          product_data: { name: productName },
          recurring: stripeFrequency(freq),
        },
      };
    }

    return {
      quantity: line.quantity * visits,
      price_data: {
        currency: "gbp",
        unit_amount: unitIncVat,
        product_data: { name: productName },
      },
    };
  });
}

export async function createCheckoutForDraft(draft: BinBookingDraft) {
  const stripe = createStripeClient();
  if (!stripe) {
    return { ok: false as const, error: "Stripe is not configured (test keys required)." };
  }

  const bookingType = draft.schedule.bookingType;
  const dateCount =
    bookingType === "subscription"
      ? 1
      : (draft.schedule.dates?.length ?? 1);

  const totals = computeCartTotals(draft.lines, bookingType, dateCount);
  const expectedCharge = chargeAmountPence(draft.lines, bookingType, dateCount);

  if (expectedCharge < 100) {
    return { ok: false as const, error: "Minimum charge not met." };
  }

  const id = randomUUID();
  const stored: StoredBinBooking = {
    ...draft,
    id,
    createdAt: new Date().toISOString(),
    paymentStatus: "pending",
    totals: {
      exVatSubtotalPence: totals.exVatSubtotalPence,
      vatAmountPence: totals.vatAmountPence,
      incVatTotalPence: totals.incVatTotalPence,
    },
  };
  await saveBooking(stored);

  const siteUrl = resolveSiteUrl();
  const lineItems = buildLineItems(draft, bookingType, dateCount);

  const mode: Stripe.Checkout.SessionCreateParams.Mode =
    bookingType === "subscription" ? "subscription" : "payment";

  const session = await stripe.checkout.sessions.create({
    mode,
    customer_email: draft.customer.email,
    line_items: lineItems,
    success_url: `${siteUrl}/services/bin-collection-booking/confirmation?booking=${id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/services/bin-collection-booking/book?canceled=1`,
    metadata: {
      bookingId: id,
      bookingType,
      serviceSnapshot: BIN_BOOKING_SERVICES.map((s) => s.id).join(","),
      vatRegistered: String(binBookingConfig.vatRegistered),
    },
    ...(mode === "subscription"
      ? {
          subscription_data: {
            metadata: { bookingId: id },
          },
        }
      : {}),
  });

  await saveBooking({
    ...stored,
    stripeSessionId: session.id,
  });

  return { ok: true as const, url: session.url, bookingId: id };
}