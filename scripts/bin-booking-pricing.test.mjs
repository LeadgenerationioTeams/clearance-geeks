import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyVat,
  calculateBookingTotals,
  subscriptionUnitExVat,
} from "../src/lib/bin-booking/pricing-logic.mjs";

describe("bin booking pricing", () => {
  const bag = {
    unitExVatPence: 200,
    quantity: 2,
    subscriptionEligible: true,
  };
  const bin = {
    unitExVatPence: 800,
    quantity: 1,
    subscriptionEligible: true,
  };

  it("one-off ex-VAT subtotal without VAT registered", () => {
    const t = calculateBookingTotals({
      lines: [bag],
      bookingType: "one_off",
      dateCount: 1,
      vatRegistered: false,
      vatRate: 0.2,
      subscriptionDiscount: 0.15,
    });
    assert.equal(t.exVatSubtotalPence, 400);
    assert.equal(t.incVatTotalPence, 400);
    assert.equal(t.vatAmountPence, 0);
  });

  it("multi-date multiplies visits", () => {
    const t = calculateBookingTotals({
      lines: [bag],
      bookingType: "multi_date",
      dateCount: 3,
      vatRegistered: false,
      vatRate: 0.2,
      subscriptionDiscount: 0.15,
    });
    assert.equal(t.exVatSubtotalPence, 1200);
    assert.equal(t.visits, 3);
  });

  it("subscription applies 15% off eligible lines", () => {
    const discounted = subscriptionUnitExVat(800, 0.15, true);
    assert.equal(discounted, 680);
    const t = calculateBookingTotals({
      lines: [bin],
      bookingType: "subscription",
      dateCount: 1,
      vatRegistered: false,
      vatRate: 0.2,
      subscriptionDiscount: 0.15,
    });
    assert.equal(t.exVatSubtotalPence, 680);
  });

  it("VAT registered adds 20%", () => {
    const t = calculateBookingTotals({
      lines: [bag],
      bookingType: "one_off",
      dateCount: 1,
      vatRegistered: true,
      vatRate: 0.2,
      subscriptionDiscount: 0.15,
    });
    assert.equal(t.exVatSubtotalPence, 400);
    assert.equal(applyVat(400, true, 0.2), 480);
    assert.equal(t.incVatTotalPence, 480);
    assert.equal(t.vatAmountPence, 80);
  });

  it("ineligible lines keep full price on subscription", () => {
    const bed = {
      unitExVatPence: 1500,
      quantity: 1,
      subscriptionEligible: false,
    };
    const unit = subscriptionUnitExVat(bed.unitExVatPence, 0.15, false);
    assert.equal(unit, 1500);
    const t = calculateBookingTotals({
      lines: [bed, bag],
      bookingType: "subscription",
      dateCount: 1,
      vatRegistered: true,
      vatRate: 0.2,
      subscriptionDiscount: 0.15,
    });
    assert.equal(t.exVatSubtotalPence, 1500 + 170 * 2);
  });
});