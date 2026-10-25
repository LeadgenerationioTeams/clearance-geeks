"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type CookieBannerState = { open: boolean; height: number };

const CookieBannerContext = createContext<CookieBannerState>({
  open: false,
  height: 0,
});

export function useCookieBanner() {
  return useContext(CookieBannerContext);
}

import { COOKIE_CONSENT_STORAGE_KEY as STORAGE_KEY } from "@/lib/cookie-consent-bootstrap";

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

  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerState, setBannerState] = useState<CookieBannerState>({
    open: false,
    height: 0,
  });

  useLayoutEffect(() => {
    const root = document.documentElement;

    const clearBannerOffset = () => {
      delete root.dataset.cookieBanner;
      root.style.setProperty("--cookie-consent-bar-height", "0px");
      setBannerState({ open: false, height: 0 });
    };

    if (consent !== "unknown") {
      clearBannerOffset();
      return;
    }

    root.dataset.cookieBanner = "open";
    const el = bannerRef.current;
    if (!el) {
      setBannerState({ open: true, height: 0 });
      return;
    }

    const syncBannerHeight = () => {
      const height = el.getBoundingClientRect().height;
      root.style.setProperty("--cookie-consent-bar-height", `${height}px`);
      setBannerState({ open: true, height });
    };

    syncBannerHeight();
    const observer = new ResizeObserver(syncBannerHeight);
    observer.observe(el);
    window.addEventListener("resize", syncBannerHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncBannerHeight);
      clearBannerOffset();
    };
  }, [consent]);

  const save = useCallback((value: "granted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    notifyConsentChange();
  }, []);

  return (
    <CookieBannerContext.Provider value={bannerState}>
      {children}
      {consent === "granted" ? <OptionalAnalytics /> : null}
      {consent === "unknown" ? (
        <div
          ref={bannerRef}
          className="fixed bottom-[calc(var(--mobile-call-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[100] border-t border-geek-lime/30 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur sm:p-5 lg:bottom-0 lg:py-4"
          role="dialog"
          aria-labelledby="cookie-title"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-300">
              <p id="cookie-title" className="font-semibold text-white">
                Cookies on this site
              </p>
              <p className="mt-1">
                We use essential cookies to remember your choice. Analytics and
                marketing tags load only if you accept. See{" "}
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
        </div>
      ) : null}
    </CookieBannerContext.Provider>
  );
}

/** @deprecated use CookieConsentProvider */
export const CookieConsentGate = CookieConsentProvider;
