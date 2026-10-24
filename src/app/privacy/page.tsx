import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { PageImage } from "@/components/PageImage";
import { images } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "Privacy policy placeholder for The Clearance Geeks website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-4 font-display text-3xl text-geek-charcoal sm:text-4xl">
        Privacy
      </h1>
      <PageImage image={images.brandedSplash} className="mt-6 max-w-md" />
      <p className="mt-6 text-zinc-600">
        Placeholder privacy notice for {company.legalName}. Replace with counsel-approved
        text before launch. Contact: {company.email}.
      </p>
    </div>
  );
}
