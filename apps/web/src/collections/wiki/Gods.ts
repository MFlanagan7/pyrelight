import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../../fields/licensing";
import { searchTextField } from "../../fields/searchText";
import { tagsField } from "../../fields/tags";
import { seoField } from "../../fields/seo";
import { RESERVED_WIKI_SLUGS } from "../../lib/wiki";
import { slugField } from "../../fields/slug";

/** The pantheon. Status matters to the setting: divinity fell and got stranded. */
export const WikiGods: CollectionConfig = {
  slug: "wiki-gods",
  labels: { singular: "God", plural: "Gods" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "epithet", "divineStatus", "_status"],
    group: "Wiki",
    livePreview: { url: ({ data }) => `/wiki/gods/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, label: "Name" },
    // Pillars live at /wiki/<pillar> and entries at /wiki/<slug>, so an entry
    // may not take a pillar's name.
    slugField("title", RESERVED_WIKI_SLUGS),
    { name: "epithet", type: "text", admin: { description: "The name mortals use. 'The Drowned Lantern'." } },
    {
      // NOT "status": Payload's drafts feature adds a _status column whose enum is
      // named enum_<collection>_status. A field called "status" collides with it,
      // and the generated _status column inherits these values instead of
      // draft/published, which fails at CREATE TABLE.
      name: "divineStatus",
      label: "Status",
      type: "select",
      required: true,
      defaultValue: "stranded",
      options: [
        { label: "Ascendant", value: "ascendant" },
        { label: "Stranded", value: "stranded" },
        { label: "Dead", value: "dead" },
        { label: "Unknown", value: "unknown" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "domains", type: "array", fields: [{ name: "domain", type: "text", required: true }] },
    { name: "symbol", type: "upload", relationTo: "media", admin: { description: "Flat single-colour sigil on transparent PNG." } },
    { name: "summary", type: "textarea" },
    { name: "body", type: "richText" },
    { name: "worshippedIn", type: "relationship", relationTo: "wiki-regions", hasMany: true, admin: { position: "sidebar" } },
    { name: "related", type: "relationship", relationTo: ["wiki-articles", "wiki-factions", "wiki-gods", "wiki-regions"], hasMany: true, admin: { position: "sidebar" } },
    searchTextField({ text: ["title", "epithet", "summary"], rich: ["body"], arrays: [{ name: "domains", fields: ["domain"] }] }),
    tagsField(),
    ...licensingFields,
    seoField,
  ],
  hooks: { beforeValidate: [({ data }) => { const r = validateLicensing(data ?? {}); if (r !== true) throw new Error(r); return data; }] },
};
