import type { Field } from "payload";

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * URL slug, derived from another field on first save and editable afterwards.
 * Kept editable because a published URL should not silently change when someone
 * fixes a typo in a title.
 */
export const slugField = (from = "title", reserved: string[] = []): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Generated from the title on first save. Changing it breaks existing links.",
  },
  validate: (value: string | null | undefined) => {
    if (!value) return "A slug is required.";
    if (reserved.includes(value)) {
      return `"${value}" is reserved by a route on this collection. Choose another slug.`;
    }
    return true;
  },
  hooks: {
    beforeValidate: [
      ({ value, data, operation }) => {
        if (typeof value === "string" && value.length > 0) return toSlug(value);
        if (operation === "create") {
          const source = data?.[from];
          if (typeof source === "string") return toSlug(source);
        }
        return value;
      },
    ],
  },
});
