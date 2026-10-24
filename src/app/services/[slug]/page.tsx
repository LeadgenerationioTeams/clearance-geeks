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
import { JobPhoto } from "@/components/JobPhoto";
import { imageForService } from "@/lib/service-images";
import { photosForTag, photosForServiceSlug } from "@/lib/gallery";
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
      <h1 className="mt-4 font-display text-4xl text-zinc-900 sm:text-5xl">
        {service.headline}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-zinc-700">{service.intro}</p>
      <div className="mt-6">
        <CallButton />
      </div>
      <PageImage
        image={imageForService(slug as ServiceSlug)}
        className="mt-8 max-w-3xl"
      />
      <div className="mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[photosForServiceSlug(slug), ...photosForTag(
          photosForServiceSlug(slug).tags[0],
          3,
        ).slice(1, 3)].map((photo) => (
          <JobPhoto key={photo.id} photo={photo} sizes="(max-width: 640px) 100vw, 30vw" />
        ))}
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-zinc-900">What we take</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl text-zinc-900">FAQs</h2>
          <dl className="mt-4 space-y-4">
            {service.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-zinc-900">{f.question}</dt>
                <dd className="mt-1 text-zinc-600">{f.answer}</dd>
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
