"use client";

import { COOKIE_SETTINGS_BUTTON_ID } from "@/lib/cookie-consent";
import { openCookieSettings } from "@/lib/cookie-consent-store";
import { focusRingOnDarkBg } from "@/lib/focus-rings";

const className = `inline-flex min-h-11 items-center scroll-mb-[calc(var(--cookie-bar-h,0px)+4px)] lg:scroll-mb-[calc(var(--cookie-bar-h,0px)+8px)] hover:text-geek-lime ${focusRingOnDarkBg}`;

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
