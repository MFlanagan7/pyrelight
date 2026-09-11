import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

/**
 * The hierarchy an entry lives in — one per entry, driving navigation.
 *
 * Wiki pillars are the seven top-level sections at /wiki/<pillar>; dispatch
 * categories are the blog's four. Cross-cutting labels are Tags, a separate
 * collection, because "where does this live" and "what is this about" are
 * different questions and one field cannot answer both well.
 */
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "title", defaultColumns: ["title", "kind", "slug"] },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "description", type: "textarea" },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "wiki",
      // "Both" is gone: a wiki pillar is never also a blog category.
      options: [
        { label: "Wiki pillar", value: "wiki" },
        { label: "Dispatch category", value: "dispatch" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      admin: { position: "sidebar", description: "Optional, for nested categories." },
    },
  ],
};
