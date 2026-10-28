import assert from "node:assert/strict";
import test from "node:test";

const { isValidUkPhone } = await import("../src/lib/phone.ts");

test("isValidUkPhone accepts standard UK numbers", () => {
  assert.equal(isValidUkPhone("07123 456789"), true);
  assert.equal(isValidUkPhone("07123456789"), true);
  assert.equal(isValidUkPhone("+44 7123 456789"), true);
  assert.equal(isValidUkPhone("+447123456789"), true);
  assert.equal(isValidUkPhone("0161 496 0123"), true);
  assert.equal(isValidUkPhone("+44 161 496 0123"), true);
  assert.equal(isValidUkPhone("0800 123 4567"), true);
  assert.equal(isValidUkPhone("+44 800 123 4567"), true);
});

test("isValidUkPhone rejects invalid or non-UK numbers", () => {
  assert.equal(isValidUkPhone(""), false);
  assert.equal(isValidUkPhone("   "), false);
  assert.equal(isValidUkPhone("12345"), false);
  assert.equal(isValidUkPhone("+1 555 123 4567"), false);
  assert.equal(isValidUkPhone("07123 45678a"), false);
  assert.equal(isValidUkPhone("+4407123456789"), false);
  assert.equal(isValidUkPhone("071234567890123"), false);
  assert.equal(isValidUkPhone("+33 6 12 34 56 78"), false);
});
