import type { CollectionConfig } from "payload";
import { revalidateLegal } from "../hooks/revalidate";
import { seoField } from "../fields/seo";

/**
 * Legal pages: their human-written prose only.
 *
 * The licence notices themselves are NOT here — they live in lib/legal.ts and
 * render from code, because they are mandated verbatim and a typo in an
 * attribution is a licence breach rather than a copy tweak. What is editable is
 * the explanation around them, which is genuinely yours and will evolve.
 *
 * `slug` is a fixed select rather than free text: each value maps to a route
 * that renders a specific set of notices, so a typo would silently produce a
 * document nothing displays.
 */
export const LegalDocuments: CollectionConfig = {
  slug: "legal-documents",
  labels: { singular: "Legal document", plural: "Legal documents" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "lastReviewed", "_status"],
    group: "Settings",
  },
  access: { read: () => true },
  versions: { drafts: true },
  hooks: revalidateLegal(),
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "/legal", value: "legal" },
        { label: "/privacy", value: "privacy" },
        { label: "/content-licence", value: "content-licence" },
      ],
      admin: {
        position: "sidebar",
        description: "Which route this document fills. One document per route.",
      },
    },
    {
      name: "lastReviewed",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Shown on the page so readers know how current the terms are.",
      },
    },
    {
      name: "intro",
      type: "textarea",
      admin: { description: "One or two sentences beneath the heading." },
    },
    {
      name: "body",
      type: "richText",
      admin: {
        description:
          "Your own explanation. The licence notices are appended automatically and cannot be edited here.",
      },
    },
    seoField,
  ],
};
