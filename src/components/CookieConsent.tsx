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
import { cn } from "@/lib/cn";

/** Optional analytics — only mount after explicit Accept. None configured yet. */
function OptionalAnalytics() {
  return null;
}

export function CookieConsentProvider({
  children,
  compactMobile = false,
}: {
  children: React.ReactNode;
  /** Shorter mobile banner for the light-van home hero (desktop banner unchanged). */
  compactMobile?: boolean;
}) {
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

  const compact = compactMobile;

  return (
    <>
      {children}
      {consent === "granted" ? <OptionalAnalytics /> : null}
      {consent === "unknown" ? (
        <div
          ref={bannerRef}
          className={cn(
            "fixed bottom-[calc(var(--mobile-call-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[100] border-t border-geek-lime/30 bg-zinc-950/95 shadow-2xl backdrop-blur lg:bottom-0",
            compact
              ? "max-lg:max-h-[110px] max-lg:overflow-hidden max-lg:p-2.5 lg:p-5"
              : "p-4 sm:p-5",
          )}
          role="dialog"
          aria-labelledby="cookie-title"
        >
          {compact ? (
            <>
              <div
                className="mx-auto flex max-w-6xl flex-col gap-2 max-lg:gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
              >
                <p
                  id="cookie-title"
                  className="text-sm leading-snug text-zinc-300 max-lg:truncate max-lg:text-xs max-lg:leading-tight lg:font-semibold lg:text-white"
                >
                  <span className="max-lg:inline lg:hidden">
                    We only store your cookie choice.{" "}
                    <Link href="/cookies" className="text-geek-lime underline">
                      Cookies
                    </Link>
                    {" · "}
                    <Link href="/privacy" className="text-geek-lime underline">
                      Privacy
                    </Link>
                  </span>
                  <span className="hidden lg:block">
                    <span className="font-semibold text-white">
                      Cookies on this site
                    </span>
                    <span className="mt-1 block font-normal">
                      We don&apos;t use analytics or marketing cookies at the
                      moment. We only store your cookie choice. See{" "}
                      <Link href="/cookies" className="text-geek-lime underline">
                        cookies
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-geek-lime underline">
                        privacy
                      </Link>
                      .
                    </span>
                  </span>
                </p>
                <div
                  className={cn(
                    "flex shrink-0 gap-2",
                    compact ? "max-lg:flex-row max-lg:gap-2" : "flex-col sm:flex-row",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => save("granted")}
                    className="min-h-11 flex-1 rounded-xl bg-geek-lime px-4 text-sm font-bold text-black sm:px-5"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => save("denied")}
                    className="min-h-11 flex-1 rounded-xl border border-zinc-600 px-4 text-sm font-semibold text-zinc-200 sm:px-5"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          ) : (
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
                  className="min-h-11 rounded-xl bg-geek-lime px-5 font-bold text-black"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => save("denied")}
                  className="min-h-11 rounded-xl border border-zinc-600 px-5 font-semibold text-zinc-200"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

/** @deprecated use CookieConsentProvider */
export const CookieConsentGate = CookieConsentProvider;
