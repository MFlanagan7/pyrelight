import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../hooks/revalidate";
import { slugField } from "../fields/slug";

/**
 * Cross-cutting labels, shared by the wiki, dispatches, products and resources.
 *
 * Distinct from Categories, which is the hierarchy an entry *lives in* — one
 * per entry, driving URLs and navigation. A tag says what an entry is *about*:
 * flat, many per entry, driving search ranking, filtering and related content.
 * Overloading one field with both jobs is how wiki taxonomies fail.
 *
 * A relationship field rather than free text, so authors pick from this list.
 * Free-typed tags rot into "gods", "god", "Deities" and "deity" within a year,
 * and filtering quietly stops working.
 */
export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "group", "slug"],
    group: "Taxonomy",
    description:
      "Controlled vocabulary. Adding a near-duplicate of an existing tag is worse than reusing a loose one.",
  },
  access: { read: () => true },
  hooks: revalidateCollection("/tags", "/tags"),
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "group",
      type: "select",
      required: true,
      defaultValue: "subject",
      options: [
        { label: "Subject — what it is about", value: "subject" },
        { label: "Type — what kind of thing it is", value: "type" },
        { label: "System — game mechanics it contains", value: "system" },
      ],
      admin: {
        position: "sidebar",
        description:
          "One term, one group. A System tag describes mechanics the entry CONTAINS (statblock, spell, encounter). If the term is a noun for what the entry is, it belongs in Type.",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description:
          "What belongs under this tag. Worth writing — it is what stops the vocabulary drifting.",
      },
    },
    {
      name: "aliases",
      type: "array",
      admin: {
        description:
          "Other names readers might search for. A tag is the only way to make an entry findable under a name its text never uses — full-text search cannot infer that.",
      },
      fields: [{ name: "alias", type: "text", required: true }],
    },
  ],
};
