import Link from "next/link";
import { areas } from "@/lib/areas";
import { formatServiceAreasCommaList, region } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { PageImage } from "@/components/PageImage";
import { areaPageImage } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Areas we cover",
  description: `Waste removal and house clearance in ${region}: ${formatServiceAreasCommaList()}.`,
  path: "/areas",
});

export default function AreasHubPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Areas" }]} />
      <h1 className="mt-4 font-display text-3xl text-geek-charcoal sm:text-4xl">
        {region} — areas we cover
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600">
        Borough pages for {formatServiceAreasCommaList()}. Postcode districts and
        neighbourhood links are shown on each area page.
      </p>
      <PageImage image={areaPageImage()} className="mt-8 max-w-3xl" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/areas/${a.slug}`}
              className="block h-full rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <h2 className="font-display text-xl text-geek-charcoal">{a.name}</h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                {a.boroughLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-4">
                {a.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
