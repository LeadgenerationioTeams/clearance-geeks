import Link from "next/link";
import { company, isPlaceholder } from "@/config/site";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent-bootstrap";

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
      <p>
        We store your choice on your device. Analytics and marketing tags load
        only if you accept. We do not use analytics or marketing cookies at the
        moment.
      </p>
      <p>
        You can change your choice at any time using &apos;Cookie settings&apos;
        at the bottom of every page.
      </p>

      <h2 className="font-display text-geek-lime">Cookie and storage table</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-zinc-300">
          <thead>
            <tr className="border-b border-zinc-700 text-zinc-200">
              <th className="py-2 pr-4 font-semibold">Name</th>
              <th className="py-2 pr-4 font-semibold">Type</th>
              <th className="py-2 pr-4 font-semibold">Provider</th>
              <th className="py-2 pr-4 font-semibold">Purpose</th>
              <th className="py-2 font-semibold">Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="py-3 pr-4 font-mono text-xs">{COOKIE_CONSENT_STORAGE_KEY}</td>
              <td className="py-3 pr-4">local storage</td>
              <td className="py-3 pr-4">{company.name}</td>
              <td className="py-3 pr-4">remembers your cookie choice</td>
              <td className="py-3">kept until you clear it</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-geek-lime">Managing cookies</h2>
      <p>
        Use Cookie settings in the footer to reopen the banner and change your
        choice. You can also clear site data in your browser settings. Declining
        optional cookies will not block quote forms or essential pages.
      </p>

      <h2 className="font-display text-geek-lime">More information</h2>
      <p>
        See our{" "}
        <Link
          href="/privacy"
          className="inline-flex min-h-[44px] items-center text-geek-lime hover:underline py-2"
        >
          privacy policy
        </Link>{" "}
        for how we handle personal data. Questions: {contact}.
      </p>
    </article>
  );
}
