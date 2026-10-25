"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import {
  type Consent,
  consumePendingCookieBannerFocus,
  notifyConsentChange,
  readConsent,
  setCookieBarHeight,
  subscribeConsent,
  syncCookieBannerAttribute,
} from "@/lib/cookie-consent-store";

const cookieActionFocus =
  "focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-geek-lime";

/** Optional analytics — only mount after explicit Accept. None configured yet. */
function OptionalAnalytics() {
  return null;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    () => "unknown" as Consent,
  );
  const bannerRef = useRef<HTMLDivElement>(null);

  const save = useCallback((value: "granted" | "denied") => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    notifyConsentChange();
  }, []);

  useEffect(() => {
    syncCookieBannerAttribute(consent);

    if (consent !== "unknown") {
      setCookieBarHeight(0);
      return;
    }

    const el = bannerRef.current;
    if (!el) return;

    const syncHeight = () => {
      setCookieBarHeight(el.offsetHeight);
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);

    if (consumePendingCookieBannerFocus()) {
      requestAnimationFrame(() => {
        const accept = el.querySelector<HTMLButtonElement>("button");
        accept?.focus();
      });
    }

    return () => {
      ro.disconnect();
    };
  }, [consent]);

  return (
    <>
      {children}
      {consent === "granted" ? <OptionalAnalytics /> : null}
      {consent === "unknown" ? (
        <div
          ref={bannerRef}
          className="fixed bottom-[calc(var(--mobile-call-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[100] border-t border-geek-lime/30 bg-zinc-950 p-4 shadow-2xl sm:p-5 lg:bottom-0"
          role="dialog"
          aria-labelledby="cookie-title"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-300">
              <p id="cookie-title" className="font-semibold text-white">
                Cookies on this site
              </p>
              <p className="mt-1">
                We don&apos;t use analytics or marketing cookies at the moment. We
                only store your cookie choice. See{" "}
                <Link href="/cookies" className="text-geek-lime underline">
                  cookies
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-geek-lime underline">
                  privacy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => save("granted")}
                className={`min-h-11 rounded-xl bg-geek-lime px-5 font-bold text-black ${cookieActionFocus}`}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => save("denied")}
                className={`min-h-11 rounded-xl border border-zinc-600 px-5 font-semibold text-zinc-200 ${cookieActionFocus}`}
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
