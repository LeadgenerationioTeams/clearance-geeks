import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";
import { brandName, company } from "@/config/site";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: `Website terms for ${brandName} operated by ${company.legalName}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-4 font-display text-3xl text-geek-charcoal sm:text-4xl">
        Terms of use
      </h1>
      <div className="mt-6">
        <TermsOfUseContent />
      </div>
    </div>
  );
}
