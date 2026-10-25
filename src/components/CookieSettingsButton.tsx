"use client";

import { COOKIE_SETTINGS_BUTTON_ID } from "@/lib/cookie-consent";
import { openCookieSettings } from "@/lib/cookie-consent-store";

const className =
  "inline-flex min-h-11 items-center scroll-mb-[calc(var(--cookie-bar-h,0px)+4px)] lg:scroll-mb-[calc(var(--cookie-bar-h,0px)+8px)] hover:text-geek-lime focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-geek-lime";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      id={COOKIE_SETTINGS_BUTTON_ID}
      className={className}
      onClick={() => openCookieSettings()}
    >
      Cookie settings
    </button>
  );
}
