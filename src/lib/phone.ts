/**
 * Validates UK telephone numbers.
 * Accepts only digits, spaces, and optionally leading +44.
 * Valid UK numbers start with 0 (10 or 11 digits) or +44 (9 or 10 digits after +44).
 */
export function isValidUkPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  // Only allow digits, spaces, and optional leading +
  if (!/^\+?[0-9\s]+$/.test(trimmed)) return false;

  const clean = trimmed.replace(/\s+/g, "");

  // International format: +44 followed by 9 or 10 digits (no leading 0)
  if (clean.startsWith("+44")) {
    const withoutCode = clean.slice(3);
    return /^[1-9]\d{8,9}$/.test(withoutCode);
  }

  // National format: 0 followed by 9 or 10 digits (total 10 or 11 digits)
  if (clean.startsWith("0")) {
    return /^0[1-9]\d{8,9}$/.test(clean);
  }

  return false;
}
