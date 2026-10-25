import Link from "next/link";
import { company, isPlaceholder } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  legalArticleClass,
  legalHeadingClass,
  legalLinkClass,
  lvCn,
} from "@/lib/light-van-page-theme";

export function CookiePolicyContent() {
  const contact = isPlaceholder(company.email)
    ? "the contact details on this website"
    : company.email;

  return (
    <article className={legalArticleClass()}>
      <p className={cn("lead", lvCn("text-zinc-600", "text-zinc-400"))}>
        Last updated: 24 October 2026. This policy explains how {company.legalName}{" "}
        uses cookies and similar technologies on this website.
      </p>

      <h2 className={legalHeadingClass()}>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device. They help websites
        remember preferences and understand how visitors use pages.
      </p>

      <h2 className={legalHeadingClass()}>How we use cookies</h2>
      <p>
        We don&apos;t use analytics or marketing cookies at the moment. We only
        store your cookie choice on your device using local storage (not a
        cookie).
      </p>
      <p>
        If we add analytics or marketing tags in future, we will update this page
        and ask for your consent before they load.
      </p>

      <h2 className={legalHeadingClass()}>Storage we use</h2>
      <div className="not-prose overflow-x-auto">
        <table
          className={`w-full min-w-[36rem] border-collapse text-left text-sm ${lvCn(
            "text-zinc-700",
            "text-zinc-300",
          )}`}
        >
          <thead>
            <tr
              className={`border-b ${lvCn(
                "border-zinc-200 text-[#111]",
                "border-zinc-700 text-zinc-200",
              )}`}
            >
              <th className="py-2 pr-4 font-semibold">Name</th>
              <th className="py-2 pr-4 font-semibold">Type</th>
              <th className="py-2 pr-4 font-semibold">Provider</th>
              <th className="py-2 pr-4 font-semibold">Purpose</th>
              <th className="py-2 font-semibold">Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={`border-b ${lvCn("border-zinc-200", "border-zinc-800")}`}
            >
              <td className="py-3 pr-4 font-mono text-sm">tcg_cookie_consent_v1</td>
              <td className="py-3 pr-4">Local storage</td>
              <td className="py-3 pr-4">{company.name}</td>
              <td className="py-3 pr-4">Remembers your cookie choice</td>
              <td className="py-3">Kept until you clear it</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={legalHeadingClass()}>Managing cookies</h2>
      <p>
        You can change your choice at any time using &apos;Cookie settings&apos; at
        the bottom of every page.
      </p>
      <p>
        You can also clear site data in your browser settings. Declining optional
        cookies will not block quote forms or essential pages.
      </p>

      <h2 className={legalHeadingClass()}>More information</h2>
      <p>
        See our{" "}
        <Link href="/privacy" className={legalLinkClass()}>
          privacy policy
        </Link>{" "}
        for how we handle personal data. Questions: {contact}.
      </p>
    </article>
  );
}
