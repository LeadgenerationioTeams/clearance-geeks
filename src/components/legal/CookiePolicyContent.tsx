import Link from "next/link";
import { company, isPlaceholder } from "@/config/site";

export function CookiePolicyContent() {
  const contact = isPlaceholder(company.email)
    ? "the contact details on this website"
    : company.email;

  return (
    <article className="prose prose-invert prose-zinc mt-8 max-w-none break-words text-zinc-300">
      <p className="lead text-zinc-400">
        Last updated: 24 October 2026. This policy explains how {company.legalName}{" "}
        uses cookies and similar technologies on this website.
      </p>

      <h2 className="font-display text-geek-lime">What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device. They help websites
        remember preferences and understand how visitors use pages.
      </p>

      <h2 className="font-display text-geek-lime">How we use cookies</h2>
      <ul>
        <li>
          <strong>Strictly necessary:</strong> required for basic site operation
          (for example security and load balancing). These do not require
          consent under UK rules.
        </li>
        <li>
          <strong>Preference:</strong> we store your choice to accept or decline
          optional cookies in local storage when you use the cookie banner.
        </li>
        <li>
          <strong>Analytics and marketing:</strong> not enabled in this build. If
          we add tools (for example analytics or advertising tags), we will
          update this page and request consent where required.
        </li>
      </ul>

      <h2 className="font-display text-geek-lime">Managing cookies</h2>
      <p>
        You can clear site data in your browser settings. Declining optional
        cookies will not block quote forms or essential pages.
      </p>

      <h2 className="font-display text-geek-lime">More information</h2>
      <p>
        See our{" "}
        <Link href="/privacy" className="text-geek-lime hover:underline">
          privacy policy
        </Link>{" "}
        for how we handle personal data. Questions: {contact}.
      </p>
    </article>
  );
}
