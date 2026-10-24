import Link from "next/link";
import { services } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { PageImage } from "@/components/PageImage";
import { images } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Waste removal services",
  description:
    "House clearance, garden waste, office clearances, junk removal, builders waste and single-item collections across Greater Manchester.",
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
      <h1 className="mt-4 font-display text-4xl text-geek-lime sm:text-5xl">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Pick the clearance type that matches your job. Every service is available
        across Greater Manchester with local routing from Stockport and
        Manchester hubs.
      </p>
      <PageImage image={images.recycling} className="mt-8 max-w-3xl" />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="block h-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-geek-lime/50"
            >
              <h2 className="font-display text-2xl text-white">{s.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{s.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
