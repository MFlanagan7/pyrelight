/**
 * The site's canonical origin.
 *
 * Used for absolute URLs in the sitemap, canonical tags, and social cards —
 * all of which must be absolute, and wrong everywhere if this is wrong.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deployment, which keeps
 * preview builds pointing at production rather than at a preview hostname that
 * will not exist next week.
 */
export const siteUrl = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
};

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string): string =>
  new URL(path, siteUrl()).toString();
