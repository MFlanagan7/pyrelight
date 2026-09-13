import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Crawler rules.
 *
 * /admin and /api are disallowed because there is nothing there for a search
 * engine and every crawl of them costs a serverless invocation. This is not a
 * security measure — robots.txt is advisory, and access control is what
 * actually protects those routes.
 *
 * Staging is disallowed OUTRIGHT. Its URL is unguessable rather than protected,
 * and an indexed staging site competes with the live one for the same terms
 * while showing unfinished drafts to the public. next.config.ts also sends
 * X-Robots-Tag: noindex there, which is the stronger of the two — robots.txt
 * stops a crawl, but a URL linked from elsewhere can still be listed without
 * one.
 */
export default function robots(): MetadataRoute.Robots {
  /**
   * Deliberately treats an unknown environment as production.
   *
   * The two failure directions are not equal. Indexing staging is untidy and
   * reversible; de-indexing the live site because a build did not inline this
   * variable would quietly destroy its search presence for weeks. So this only
   * locks the door when it positively knows it is not production.
   */
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const isPublic = !environment || environment === "production";

  if (!isPublic) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

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
