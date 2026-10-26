import Link from "next/link";
import { services } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { gallerySlice } from "@/lib/gallery";
import { JobPhoto } from "@/components/JobPhoto";
import { hubAreaName, siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Waste removal services",
  description:
    `House clearance, garden waste, office clearances, junk removal, builders waste and single-item collections across ${siteConfig.serviceAreas.region}.`,
  path: "/services",
});

export default function ServicesHubPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <h1 className="mt-4 font-display text-4xl text-zinc-900 sm:text-5xl">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-700">
        Pick the clearance type that matches your job. Every service is available
        across {siteConfig.serviceAreas.region} with local routing from{" "}
        {hubAreaName(0)} and {hubAreaName(1)} hubs.
      </p>
      <ul className="relative z-10 mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="block h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-geek-lime/50"
            >
              <h2 className="font-display text-2xl text-zinc-900">{s.title}</h2>
              <p className="mt-2 text-base text-zinc-600">{s.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {gallerySlice(0, 2).map((photo) => (
          <JobPhoto key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
