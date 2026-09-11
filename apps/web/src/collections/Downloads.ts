import type { CollectionConfig } from "payload";

/**
 * Files delivered to visitors: PDFs, VTT packs, printable handouts.
 *
 * Separate from Media, and stored in a PRIVATE bucket, because the two need
 * opposite access policies. Site imagery is public by design — it renders on
 * public pages. A download behind an email gate must not also be a URL anyone
 * can paste into a group chat, which is exactly what a public bucket gives you.
 *
 * Nothing here is served directly. Payload's own file route is closed to the
 * public by the access rule below, and delivery goes through a short-lived
 * signed URL issued only after the download form is completed. See
 * lib/downloads.ts.
 */
export const Downloads: CollectionConfig = {
  slug: "downloads",
  labels: { singular: "Download", plural: "Downloads" },
  admin: {
    useAsTitle: "filename",
    group: "Media",
    description:
      "Private files. Attach one to a Resource rather than linking to it directly.",
  },
  access: {
    /**
     * Editors only. This closes Payload's /api/downloads/file/<name> route to
     * the public, which would otherwise hand out the file with no gate at all —
     * the access rule is the gate, not the bucket's privacy alone.
     */
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // No image sizes: these are documents and archives, not pictures.
    disableLocalStorage: true,
    mimeTypes: [
      "application/pdf",
      "application/zip",
      "image/png",
      "image/jpeg",
      "image/webp",
      "text/plain",
      "text/markdown",
    ],
  },
  fields: [
    {
      name: "label",
      type: "text",
      admin: {
        description:
          "What a visitor sees on the download button. Defaults to the filename.",
      },
    },
  ],
};
