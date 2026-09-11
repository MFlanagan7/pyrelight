import type { CollectionConfig } from "payload";
import { revalidateCollection, revalidateTagPages } from "../hooks/revalidate";
import { tagsField } from "../fields/tags";
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
  hooks: {
    // Two concerns: this collection's own pages, and the tag pages that
    // aggregate it. Arrays are concatenated so neither replaces the other.
    afterChange: [
      ...revalidateCollection("/dispatches", "/dispatches").afterChange,
      ...revalidateTagPages().afterChange,
    ],
    afterDelete: [
      ...revalidateCollection("/dispatches", "/dispatches").afterDelete,
      ...revalidateTagPages().afterDelete,
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    // "page" is reserved: /dispatches/page/N is the pagination route, so a
    // dispatch slugged "page" would be permanently unreachable.
    slugField("title", ["page"]),
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
      // Renamed from "tags": this is the post's category — Design Notes,
      // Worldbuilding, GM Advice, Studio — a different axis from the shared
      // tag vocabulary below.
      name: "category",
      type: "relationship",
      relationTo: "categories",
      admin: { position: "sidebar" },
    },
    tagsField(),
    seoField,
  ],
};
