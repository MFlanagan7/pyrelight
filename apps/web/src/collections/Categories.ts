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
  admin: {
    useAsTitle: "title",
    // Kind first: the list mixes seven pillars with four blog categories, and
    // which is which matters more than the slug when scanning.
    defaultColumns: ["kind", "title", "slug"],
    // Beside Tags, since an editor deciding between them is choosing between
    // these two collections and nothing else.
    group: "Taxonomy",
    description:
      "Two different things in one collection, told apart by Kind. A wiki pillar is one of the seven sections at /wiki/<pillar>. A dispatch category is one of the blog's four. Each picker only offers the kind it needs, so pick Kind correctly and the rest follows.",
  },
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
