import { notFound } from "next/navigation";
import { areaSlugs, getArea } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AreaLanding } from "@/components/AreaLanding";
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

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8">
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
      </div>
      <AreaLanding area={area} />
    </>
  );
}
