import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import { brandName, company } from "@/config/site";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: `How ${company.legalName} (${brandName}) collects and uses personal data under UK GDPR.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-4 font-display text-3xl text-geek-charcoal sm:text-4xl">
        Privacy policy
      </h1>
      <div className="mt-6">
        <PrivacyPolicyContent />
      </div>
    </div>
  );
}
