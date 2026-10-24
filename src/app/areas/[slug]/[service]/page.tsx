import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArea,
  getServiceTownBlurb,
  serviceByTownSlugs,
  type AreaSlug,
} from "@/lib/areas";
import { getService, serviceSlugs } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { QuoteForm } from "@/components/QuoteForm";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
} from "@/lib/schema";

export function generateStaticParams() {
  const params: { slug: string; service: string }[] = [];
  for (const town of serviceByTownSlugs) {
    for (const service of serviceSlugs) {
      params.push({ slug: town, service });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug: town, service: serviceSlug } = await params;
  const area = getArea(town);
  const service = getService(serviceSlug);
  if (!area || !service) return {};
  if (!serviceByTownSlugs.includes(area.slug as AreaSlug)) return {};
  return buildMetadata({
    title: `${service.title} in ${area.name}`,
    description: `${getServiceTownBlurb(area.slug as AreaSlug, serviceSlug)} ${service.intro}`,
    path: `/areas/${town}/${serviceSlug}`,
  });
}

export default async function AreaServicePage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug: town, service: serviceSlug } = await params;
  if (!serviceByTownSlugs.includes(town as AreaSlug)) notFound();
  const area = getArea(town);
  const service = getService(serviceSlug);
  if (!area || !service) notFound();

  const localBlurb = getServiceTownBlurb(area.slug as AreaSlug, serviceSlug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area.name, path: `/areas/${town}` },
    {
      name: service.title,
      path: `/areas/${town}/${serviceSlug}`,
    },
  ];

  const faqs = [...service.faqs, ...area.faqs.slice(0, 1)];

  return (
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
          { label: area.name, href: `/areas/${town}` },
          { label: service.title },
        ]}
      />
      <h1 className="mt-4 font-display text-4xl text-geek-lime sm:text-5xl">
        {service.title} in {area.name}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-geek-lime/90">{localBlurb}</p>
      <p className="mt-2 max-w-3xl text-zinc-300">{service.intro}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CallButton />
        <Link
          href={`/services/${serviceSlug}`}
          className="text-sm font-semibold text-zinc-400 underline"
        >
          UK-wide service detail
        </Link>
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
  );
}
