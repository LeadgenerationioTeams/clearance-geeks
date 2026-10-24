import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { brandName, company } from "@/config/site";
import { LegalSection } from "@/components/legal/LegalDocument";

export const metadata = buildMetadata({
  title: "Cookie policy",
  description: `How ${brandName} uses cookies and similar technologies.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <h1 className="mt-4 font-display text-3xl text-geek-charcoal sm:text-4xl">
        Cookie policy
      </h1>
      <p className="mt-4 text-sm text-zinc-600">
        This policy explains how {company.legalName} (&quot;we&quot;) uses cookies on the{" "}
        {brandName} website.
      </p>

      <LegalSection title="What are cookies?">
        <p>
          Cookies are small text files stored on your device. Similar technologies include
          local storage, which we use to remember your cookie choice.
        </p>
      </LegalSection>

      <LegalSection title="Cookies we use">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-geek-charcoal">Strictly necessary / preference:</strong>{" "}
            we store whether you accepted or rejected optional cookies (`tcg_cookie_consent_v1`
            in local storage). This is required to honour your choice.
          </li>
          <li>
            <strong className="text-geek-charcoal">Optional analytics or marketing:</strong>{" "}
            not enabled in this build. If we add tags later, they will load only after you
            click Accept on the cookie banner.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Managing cookies">
        <p>
          You can clear local storage in your browser settings. Rejecting optional cookies
          means analytics/marketing tags will not run. Essential hosting cookies may still be
          set by our platform provider for security.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions: {company.email}. See also our{" "}
          <a href="/privacy" className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4">
            privacy policy
          </a>
          .
        </p>
      </LegalSection>
    </div>
  );
}
