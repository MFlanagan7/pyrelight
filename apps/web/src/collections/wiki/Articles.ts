import type { CollectionConfig } from "payload";
import { articleBlocks } from "../../blocks";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { searchTextField } from "../../fields/searchText";
import { seoField } from "../../fields/seo";
import { slugField } from "../../fields/slug";

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
    livePreview: { url: ({ data }) => `/wiki/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "summary", type: "textarea", admin: { description: "One paragraph. Shown in search results and category listings." } },
    { name: "category", type: "relationship", relationTo: "categories", admin: { position: "sidebar" } },
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
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [({ data }) => {
      const r = validateLicensing(data ?? {});
      if (r !== true) throw new Error(r);
      return data;
    }],
  },
};
