import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "Privacy policy placeholder for The Clearance Geeks website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose prose-invert">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-4 font-display text-4xl text-geek-lime">Privacy</h1>
      <p className="text-zinc-400">
        Placeholder privacy notice for {company.legalName}. Replace with counsel-approved
        text before launch. Contact: {company.email}.
      </p>
    </div>
  );
}
