import { binBookingConfig, getBinBookingService } from "@/config/bin-booking";
import { computeCartTotals, formatMoney, type BookingType } from "@/lib/bin-booking/pricing";
import type { CartLine } from "@/lib/bin-booking/pricing";

export function BookingSummary({
  lines,
  bookingType,
  dateCount,
}: {
  lines: CartLine[];
  bookingType: BookingType;
  dateCount: number;
}) {
  const totals = computeCartTotals(lines, bookingType, dateCount);

  return (
    <aside
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
      aria-live="polite"
    >
      <h3 className="font-display text-xl text-zinc-900">Your total</h3>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {lines.map((line) => {
          const svc = getBinBookingService(line.serviceId);
          if (!svc) return null;
          return (
            <li key={line.serviceId} className="flex justify-between gap-4">
              <span>
                {svc.name} × {line.quantity}
              </span>
            </li>
          );
        })}
      </ul>
      <dl className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
        {binBookingConfig.vatRegistered && binBookingConfig.showExAndIncVat ? (
          <>
            <div className="flex justify-between">
              <dt>Subtotal (ex-VAT)</dt>
              <dd className="font-medium">{formatMoney(totals.exVatSubtotalPence)}</dd>
            </div>
            <div className="flex justify-between text-zinc-600">
              <dt>VAT (20%)</dt>
              <dd>{formatMoney(totals.vatAmountPence)}</dd>
            </div>
            <div className="flex justify-between text-base font-semibold text-zinc-900">
              <dt>Total</dt>
              <dd>{formatMoney(totals.incVatTotalPence)}</dd>
            </div>
          </>
        ) : (
          <div className="flex justify-between text-base font-semibold text-zinc-900">
            <dt>Total</dt>
            <dd>{formatMoney(totals.chargePence)}</dd>
          </div>
        )}
      </dl>
      {bookingType === "subscription" ? (
        <p className="mt-3 text-xs text-zinc-500">
          Billed each cycle until you pause or cancel in the Stripe customer portal.
        </p>
      ) : null}
    </aside>
  );
}