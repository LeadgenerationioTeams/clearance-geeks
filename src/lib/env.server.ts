import { siteUrl as defaultSiteUrl } from "./company";

export const isProduction = process.env.VERCEL_ENV === "production";

export function resolveSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
}
