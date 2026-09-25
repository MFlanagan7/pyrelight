import type { CollectionConfig } from "payload";
import { publishedOrEditor } from "../../access/publishedOrEditor";
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

/** Noble houses, orders, and other organised powers. */
export const WikiFactions: CollectionConfig = {
  slug: "wiki-factions",
  labels: { singular: "Faction", plural: "Factions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "seat", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => previewUrl(`/wiki/${data?.slug ?? ""}`) },
  },
  access: { read: publishedOrEditor },
  versions: draftsWithAutosave,
  fields: [
    { name: "title", type: "text", required: true, label: "Name" },
    // Pillars live at /wiki/<pillar> and entries at /wiki/<slug>, so an entry
    // may not take a pillar's name.
    slugField("title", RESERVED_WIKI_SLUGS),
    pillarField(),
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
    {
      name: "spoiler",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Renders behind a spoiler block." },
    },
    searchTextField({ text: ["title", "motto", "seat", "summary"], rich: ["body"] }),
    tagsField(),
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; },
      // Slugs must be unique across the flat /wiki namespace, not just here.
      uniqueWikiSlug("wiki-factions"),
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
