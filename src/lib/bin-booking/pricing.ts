import {
  binBookingConfig,
  getBinBookingService,
  type BinBookingServiceId,
} from "@/config/bin-booking";
import {
  applyVat,
  calculateBookingTotals,
  formatGbp,
  subscriptionUnitExVat,
} from "./pricing-logic.mjs";

export type CartLine = {
  serviceId: BinBookingServiceId;
  quantity: number;
};

export type BookingType = "one_off" | "multi_date" | "subscription";

export function formatMoney(pence: number): string {
  return formatGbp(pence);
}

export function oneOffUnitDisplayPence(serviceId: BinBookingServiceId): number {
  const svc = getBinBookingService(serviceId);
  if (!svc) return 0;
  return svc.unitPriceExVatPence;
}

export function subscriptionUnitDisplayPence(
  serviceId: BinBookingServiceId,
): number | null {
  const svc = getBinBookingService(serviceId);
  if (!svc || !svc.subscriptionEligible) return null;
  return subscriptionUnitExVat(
    svc.unitPriceExVatPence,
    binBookingConfig.subscriptionDiscount,
    true,
  );
}

export function computeCartTotals(
  lines: CartLine[],
  bookingType: BookingType,
  dateCount: number,
) {
  const resolved = lines
    .map((line) => {
      const svc = getBinBookingService(line.serviceId);
      if (!svc || line.quantity < 1) return null;
      return {
        unitExVatPence: svc.unitPriceExVatPence,
        quantity: line.quantity,
        subscriptionEligible: svc.subscriptionEligible,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return calculateBookingTotals({
    lines: resolved,
    bookingType,
    dateCount,
    vatRegistered: binBookingConfig.vatRegistered,
    vatRate: binBookingConfig.vatRate,
    subscriptionDiscount: binBookingConfig.subscriptionDiscount,
  });
}

export function chargeAmountPence(
  lines: CartLine[],
  bookingType: BookingType,
  dateCount: number,
): number {
  return computeCartTotals(lines, bookingType, dateCount).chargePence;
}

export function exVatToStripeUnit(amountExVatPence: number): number {
  return applyVat(
    amountExVatPence,
    binBookingConfig.vatRegistered,
    binBookingConfig.vatRate,
  );
}