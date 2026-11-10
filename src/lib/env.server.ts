import { siteUrl as defaultSiteUrl } from "@/config/site";

export const isProduction = process.env.VERCEL_ENV === "production";

/** Full sitemap on Vercel (production + preview), or local production builds (VERCEL_ENV unset). */
export function shouldPublishSitemapRoutes(): boolean {
  if (
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview"
  ) {
    return true;
  }
  if (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === undefined
  ) {
    return true;
  }
  return false;
}

export function resolveSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
}
