import { notFound } from "next/navigation";
import Link from "next/link";
import { areaSlugs, getArea, serviceByTownSlugs } from "@/lib/areas";
import { services } from "@/lib/services";
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
  return areaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: `Waste removal ${area.name}`,
    description: area.summary,
    path: `/areas/${slug}`,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area.name, path: `/areas/${slug}` },
  ];

  const showServiceLinks = serviceByTownSlugs.includes(area.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: `Waste removal in ${area.name}`,
          description: area.summary,
          areaName: area.name,
        })}
      />
      <JsonLd data={faqPageJsonLd(area.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
          { label: area.name },
        ]}
      />
      <h1 className="mt-4 font-display text-4xl text-geek-lime sm:text-5xl">
        Waste removal in {area.name}
      </h1>
      <p className="text-sm text-zinc-500">{area.boroughLabel}</p>
      <p className="mt-4 max-w-3xl text-lg text-zinc-300">{area.summary}</p>
      <div className="mt-6">
        <CallButton />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-2xl text-white">Housing & access</h2>
            <p className="mt-2 text-zinc-400">{area.housingNotes}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">Neighbourhoods</h2>
            <p className="mt-2 text-zinc-300">
              {area.neighbourhoods.join(" · ")}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Sample postcodes: {area.samplePostcodes.join(", ")}
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">Typical jobs</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              {area.typicalJobs.map((j) => (
                <li key={j}>{j}</li>
              ))}
            </ul>
          </section>
          {area.hwrcName ? (
            <section>
              <h2 className="font-display text-2xl text-white">
                Local HWRC reference
              </h2>
              <p className="mt-2 text-zinc-400">
                <strong className="text-zinc-200">{area.hwrcName}</strong>
                {area.hwrcNote ? ` — ${area.hwrcNote}` : null}
              </p>
            </section>
          ) : null}
          {area.localParagraphs.map((p) => (
            <p key={p} className="text-zinc-400">{p}</p>
          ))}
          <section>
            <h2 className="font-display text-2xl text-white">FAQs</h2>
            <dl className="mt-4 space-y-4">
              {area.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-geek-lime">{f.question}</dt>
                  <dd className="mt-1 text-zinc-400">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">Nearby</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {area.nearbyTowns.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/areas/${t.slug}`}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-sm hover:border-geek-lime"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {showServiceLinks ? (
            <section>
              <h2 className="font-display text-2xl text-white">
                Services in {area.name}
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/areas/${area.slug}/${s.slug}`}
                      className="text-geek-lime underline"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
