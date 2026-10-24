"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tcg_cookie_consent_v1";

type Consent = "unknown" | "granted" | "denied";

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
  return () => {
    listeners.delete(onChange);
  };
}

function notifyConsentChange() {
  listeners.forEach((l) => l());
}

export function CookieConsentGate({ children }: { children: React.ReactNode }) {
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

  if (consent === "unknown") {
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black p-4 sm:items-center">
        <div
          className="max-w-lg rounded-2xl border-2 border-geek-lime bg-zinc-950 p-6 text-white shadow-2xl"
          role="dialog"
          aria-labelledby="cookie-title"
        >
          <h2 id="cookie-title" className="font-display text-2xl text-geek-lime">
            Cookies & site use
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            We use essential cookies to remember your choice. No analytics or
            marketing tags load until you accept. Read our{" "}
            <Link href="/cookies" className="text-geek-lime underline">
              cookie policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-geek-lime underline">
              privacy notice
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => save("granted")}
              className="min-h-12 flex-1 rounded-xl bg-geek-lime font-bold text-black"
            >
              Accept & continue
            </button>
            <button
              type="button"
              onClick={() => save("denied")}
              className="min-h-12 flex-1 rounded-xl border border-zinc-600 font-semibold text-zinc-200"
            >
              Essential only
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
