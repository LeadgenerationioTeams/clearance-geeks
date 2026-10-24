import Link from "next/link";
import type { AreaDefinition } from "@/lib/areas";
import type { NeighbourhoodDefinition } from "@/lib/neighbourhoods";
import { serviceByTownSlugs } from "@/lib/areas";
import { services } from "@/lib/services";
import {
  clearanceProcess,
  whyChooseUsForArea,
} from "@/lib/area-sales";
import { images, pickAreaImage } from "@/lib/media";
import { PageImage } from "./PageImage";
import { CallButton } from "./CallButton";
import { QuoteForm } from "./QuoteForm";
import { StickyMobileCta } from "./StickyMobileCta";
import { Breadcrumbs } from "./Breadcrumbs";

export function NeighbourhoodLanding({
  area,
  hood,
}: {
  area: AreaDefinition;
  hood: NeighbourhoodDefinition;
}) {
  const showServiceLinks = serviceByTownSlugs.includes(area.slug);

  return (
    <div className="pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Areas", href: "/areas" },
            { label: area.name, href: `/areas/${area.slug}` },
            { label: hood.name },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl text-geek-lime sm:text-5xl">
            Waste removal in {hood.name}, {area.name}
          </h1>
          <p className="mt-4 text-lg text-zinc-300">{hood.intro}</p>
          <p className="mt-3 text-geek-lime/90">{hood.salesPitch}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <Link
              href={`/areas/${area.slug}`}
              className="text-sm font-semibold text-zinc-400 underline"
            >
              All of {area.name}
            </Link>
          </div>
        </div>
        <PageImage image={pickAreaImage(area.slug)} priority />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-white">Why book us here</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {whyChooseUsForArea(hood.name).map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-950/40 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-white">Three-step clearance</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {clearanceProcess.map((s) => (
              <li key={s.step} className="rounded-xl border border-zinc-800 p-4">
                <span className="text-geek-lime font-display text-2xl">
                  {s.step}
                </span>
                <p className="mt-2 font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-lime">Local detail</h2>
        <p className="mt-3 text-zinc-300">
          <strong className="text-white">Landmarks & context:</strong>{" "}
          {hood.landmarks.join(" · ")}
        </p>
        <p className="mt-4 text-zinc-400">
          <strong className="text-zinc-200">Parking & access:</strong>{" "}
          {hood.parkingAccess}
        </p>
        <h3 className="mt-8 font-display text-xl text-white">
          Jobs we often run in {hood.name}
        </h3>
        <ul className="mt-3 list-disc pl-5 text-zinc-400">
          {hood.typicalClearances.map((j) => (
            <li key={j}>{j}</li>
          ))}
        </ul>
        <PageImage image={images.gardenWaste} className="mt-8 max-w-xl" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-white">Services</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={
                  showServiceLinks
                    ? `/areas/${area.slug}/${s.slug}`
                    : `/services/${s.slug}`
                }
                className="text-geek-lime underline"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <CallButton label="Call about your job" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-lime">FAQs — {hood.name}</h2>
        <dl className="mt-4 space-y-4">
          {hood.faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-white">{f.question}</dt>
              <dd className="mt-1 text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <QuoteForm />
      </section>

      <StickyMobileCta />
    </div>
  );
}
