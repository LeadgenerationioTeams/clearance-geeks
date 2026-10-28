import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/config/site";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: `How ${company.legalName} collects and uses personal data under UK GDPR.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-4 font-display text-4xl text-geek-lime">Privacy policy</h1>
      <PrivacyPolicyContent />
    </div>
  );
}
