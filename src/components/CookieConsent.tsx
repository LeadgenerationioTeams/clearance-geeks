"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tcg_cookie_consent_v1";

export type Consent = "unknown" | "granted" | "denied";

function readConsent(): Consent {
  if (typeof window === "undefined") return "unknown";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    return "denied";
  }
  return "unknown";
}

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function notifyConsentChange() {
  listeners.forEach((l) => l());
}

/** Optional analytics — only mount after explicit Accept. None configured yet. */
function OptionalAnalytics() {
  return null;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    () => "unknown" as Consent,
  );

  const save = useCallback((value: "granted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    notifyConsentChange();
  }, []);

  return (
    <>
      {children}
      {consent === "granted" ? <OptionalAnalytics /> : null}
      {consent === "unknown" ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-zinc-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-5"
          role="dialog"
          aria-labelledby="cookie-title"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-600">
              <p id="cookie-title" className="font-semibold text-geek-charcoal">
                Cookies on this site
              </p>
              <p className="mt-1">
                We use essential cookies to remember your choice. Analytics and
                marketing tags load only if you accept. See{" "}
                <Link
                  href="/cookies"
                  className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
                >
                  cookies
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
                >
                  privacy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => save("granted")}
                className="min-h-11 rounded-lg bg-geek-lime px-5 font-semibold text-geek-charcoal"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => save("denied")}
                className="min-h-11 rounded-lg border border-zinc-300 px-5 font-semibold text-geek-charcoal"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** @deprecated use CookieConsentProvider */
export const CookieConsentGate = CookieConsentProvider;
