import type { Metadata } from "next";
import { company, siteUrl } from "./company";

/** Crawl/index rules live in `app/robots.ts` (VERCEL_ENV-aware). */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${company.legalName}`;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.legalName,
      locale: "en_GB",
      type: "website",
    },
  };
}
