import type { CollectionConfig } from "payload";
import { contentRead } from "../../access/contentRead";
import { draftsWithAutosave } from "../versions";
import { previewUrl } from "../../lib/preview";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { searchTextField } from "../../fields/searchText";
import { tagsField } from "../../fields/tags";
import { pillarField } from "../../fields/pillar";
import { revalidateCollection, revalidateTagPages } from "../../hooks/revalidate";
import { seoField } from "../../fields/seo";
import { RESERVED_WIKI_SLUGS } from "../../lib/wiki";
import { slugField } from "../../fields/slug";
import { uniqueWikiSlug } from "../../hooks/uniqueWikiSlug";

/** Places. The setting counts four, but the model does not enforce that. */
export const WikiRegions: CollectionConfig = {
  slug: "wiki-regions",
  labels: { singular: "Region", plural: "Regions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "terrain", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => previewUrl(`/wiki/${data?.slug ?? ""}`) },
  },
  access: { read: contentRead },
  versions: draftsWithAutosave,
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
    {
      name: "spoiler",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Renders behind a spoiler block." },
    },
    searchTextField({ text: ["title", "terrain", "summary"], rich: ["body"], arrays: [{ name: "locations", fields: ["name", "description"] }] }),
    tagsField(),
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; },
      // Slugs must be unique across the flat /wiki namespace, not just here.
      uniqueWikiSlug("wiki-regions"),
    ],
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
