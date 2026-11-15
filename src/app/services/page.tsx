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
      <div className="mt-10 rounded-2xl border-2 border-geek-lime/40 bg-zinc-900 p-6 text-white">
        <h2 className="font-display text-2xl text-geek-lime">Bin & bag booking</h2>
        <p className="mt-2 max-w-xl text-sm text-zinc-200">
          Councils missed your bin or won&apos;t take extra bags? Book online with one-off, multi-date or
          subscription collections — subscribe and save 15% on bags and bin empties.
        </p>
        <Link
          href="/services/bin-collection-booking"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-geek-lime bg-geek-lime px-5 text-sm font-extrabold uppercase tracking-wide text-black"
        >
          Book collections
        </Link>
      </div>
      <ul className="relative z-10 mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="block h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-geek-lime/50 lg:scroll-mb-[calc(var(--cookie-bar-h,0px)+4px)]"
            >
              <h2 className="font-display text-2xl text-zinc-900">{s.title}</h2>
              <p className="mt-2 text-sm text-zinc-600">{s.intro}</p>
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
