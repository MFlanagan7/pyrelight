import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { seoField } from "../../fields/seo";
import { slugField } from "../../fields/slug";

/** Noble houses, orders, and other organised powers. */
export const WikiFactions: CollectionConfig = {
  slug: "wiki-factions",
  labels: { singular: "Faction", plural: "Factions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "seat", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => `/wiki/factions/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, label: "Name" },
    slugField(),
    {
      name: "kind",
      type: "select",
      defaultValue: "house",
      options: [
        { label: "Noble house", value: "house" },
        { label: "Order", value: "order" },
        { label: "Guild", value: "guild" },
        { label: "Cult", value: "cult" },
        { label: "Other", value: "other" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "sigil", type: "upload", relationTo: "media" },
    { name: "motto", type: "text" },
    { name: "seat", type: "text", admin: { description: "Where they hold power." } },
    { name: "region", type: "relationship", relationTo: "wiki-regions", admin: { position: "sidebar" } },
    { name: "summary", type: "textarea" },
    { name: "body", type: "richText" },
    { name: "related", type: "relationship", relationTo: ["wiki-articles", "wiki-factions", "wiki-gods", "wiki-regions"], hasMany: true, admin: { position: "sidebar" } },
    ...licensingFields,
    seoField,
  ],
  hooks: { beforeValidate: [({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; }] },
};
