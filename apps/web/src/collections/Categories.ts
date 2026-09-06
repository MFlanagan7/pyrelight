import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

/** Shared taxonomy: tags Dispatches and categorises wiki articles. */
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
      options: [
        { label: "Wiki category", value: "wiki" },
        { label: "Dispatch tag", value: "dispatch" },
        { label: "Both", value: "both" },
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
