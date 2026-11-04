import type { MetadataRoute } from "next";
import { getAllStaticRoutes } from "@/lib/routes";
import { isProduction, resolveSiteUrl } from "@/lib/env.server";

export default function sitemap(): MetadataRoute.Sitemap {
  // Empty in dev; full route list when built or run with NODE_ENV=production.
  if (!isProduction && process.env.NODE_ENV !== "production") {
    return [];
  }

  const base = resolveSiteUrl();
  const now = new Date();
  return getAllStaticRoutes().map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.path === "/" ? 1 : 0.7,
  }));
}
