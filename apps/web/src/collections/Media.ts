import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  /**
   * The one collection left open over HTTP, deliberately.
   *
   * When S3_PUBLIC_BUCKET is true these files serve from Supabase's CDN and
   * Payload's own file route goes unused. When it is not — a fresh clone, or
   * local disk storage — images ARE served through /api/media/file/..., and
   * restricting read would break every image on the site with a 403 that looks
   * nothing like a configuration problem.
   *
   * Nothing is lost by leaving it: these are images already published on the
   * public site and already downloadable from a CDN without asking us.
   */
  access: { read: () => true },
  upload: {
    /**
     * Sizes match the design system's frames: cards, covers, full-bleed art.
     *
     * Every size bounds BOTH dimensions with fit "inside". A width-only resize
     * preserves aspect ratio without limit, so an unusually tall source — a
     * full-page screenshot, say — produces something like 1200x10499 at several
     * megabytes. "inside" scales to fit within the box and never crops or
     * enlarges, so the original stays the source of truth for detail.
     */
    imageSizes: [
      { name: "thumb", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "cover", width: 1200, height: 1600, fit: "inside", withoutEnlargement: true },
      { name: "hero", width: 2560, height: 1600, fit: "inside", withoutEnlargement: true },
    ],
    focalPoint: true,
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe what the image shows. Decorative art still needs alt text — say what it depicts.",
      },
    },
    { name: "credit", type: "text", admin: { description: "Artist attribution, where commissioned." } },
  ],
};
