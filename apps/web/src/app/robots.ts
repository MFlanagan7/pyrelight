import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Crawler rules.
 *
 * /admin and /api are disallowed because there is nothing there for a search
 * engine and every crawl of them costs a serverless invocation. This is not a
 * security measure — robots.txt is advisory, and access control is what
 * actually protects those routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
    host: siteUrl(),
  };
}
