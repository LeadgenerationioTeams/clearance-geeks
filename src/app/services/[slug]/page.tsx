import { notFound } from "next/navigation";
import Link from "next/link";
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
import { PageImage } from "@/components/PageImage";
import { imageForService } from "@/lib/service-images";
import type { ServiceSlug } from "@/lib/services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.intro,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.intro,
          areaName: "Greater Manchester",
        })}
      />
      <JsonLd data={faqPageJsonLd(service.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <h1 className="mt-4 font-display text-4xl text-geek-lime sm:text-5xl">
        {service.headline}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-300">{service.intro}</p>
      <div className="mt-6">
        <CallButton />
      </div>
      <PageImage
        image={imageForService(slug as ServiceSlug)}
        className="mt-8 max-w-3xl"
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-white">What we take</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl text-white">
            Typical jobs
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
            {service.typicalJobs.map((j) => (
              <li key={j}>{j}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl text-white">FAQs</h2>
          <dl className="mt-4 space-y-4">
            {service.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-geek-lime">{f.question}</dt>
                <dd className="mt-1 text-zinc-400">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-zinc-500">
            Local pages:{" "}
            <Link
              href={`/areas/stockport/${slug}`}
              className="text-geek-lime underline"
            >
              Stockport
            </Link>
            {" · "}
            <Link
              href={`/areas/manchester/${slug}`}
              className="text-geek-lime underline"
            >
              Manchester
            </Link>
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
