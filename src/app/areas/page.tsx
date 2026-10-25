import Link from "next/link";
import { areas } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { PageImage } from "@/components/PageImage";
import { areaPageImage } from "@/lib/media";
import { serviceAreasListText, siteConfig } from "@/config/site";
import { lvPageClasses } from "@/lib/light-van-page-theme";

export const metadata = buildMetadata({
  title: "Areas we cover",
  description:
    `Waste removal and house clearance in ${serviceAreasListText()}.`,
  path: "/areas",
});

export default function AreasHubPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Areas" }]} />
      <h1 className={lvPageClasses.h1()}>
        {siteConfig.serviceAreas.region} areas
      </h1>
      <p className={lvPageClasses.intro()}>
        Borough pages with verified recycling-centre references, postcode
        districts and neighbourhood links.
      </p>
      <PageImage image={areaPageImage()} className="mt-8 max-w-3xl" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}`} className={`block h-full ${lvPageClasses.card()}`}>
              <h2 className={lvPageClasses.cardTitle()}>{a.name}</h2>
              <p className={lvPageClasses.cardMeta()}>{a.boroughLabel}</p>
              <p className={`${lvPageClasses.cardBody()} line-clamp-4`}>
                {a.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
