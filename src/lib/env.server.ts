import { defaultSiteOrigin } from "@/config/site";

export const isProduction = process.env.VERCEL_ENV === "production";

export function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return defaultSiteOrigin();
}
