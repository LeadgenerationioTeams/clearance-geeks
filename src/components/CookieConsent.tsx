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
import {
  consumeFocusCookieBanner,
  registerCookieConsentReset,
} from "@/lib/reset-cookie-consent";

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
    return registerCookieConsentReset(() => notifyConsentChange());
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;

    const clearBannerOffset = () => {
      delete root.dataset.cookieBanner;
      root.style.setProperty("--cookie-consent-bar-height", "0px");
      root.style.setProperty("--cookie-bar-h", "0px");
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
      const heightPx = `${height}px`;
      root.style.setProperty("--cookie-consent-bar-height", heightPx);
      root.style.setProperty("--cookie-bar-h", heightPx);
      setBannerState({ open: true, height });
    };

    syncBannerHeight();

    if (consumeFocusCookieBanner()) {
      window.requestAnimationFrame(() => {
        const accept = el.querySelector<HTMLButtonElement>("button");
        accept?.focus({ preventScroll: false });
      });
    }

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
          className="cookie-consent-banner fixed bottom-[calc(var(--mobile-call-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[100] border-t border-geek-lime/30 bg-zinc-950 p-4 shadow-2xl sm:p-5 lg:bottom-0 lg:py-4"
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
                className="cookie-banner-control min-h-11 rounded-xl bg-geek-lime px-5 font-bold text-black"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => save("denied")}
                className="cookie-banner-control min-h-11 rounded-xl border border-zinc-600 px-5 font-semibold text-zinc-200"
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
