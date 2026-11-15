import { serviceAreaEntries } from "@/config/site";
import { isPostcodeInDistricts, normalizeOutcode } from "./pricing-logic.mjs";

const coveredDistricts = [
  ...new Set(
    serviceAreaEntries.flatMap((entry) => entry.postcodeDistricts),
  ),
];

export function normalizePostcodeInput(postcode: string): string {
  const raw = postcode.trim().toUpperCase();
  const compact = raw.replace(/\s+/g, "");
  if (compact.length <= 3) return raw;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`.trim();
}

export function isPostcodeInServiceArea(postcode: string): boolean {
  return isPostcodeInDistricts(postcode, coveredDistricts);
}

export function postcodeOutcode(postcode: string): string {
  return normalizeOutcode(postcode);
}

export { coveredDistricts };