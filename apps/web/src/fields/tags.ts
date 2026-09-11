import type { Field } from "payload";

/**
 * Cross-cutting tags, shared by every content type.
 *
 * Defined once so the field is identical everywhere — a tag that means one
 * thing on a wiki entry and another on a product is not a shared vocabulary.
 */
export const tagsField = (description?: string): Field => ({
  name: "tags",
  type: "relationship",
  relationTo: "tags",
  hasMany: true,
  admin: {
    position: "sidebar",
    description:
      description ??
      "What this is about. Pick from the list; if nothing fits, add the tag rather than a near-duplicate.",
  },
});
