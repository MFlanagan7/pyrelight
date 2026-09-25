import type { CollectionConfig } from "payload";
import { draftsWithAutosave } from "../versions";
import { previewUrl } from "../../lib/preview";
import { articleBlocks } from "../../blocks";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { searchTextField } from "../../fields/searchText";
import { tagsField } from "../../fields/tags";
import { pillarField } from "../../fields/pillar";
import { revalidateCollection, revalidateTagPages } from "../../hooks/revalidate";
import { seoField } from "../../fields/seo";
import { RESERVED_WIKI_SLUGS } from "../../lib/wiki";
import { slugField } from "../../fields/slug";
import { uniqueWikiSlug } from "../../hooks/uniqueWikiSlug";

/**
 * General wiki entries — everything that is not a Faction, God, or Region, each
 * of which has enough structured fields to deserve its own collection.
 */
export const WikiArticles: CollectionConfig = {
  slug: "wiki-articles",
  labels: { singular: "Wiki article", plural: "Wiki articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "contentKind", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => previewUrl(`/wiki/${data?.slug ?? ""}`) },
  },
  access: { read: () => true },
  versions: draftsWithAutosave,
  fields: [
    { name: "title", type: "text", required: true },
    // Pillars live at /wiki/<pillar> and entries at /wiki/<slug>, so an entry
    // may not take a pillar's name.
    slugField("title", RESERVED_WIKI_SLUGS),
    { name: "summary", type: "textarea", admin: { description: "One paragraph. Shown in search results and category listings." } },
    pillarField(),
    { name: "body", type: "richText" },
    {
      name: "sections",
      type: "blocks",
      blocks: articleBlocks,
      admin: { description: "Optional structured sections beneath the body." },
    },
    {
      name: "related",
      type: "relationship",
      relationTo: ["wiki-articles", "wiki-factions", "wiki-gods", "wiki-regions"],
      hasMany: true,
      admin: { position: "sidebar" },
    },
    {
      name: "spoiler",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Renders behind a spoiler block." },
    },
    searchTextField({ text: ["title", "summary"], rich: ["body"] }),
    tagsField(),
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; },
      // Slugs must be unique across the flat /wiki namespace, not just here.
      uniqueWikiSlug("wiki-articles"),
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
