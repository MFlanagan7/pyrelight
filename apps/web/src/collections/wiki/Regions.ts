import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { searchTextField } from "../../fields/searchText";
import { tagsField } from "../../fields/tags";
import { pillarField } from "../../fields/pillar";
import { revalidateCollection, revalidateTagPages } from "../../hooks/revalidate";
import { seoField } from "../../fields/seo";
import { RESERVED_WIKI_SLUGS } from "../../lib/wiki";
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
    // Pillars live at /wiki/<pillar> and entries at /wiki/<slug>, so an entry
    // may not take a pillar's name.
    slugField("title", RESERVED_WIKI_SLUGS),
    pillarField(),
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
    searchTextField({ text: ["title", "terrain", "summary"], rich: ["body"], arrays: [{ name: "locations", fields: ["name", "description"] }] }),
    tagsField(),
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; }],
    // Entries share the flat /wiki namespace, and their pillar page lists them.
    afterChange: [
      ...revalidateCollection("/wiki", "/wiki").afterChange,
      ...revalidateTagPages().afterChange,
    ],
    afterDelete: [
      ...revalidateCollection("/wiki", "/wiki").afterDelete,
      ...revalidateTagPages().afterDelete,
    ],
  },
};
