"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BIN_BOOKING_COLLECTION_DAYS,
  BIN_BOOKING_SERVICES,
  BIN_BOOKING_SUBSCRIPTION_FREQUENCIES,
  binBookingConfig,
  type BinBookingServiceId,
  type BinBookingFrequency,
} from "@/config/bin-booking";
import { hasCompanyEmail, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { limeButtonOnLightClass } from "@/lib/lime-button";
import { isPostcodeInServiceArea, normalizePostcodeInput } from "@/lib/bin-booking/postcode";
import type { BookingType, CartLine } from "@/lib/bin-booking/pricing";
import { BookingSummary } from "./BookingSummary";
import { ServicePriceCompare } from "./PriceCompare";

type Step = "services" | "schedule" | "location" | "details" | "review";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isCollectionDay(isoDate: string): boolean {
  const d = new Date(`${isoDate}T12:00:00`);
  return BIN_BOOKING_COLLECTION_DAYS.includes(d.getDay());
}

export function BinBookingWizard() {
  const [step, setStep] = useState<Step>("services");
  const [quantities, setQuantities] = useState<Record<BinBookingServiceId, number>>({
    bag: 0,
    bin_standard: 0,
    bin_large: 0,
    bed: 0,
    mattress: 0,
  });
  const [bookingType, setBookingType] = useState<BookingType>("one_off");
  const [dates, setDates] = useState<string[]>([""]);
  const [frequency, setFrequency] = useState<BinBookingFrequency>("fortnightly");
  const [subscriptionStart, setSubscriptionStart] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeChecked, setPostcodeChecked] = useState(false);
  const [inArea, setInArea] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [payError, setPayError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const lines: CartLine[] = useMemo(
    () =>
      BIN_BOOKING_SERVICES.filter((s) => (quantities[s.id] ?? 0) > 0).map(
        (s) => ({ serviceId: s.id, quantity: quantities[s.id] }),
      ),
    [quantities],
  );

  const dateCount =
    bookingType === "subscription" ? 1 : dates.filter(Boolean).length || 1;

  function setQty(id: BinBookingServiceId, qty: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Math.min(50, qty)) }));
  }

  function goServicesNext() {
    if (lines.length < 1) return;
    setStep("schedule");
  }

  function goScheduleNext() {
    if (bookingType === "one_off") {
      const d = dates[0];
      if (!d || !isCollectionDay(d)) {
        setPayError("Choose a valid collection date (Mon–Sat).");
        return;
      }
    } else if (bookingType === "multi_date") {
      const filled = dates.filter(Boolean);
      if (filled.length < 2) {
        setPayError("Add at least two dates.");
        return;
      }
      if (filled.some((d) => !isCollectionDay(d))) {
        setPayError("Collection days are Monday to Saturday.");
        return;
      }
    } else {
      if (!subscriptionStart || !isCollectionDay(subscriptionStart)) {
        setPayError("Pick a subscription start date (Mon–Sat).");
        return;
      }
      if (lines.some((l) => !BIN_BOOKING_SERVICES.find((s) => s.id === l.serviceId)?.subscriptionEligible)) {
        setPayError("Remove bed or mattress for subscriptions.");
        return;
      }
    }
    setPayError(null);
    setStep("location");
  }

  function checkPostcode() {
    const normalized = normalizePostcodeInput(postcode);
    setPostcode(normalized);
    const ok = isPostcodeInServiceArea(normalized);
    setInArea(ok);
    setPostcodeChecked(true);
    if (ok) setStep("details");
  }

  async function payNow() {
    setPaying(true);
    setPayError(null);
    const payload = {
      lines,
      schedule: {
        bookingType,
        dates:
          bookingType === "subscription"
            ? undefined
            : bookingType === "one_off"
              ? [dates[0]]
              : dates.filter(Boolean),
        frequency: bookingType === "subscription" ? frequency : undefined,
        subscriptionStartDate:
          bookingType === "subscription" ? subscriptionStart : undefined,
      },
      customer: {
        name,
        email,
        phone,
        addressLine1,
        addressLine2: addressLine2 || undefined,
        city,
        postcode: normalizePostcodeInput(postcode),
      },
    };

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setPayError(data.error ?? "Could not start checkout.");
        setPaying(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setPayError("Network error — try again.");
      setPaying(false);
    }
  }

  const contactEmail = hasCompanyEmail() ? siteConfig.company.email : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {step === "services" ? (
          <section aria-labelledby="step-services">
            <h2 id="step-services" className="font-display text-2xl text-zinc-900">
              1. Choose services
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Overflow bags, bin empties, beds and mattresses — add quantities for each.
            </p>
            <ul className="mt-6 space-y-4">
              {BIN_BOOKING_SERVICES.map((svc) => (
                <li
                  key={svc.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-zinc-900">{svc.name}</h3>
                      <p className="mt-1 text-sm text-zinc-600">{svc.shortDescription}</p>
                      <div className="mt-2">
                        <ServicePriceCompare serviceId={svc.id} bookingType={bookingType} />
                      </div>
                      {svc.subscriptionEligible ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-geek-lime">
                          {binBookingConfig.subscriptionHeadline}
                        </p>
                      ) : null}
                    </div>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <span className="sr-only">Quantity for {svc.name}</span>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={quantities[svc.id]}
                        onChange={(e) => setQty(svc.id, Number(e.target.value))}
                        className="w-20 rounded-lg border border-zinc-300 px-3 py-2 text-center"
                      />
                      <span>Qty</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={goServicesNext}
              disabled={lines.length < 1}
              className={cn(
                "mt-6 inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide disabled:opacity-40",
                limeButtonOnLightClass,
              )}
            >
              Continue
            </button>
          </section>
        ) : null}

        {step === "schedule" ? (
          <section aria-labelledby="step-schedule">
            <h2 id="step-schedule" className="font-display text-2xl text-zinc-900">
              2. Booking type
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["one_off", "One-off date"],
                  ["multi_date", "Multiple dates"],
                  ["subscription", "Subscription"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBookingType(value)}
                  className={cn(
                    "min-h-12 rounded-xl border-2 px-3 text-sm font-semibold",
                    bookingType === value
                      ? "border-geek-lime bg-geek-lime/10 text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-700",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {bookingType === "subscription" ? (
              <p className="mt-3 text-sm font-medium text-zinc-800">
                {binBookingConfig.subscriptionHeadline} on bag and bin services.
              </p>
            ) : null}

            {bookingType === "one_off" ? (
              <label className="mt-6 block text-sm font-medium text-zinc-800">
                Collection date
                <input
                  type="date"
                  value={dates[0]}
                  onChange={(e) => setDates([e.target.value])}
                  className="mt-2 block w-full max-w-xs rounded-lg border border-zinc-300 px-3 py-2"
                />
              </label>
            ) : null}

            {bookingType === "multi_date" ? (
              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-zinc-800">Collection dates</p>
                {dates.map((d, i) => (
                  <input
                    key={i}
                    type="date"
                    value={d}
                    onChange={(e) => {
                      const next = [...dates];
                      next[i] = e.target.value;
                      setDates(next);
                    }}
                    className="block w-full max-w-xs rounded-lg border border-zinc-300 px-3 py-2"
                  />
                ))}
                {dates.length < 12 ? (
                  <button
                    type="button"
                    className="text-sm font-semibold text-zinc-700 underline"
                    onClick={() => setDates([...dates, ""])}
                  >
                    Add another date
                  </button>
                ) : null}
              </div>
            ) : null}

            {bookingType === "subscription" ? (
              <div className="mt-6 space-y-4">
                <fieldset>
                  <legend className="text-sm font-medium text-zinc-800">Frequency</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BIN_BOOKING_SUBSCRIPTION_FREQUENCIES.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id)}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-sm font-semibold",
                          frequency === f.id
                            ? "border-geek-lime bg-geek-lime/10"
                            : "border-zinc-200",
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm font-medium text-zinc-800">
                  First collection date
                  <input
                    type="date"
                    value={subscriptionStart}
                    onChange={(e) => setSubscriptionStart(e.target.value)}
                    className="mt-2 block w-full max-w-xs rounded-lg border border-zinc-300 px-3 py-2"
                  />
                </label>
              </div>
            ) : null}

            <p className="mt-4 text-xs text-zinc-500">
              Collections available {BIN_BOOKING_COLLECTION_DAYS.map((d) => DAY_NAMES[d]).join(", ")}.
            </p>

            {payError ? <p className="mt-3 text-sm text-red-600" role="alert">{payError}</p> : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep("services")}
                className="min-h-12 rounded-xl border border-zinc-300 px-4 text-sm font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goScheduleNext}
                className={cn(
                  "min-h-12 rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide",
                  limeButtonOnLightClass,
                )}
              >
                Continue
              </button>
            </div>
          </section>
        ) : null}

        {step === "location" ? (
          <section aria-labelledby="step-location">
            <h2 id="step-location" className="font-display text-2xl text-zinc-900">
              3. Postcode
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              We cover Greater Manchester including Tameside, Stockport and Manchester.
            </p>
            <label className="mt-4 block text-sm font-medium">
              Postcode
              <input
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                  setPostcodeChecked(false);
                  setInArea(null);
                }}
                autoComplete="postal-code"
                className="mt-2 block w-full max-w-xs rounded-lg border border-zinc-300 px-3 py-2 uppercase"
              />
            </label>
            {postcodeChecked && inArea === false ? (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950" role="alert">
                <p>
                  Sorry — that postcode is outside our current routes. We may still help on request.
                </p>
                <p className="mt-2">
                  {contactEmail ? (
                    <a className="font-semibold underline" href={`mailto:${contactEmail}`}>
                      Email us
                    </a>
                  ) : (
                    <Link href="/#quote" className="font-semibold underline">
                      Send a quote request
                    </Link>
                  )}{" "}
                  with your postcode and what needs collecting.
                </p>
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep("schedule")} className="min-h-12 rounded-xl border border-zinc-300 px-4 text-sm font-semibold">
                Back
              </button>
              <button
                type="button"
                onClick={checkPostcode}
                className={cn("min-h-12 rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide", limeButtonOnLightClass)}
              >
                Check postcode
              </button>
            </div>
          </section>
        ) : null}

        {step === "details" ? (
          <section aria-labelledby="step-details">
            <h2 id="step-details" className="font-display text-2xl text-zinc-900">
              4. Address & contact
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2">
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" required />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" required />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" required />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Address line 1
                <input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" required />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Address line 2 (optional)
                <input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" />
              </label>
              <label className="block text-sm font-medium">
                Town / city
                <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" required />
              </label>
              <label className="block text-sm font-medium">
                Postcode
                <input value={postcode} readOnly className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 uppercase" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep("location")} className="min-h-12 rounded-xl border border-zinc-300 px-4 text-sm font-semibold">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("review")}
                className={cn("min-h-12 rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide", limeButtonOnLightClass)}
              >
                Review
              </button>
            </div>
          </section>
        ) : null}

        {step === "review" ? (
          <section aria-labelledby="step-review">
            <h2 id="step-review" className="font-display text-2xl text-zinc-900">
              5. Pay securely
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              You will complete payment on Stripe Checkout (test mode on preview). The total shown is the amount you pay.
            </p>
            {payError ? <p className="mt-3 text-sm text-red-600" role="alert">{payError}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep("details")} className="min-h-12 rounded-xl border border-zinc-300 px-4 text-sm font-semibold">
                Back
              </button>
              <button
                type="button"
                disabled={paying}
                onClick={payNow}
                className={cn("min-h-12 rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide disabled:opacity-50", limeButtonOnLightClass)}
              >
                {paying ? "Redirecting…" : "Pay with Stripe"}
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <BookingSummary lines={lines} bookingType={bookingType} dateCount={dateCount} />
    </div>
  );
}