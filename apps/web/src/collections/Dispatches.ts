import type { CollectionConfig } from "payload";
import { seoField } from "../fields/seo";
import { slugField } from "../fields/slug";

/**
 * The blog. Named Dispatches — reports from the world and from the work.
 * Written in the first person; the studio speaks as "we" everywhere else.
 */
export const Dispatches: CollectionConfig = {
  slug: "dispatches",
  labels: { singular: "Dispatch", plural: "Dispatches" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
    livePreview: { url: ({ data }) => `/dispatches/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 300,
      admin: { description: "Shown in the index. Two or three sentences." },
    },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "body", type: "richText", required: true },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: { position: "sidebar" },
    },
    seoField,
  ],
};
