import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArea,
  getServiceTownBlurb,
  serviceByTownSlugs,
  type AreaSlug,
} from "@/lib/areas";
import { getService, serviceSlugs } from "@/lib/services";
import { getNeighbourhood, neighbourhoods } from "@/lib/neighbourhoods";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { QuoteForm } from "@/components/QuoteForm";
import { NeighbourhoodLanding } from "@/components/NeighbourhoodLanding";
import { PageImage } from "@/components/PageImage";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { images } from "@/lib/media";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
} from "@/lib/schema";

export function generateStaticParams() {
  const params: { slug: string; subslug: string }[] = [];
  for (const n of neighbourhoods) {
    params.push({ slug: n.areaSlug, subslug: n.slug });
  }
  for (const town of serviceByTownSlugs) {
    for (const service of serviceSlugs) {
      params.push({ slug: town, subslug: service });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;
  const hood = getNeighbourhood(slug, subslug);
  if (hood) {
    const area = getArea(slug);
    return buildMetadata({
      title: `Waste removal ${hood.name}, ${area?.name ?? slug}`,
      description: hood.intro,
      path: `/areas/${slug}/${subslug}`,
    });
  }
  const service = getService(subslug);
  const area = getArea(slug);
  if (!area || !service) return {};
  if (!serviceByTownSlugs.includes(area.slug as AreaSlug)) return {};
  return buildMetadata({
    title: `${service.title} in ${area.name}`,
    description: `${getServiceTownBlurb(area.slug as AreaSlug, subslug)} ${service.intro}`,
    path: `/areas/${slug}/${subslug}`,
  });
}

export default async function AreaSubPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const hood = getNeighbourhood(slug, subslug);
  if (hood) {
    return <NeighbourhoodLanding area={area} hood={hood} />;
  }

  const service = getService(subslug);
  if (!service || !serviceByTownSlugs.includes(area.slug as AreaSlug)) {
    notFound();
  }

  const localBlurb = getServiceTownBlurb(area.slug as AreaSlug, subslug);
  const faqs = [...service.faqs, ...area.faqs.slice(0, 1)];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area.name, path: `/areas/${slug}` },
    { name: service.title, path: `/areas/${slug}/${subslug}` },
  ];

  return (
    <div className="pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <JsonLd data={breadcrumbJsonLd(crumbs)} />
        <JsonLd
          data={serviceJsonLd({
            name: `${service.title} — ${area.name}`,
            description: localBlurb,
            areaName: area.name,
          })}
        />
        <JsonLd data={faqPageJsonLd(faqs)} />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Areas", href: "/areas" },
            { label: area.name, href: `/areas/${slug}` },
            { label: service.title },
          ]}
        />
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="font-display text-4xl text-geek-lime sm:text-5xl">
              {service.title} in {area.name}
            </h1>
            <p className="mt-4 text-lg text-geek-lime/90">{localBlurb}</p>
            <p className="mt-2 text-zinc-300">{service.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <Link
                href={`/services/${subslug}`}
                className="text-sm font-semibold text-zinc-400 underline"
              >
                UK-wide service detail
              </Link>
            </div>
          </div>
          <PageImage image={images.heroClearance} priority />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-white">
              On-the-ground in {area.name}
            </h2>
            <p className="mt-2 text-zinc-400">{area.housingNotes}</p>
            <p className="mt-4 text-sm text-zinc-500">
              Postcodes we see often: {area.samplePostcodes.join(", ")}
            </p>
            <h3 className="mt-8 font-display text-xl text-white">
              Example jobs nearby
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              {area.typicalJobs.map((j) => (
                <li key={j}>{j}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-xl text-white">FAQs</h3>
            <dl className="mt-4 space-y-4">
              {faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-geek-lime">{f.question}</dt>
                  <dd className="mt-1 text-zinc-400">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
          <QuoteForm />
        </div>
      </div>
      <StickyMobileCta />
    </div>
  );
}
