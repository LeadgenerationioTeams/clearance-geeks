"use client";

import { resetCookieConsentChoice } from "@/lib/reset-cookie-consent";

const linkClass =
  "cookie-settings-link inline-flex min-h-11 items-center hover:text-geek-lime";

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className={`${linkClass} cursor-pointer border-0 bg-transparent p-0 text-left text-base sm:text-sm text-zinc-400`}
      onClick={() => resetCookieConsentChoice()}
    >
      Cookie settings
    </button>
  );
}
