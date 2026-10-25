"use client";

import { openCookieSettings } from "@/lib/cookie-consent-store";

const className =
  "inline-flex min-h-11 items-center scroll-mb-[calc(var(--cookie-bar-h,0px)+4px)] hover:text-geek-lime focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-geek-lime";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      id="cookie-settings-focus"
      className={className}
      onClick={() => openCookieSettings()}
    >
      Cookie settings
    </button>
  );
}
