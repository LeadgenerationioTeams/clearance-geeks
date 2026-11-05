import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/config/site";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: `Website terms for ${company.legalName}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-4 font-display text-4xl text-geek-lime">Terms of use</h1>
      <TermsOfUseContent />
    </div>
  );
}
