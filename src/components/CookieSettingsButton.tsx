"use client";

import { openCookieSettings } from "@/lib/cookie-consent-store";

const className =
  "inline-flex min-h-11 items-center hover:text-geek-lime";

export function CookieSettingsButton() {
  return (
    <button type="button" className={className} onClick={() => openCookieSettings()}>
      Cookie settings
    </button>
  );
}
