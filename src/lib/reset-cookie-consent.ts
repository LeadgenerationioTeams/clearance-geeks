import {
  COOKIE_BAR_INITIAL_HEIGHT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent-bootstrap";

/** Registered by CookieConsentProvider so footer "Cookie settings" can reopen the banner. */
let onReset: (() => void) | null = null;
let focusBannerOnOpen = false;

export function registerCookieConsentReset(handler: () => void) {
  onReset = handler;
  return () => {
    if (onReset === handler) onReset = null;
  };
}

export function resetCookieConsentChoice() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }

  const root = document.documentElement;
  root.dataset.cookieBanner = "open";
  root.style.setProperty("--cookie-bar-h", COOKIE_BAR_INITIAL_HEIGHT);
  root.style.setProperty("--cookie-consent-bar-height", COOKIE_BAR_INITIAL_HEIGHT);

  focusBannerOnOpen = true;
  onReset?.();
}

export function consumeFocusCookieBanner(): boolean {
  const shouldFocus = focusBannerOnOpen;
  focusBannerOnOpen = false;
  return shouldFocus;
}
