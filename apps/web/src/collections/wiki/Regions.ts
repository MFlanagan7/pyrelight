import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { seoField } from "../../fields/seo";
import { slugField } from "../../fields/slug";

/** Places. The setting counts four, but the model does not enforce that. */
export const WikiRegions: CollectionConfig = {
  slug: "wiki-regions",
  labels: { singular: "Region", plural: "Regions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "terrain", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => `/wiki/regions/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, label: "Name" },
    slugField(),
    { name: "terrain", type: "text", admin: { description: "'Drowned coast', 'Ashen steppe'." } },
    { name: "map", type: "upload", relationTo: "media" },
    { name: "summary", type: "textarea" },
    { name: "body", type: "richText" },
    {
      name: "locations",
      type: "array",
      admin: { description: "Keyed locations within the region." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    { name: "factions", type: "relationship", relationTo: "wiki-factions", hasMany: true, admin: { position: "sidebar" } },
    { name: "related", type: "relationship", relationTo: ["wiki-articles", "wiki-factions", "wiki-gods", "wiki-regions"], hasMany: true, admin: { position: "sidebar" } },
    ...licensingFields,
    seoField,
  ],
  hooks: { beforeValidate: [({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; }] },
};
