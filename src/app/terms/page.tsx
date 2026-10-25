import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/config/site";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";
import { lvPageClasses } from "@/lib/light-van-page-theme";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: `Website terms for ${company.legalName}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className={lvPageClasses.h1()}>Terms of use</h1>
      <TermsOfUseContent />
    </div>
  );
}
