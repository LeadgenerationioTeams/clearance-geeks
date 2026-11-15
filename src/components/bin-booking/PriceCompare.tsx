import { binBookingConfig } from "@/config/bin-booking";
import {
  formatMoney,
  oneOffUnitDisplayPence,
  subscriptionUnitDisplayPence,
  type BookingType,
} from "@/lib/bin-booking/pricing";
import type { BinBookingServiceId } from "@/config/bin-booking";

export function ServicePriceCompare({
  serviceId,
  bookingType,
}: {
  serviceId: BinBookingServiceId;
  bookingType?: BookingType;
}) {
  const oneOff = oneOffUnitDisplayPence(serviceId);
  const sub = subscriptionUnitDisplayPence(serviceId);

  if (sub == null) {
    return (
      <p className="text-sm text-zinc-600">
        <span className="font-semibold text-zinc-900">{formatMoney(oneOff)}</span>{" "}
        per item
      </p>
    );
  }

  const highlightSub = bookingType === "subscription";

  return (
    <div className="space-y-1 text-sm">
      <p className={highlightSub ? "text-zinc-500" : "text-zinc-700"}>
        One-off:{" "}
        <span className="font-semibold text-zinc-900">{formatMoney(oneOff)}</span>
      </p>
      <p
        className={
          highlightSub
            ? "font-semibold text-geek-lime"
            : "text-zinc-900"
        }
      >
        {binBookingConfig.subscriptionHeadline}:{" "}
        <span className="font-semibold">{formatMoney(sub)}</span>
      </p>
    </div>
  );
}