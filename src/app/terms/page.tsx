import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { PageImage } from "@/components/PageImage";
import { images } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: "Website terms placeholder for The Clearance Geeks.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="mt-4 font-display text-4xl text-geek-lime">Terms</h1>
      <PageImage image={images.brandedSplash} className="mt-6 max-w-md" />
      <p className="mt-6 text-zinc-400">
        Placeholder terms for using the {company.legalName} website. Service
        terms for waste collection will be provided separately at booking.
      </p>
    </div>
  );
}
