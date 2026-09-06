import type { CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";
import { seoField } from "../fields/seo";
import { slugField } from "../fields/slug";

/**
 * Composed marketing and informational pages. The `sections` field is the whole
 * point: a page is an ordered list of design system sections, assembled in the
 * admin without touching code.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => `/${data?.slug === "home" ? "" : (data?.slug ?? "")}`,
    },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "sections",
      type: "blocks",
      blocks: pageBlocks,
      admin: {
        description:
          "Ordered top to bottom. A hero belongs first and only once — gold is rationed, so at most one primary action per viewport.",
      },
    },
    seoField,
  ],
};
