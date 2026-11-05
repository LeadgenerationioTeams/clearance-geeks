import type { MetadataRoute } from "next";
import { isProduction, resolveSiteUrl } from "@/lib/env.server";

export default function robots(): MetadataRoute.Robots {
  const allow = isProduction;

  return {
    rules: [
      {
        userAgent: "*",
        allow: allow ? "/" : "",
        disallow: allow ? "" : "/",
      },
      {
        userAgent: "GPTBot",
        allow: allow ? "/" : "",
        disallow: allow ? "" : "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: allow ? "/" : "",
        disallow: allow ? "" : "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: allow ? "/" : "",
        disallow: allow ? "" : "/",
      },
      {
        userAgent: "Google-Extended",
        allow: allow ? "/" : "",
        disallow: allow ? "" : "/",
      },
    ],
    sitemap: `${resolveSiteUrl()}/sitemap.xml`,
  };
}
