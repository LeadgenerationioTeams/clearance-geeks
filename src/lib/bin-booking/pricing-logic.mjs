/**
 * Shared pricing maths for bin booking (Node tests + app). Amounts in pence.
 */

export function normalizeOutcode(postcode) {
  const clean = String(postcode).toUpperCase().replace(/\s+/g, "").trim();
  if (clean.length < 5) return "";
  const outcode = clean.slice(0, -3);
  return outcode;
}

export function isPostcodeInDistricts(postcode, districts) {
  const outcode = normalizeOutcode(postcode);
  if (!outcode) return false;
  const set = new Set(districts.map((d) => d.toUpperCase()));
  return set.has(outcode);
}

export function applyVat(exVatPence, vatRegistered, vatRate) {
  if (!vatRegistered) return exVatPence;
  return Math.round(exVatPence * (1 + vatRate));
}

export function subscriptionUnitExVat(unitExVatPence, discount, eligible) {
  if (!eligible) return unitExVatPence;
  return Math.round(unitExVatPence * (1 - discount));
}

/**
 * @param {{
 *   lines: { unitExVatPence: number; quantity: number; subscriptionEligible: boolean }[];
 *   bookingType: 'one_off' | 'multi_date' | 'subscription';
 *   dateCount: number;
 *   vatRegistered: boolean;
 *   vatRate: number;
 *   subscriptionDiscount: number;
 * }} input
 */
export function calculateBookingTotals(input) {
  const {
    lines,
    bookingType,
    dateCount,
    vatRegistered,
    vatRate,
    subscriptionDiscount,
  } = input;

  const visits =
    bookingType === "one_off" || bookingType === "multi_date"
      ? Math.max(1, dateCount)
      : 1;

  let exVatSubtotal = 0;
  for (const line of lines) {
    const unit =
      bookingType === "subscription"
        ? subscriptionUnitExVat(
            line.unitExVatPence,
            subscriptionDiscount,
            line.subscriptionEligible,
          )
        : line.unitExVatPence;
    exVatSubtotal += unit * line.quantity * visits;
  }

  const incVatTotal = applyVat(exVatSubtotal, vatRegistered, vatRate);
  const vatAmount = vatRegistered ? incVatTotal - exVatSubtotal : 0;

  return {
    exVatSubtotalPence: exVatSubtotal,
    vatAmountPence: vatAmount,
    incVatTotalPence: incVatTotal,
    chargePence: incVatTotal,
    visits,
  };
}

export function formatGbp(pence) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}