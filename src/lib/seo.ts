import type { Metadata } from "next";
import { brandName } from "@/config/site";
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
  const siteUrl = resolveSiteUrl();
  const fullTitle = `${title} | ${brandName}`;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: brandName,
      locale: "en_GB",
      type: "website",
    },
  };
}
