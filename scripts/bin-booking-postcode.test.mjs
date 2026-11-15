import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isPostcodeInDistricts,
  normalizeOutcode,
} from "../src/lib/bin-booking/pricing-logic.mjs";

const districts = ["SK8", "M20", "OL6", "M43"];

describe("postcode service area", () => {
  it("normalizes outcodes", () => {
    assert.equal(normalizeOutcode("sk8 1aa"), "SK8");
    assert.equal(normalizeOutcode("M201AA"), "M20");
  });

  it("accepts covered districts", () => {
    assert.equal(isPostcodeInDistricts("SK8 3AE", districts), true);
    assert.equal(isPostcodeInDistricts("M43 7BN", districts), true);
  });

  it("rejects outside districts", () => {
    assert.equal(isPostcodeInDistricts("LS1 4DY", districts), false);
    assert.equal(isPostcodeInDistricts("", districts), false);
  });
});