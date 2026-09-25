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
export const slugField = (
  from = "title",
  reserved: string[] = [],
  /**
   * Set `unique: false` where the URL is not the slug alone.
   *
   * A database-wide unique slug is right when the slug IS the path, and wrong
   * when something else scopes it. Resources live at /resources/<section>/<slug>,
   * so a map and a handout may both be called "tavern" without colliding — and
   * a collection-wide constraint would refuse the second for no reason a
   * reader could see. Uniqueness within the scope is enforced by the
   * collection instead, which is the only place that knows what the scope is.
   */
  { unique = true }: { unique?: boolean } = {},
): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique,
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
