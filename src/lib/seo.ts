import type { Metadata } from "next";
import { company } from "@/config/site";
import { resolveSiteUrl } from "@/lib/env.server";

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
  const fullTitle = `${title} | ${company.name}`;
  const url = `${resolveSiteUrl()}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      locale: "en_GB",
      type: "website",
    },
  };
}
