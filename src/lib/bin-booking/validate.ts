import type { BinBookingDraft, BinBookingLineItem } from "./types";
import { getBinBookingService, type BinBookingServiceId } from "@/config/bin-booking";
import { isPostcodeInServiceArea } from "./postcode";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult =
  | { ok: true; draft: BinBookingDraft }
  | { ok: false; error: string };

export function validateBookingDraft(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid booking payload." };
  }
  const b = body as Record<string, unknown>;

  const linesRaw = b.lines;
  if (!Array.isArray(linesRaw) || linesRaw.length < 1) {
    return { ok: false, error: "Add at least one service." };
  }

  const lines = linesRaw
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const r = row as Record<string, unknown>;
      const serviceIdRaw = r.serviceId;
      const quantity = Number(r.quantity);
      if (typeof serviceIdRaw !== "string") return null;
      const serviceId = serviceIdRaw as BinBookingServiceId;
      const svc = getBinBookingService(serviceId);
      if (!svc) return null;
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
        return null;
      }
      return { serviceId: svc.id, quantity: Math.floor(quantity) };
    })
    .filter((x): x is BinBookingLineItem => x !== null);

  if (lines.length < 1) {
    return { ok: false, error: "Invalid service selection." };
  }

  const scheduleRaw = b.schedule;
  if (!scheduleRaw || typeof scheduleRaw !== "object") {
    return { ok: false, error: "Choose a booking type." };
  }
  const scheduleObj = scheduleRaw as Record<string, unknown>;
  const bookingType = scheduleObj.bookingType;

  if (
    bookingType !== "one_off" &&
    bookingType !== "multi_date" &&
    bookingType !== "subscription"
  ) {
    return { ok: false, error: "Invalid booking type." };
  }

  let dates: string[] | undefined;
  let frequency: BinBookingDraft["schedule"]["frequency"];
  let subscriptionStartDate: string | undefined;

  if (bookingType === "one_off") {
    const d = scheduleObj.dates;
    if (!Array.isArray(d) || d.length !== 1 || typeof d[0] !== "string") {
      return { ok: false, error: "Pick one collection date." };
    }
    dates = [d[0]];
  } else if (bookingType === "multi_date") {
    const d = scheduleObj.dates;
    if (!Array.isArray(d) || d.length < 2) {
      return { ok: false, error: "Pick at least two collection dates." };
    }
    dates = d.filter((x): x is string => typeof x === "string").slice(0, 12);
    if (dates.length < 2) {
      return { ok: false, error: "Invalid dates." };
    }
  } else {
    if (
      scheduleObj.frequency !== "weekly" &&
      scheduleObj.frequency !== "fortnightly" &&
      scheduleObj.frequency !== "monthly"
    ) {
      return { ok: false, error: "Choose a subscription frequency." };
    }
    frequency = scheduleObj.frequency;
    const hasIneligible = lines.some(
      (l) => !getBinBookingService(l.serviceId)?.subscriptionEligible,
    );
    if (hasIneligible) {
      return {
        ok: false,
        error: "Beds and mattresses are one-off collections only.",
      };
    }
    if (typeof scheduleObj.subscriptionStartDate !== "string") {
      return { ok: false, error: "Choose a subscription start date." };
    }
    subscriptionStartDate = scheduleObj.subscriptionStartDate;
  }

  const customerRaw = b.customer;
  if (!customerRaw || typeof customerRaw !== "object") {
    return { ok: false, error: "Enter your contact details." };
  }
  const c = customerRaw as Record<string, unknown>;
  const name = typeof c.name === "string" ? c.name.trim() : "";
  const email = typeof c.email === "string" ? c.email.trim() : "";
  const phone = typeof c.phone === "string" ? c.phone.trim() : "";
  const addressLine1 =
    typeof c.addressLine1 === "string" ? c.addressLine1.trim() : "";
  const addressLine2 =
    typeof c.addressLine2 === "string" ? c.addressLine2.trim() : "";
  const city = typeof c.city === "string" ? c.city.trim() : "";
  const postcode = typeof c.postcode === "string" ? c.postcode.trim() : "";

  if (name.length < 2) return { ok: false, error: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email." };
  if (phone.length < 6) return { ok: false, error: "Enter a phone number." };
  if (addressLine1.length < 3) {
    return { ok: false, error: "Enter your street address." };
  }
  if (city.length < 2) return { ok: false, error: "Enter your town or city." };
  if (!isPostcodeInServiceArea(postcode)) {
    return {
      ok: false,
      error:
        "Sorry — that postcode is outside our current collection routes. Contact us and we will see what we can do.",
    };
  }

  return {
    ok: true,
    draft: {
      lines,
      schedule: {
        bookingType,
        dates,
        frequency,
        subscriptionStartDate,
      },
      customer: {
        name,
        email,
        phone,
        addressLine1,
        addressLine2: addressLine2 || undefined,
        city,
        postcode,
      },
    },
  };
}