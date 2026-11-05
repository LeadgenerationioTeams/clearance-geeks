"use client";

import {
  COOKIE_BAR_HEIGHT_BOOTSTRAP_PX,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";

export type Consent = "unknown" | "granted" | "denied";

const listeners = new Set<() => void>();

let pendingCookieBannerFocus = false;

export function subscribeConsent(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function notifyConsentChange() {
  listeners.forEach((l) => l());
}

export function readConsent(): Consent {
  if (typeof window === "undefined") return "unknown";
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    return "denied";
  }
  return "unknown";
}

export function setCookieBarHeight(px: number) {
  document.documentElement.style.setProperty("--cookie-bar-h", `${px}px`);
}

export function syncCookieBannerAttribute(consent: Consent) {
  if (consent === "unknown") {
    document.documentElement.setAttribute("data-cookie-banner", "open");
  } else {
    document.documentElement.setAttribute("data-cookie-banner", "closed");
  }
}

/** True once after openCookieSettings until the banner consumes it for focus. */
export function consumePendingCookieBannerFocus(): boolean {
  const pending = pendingCookieBannerFocus;
  pendingCookieBannerFocus = false;
  return pending;
}

/** Clear stored choice and reopen the banner (Cookie settings). */
export function openCookieSettings() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  setCookieBarHeight(COOKIE_BAR_HEIGHT_BOOTSTRAP_PX);
  document.documentElement.setAttribute("data-cookie-banner", "open");
  pendingCookieBannerFocus = true;
  notifyConsentChange();
}
