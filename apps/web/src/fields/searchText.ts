import type { Field } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { lexicalToPlainText } from "../lib/lexical-text";

/**
 * Denormalised plain text for full-text search.
 *
 * Postgres cannot search inside Lexical's JSON usefully, so the body is
 * flattened to text on save and searched from here. Derived, never authored:
 * hidden in the admin and recomputed on every write, so it cannot drift from
 * the content it mirrors.
 *
 * Populated now, ahead of the search feature, because the alternative is
 * backfilling it across everything written between now and then.
 */

type Options = {
  /** Plain text/textarea fields to include, e.g. title, summary, epithet. */
  text?: string[];
  /** Rich text fields to flatten, e.g. body. */
  rich?: string[];
  /**
   * Array fields, with the sub-fields to take from each row — a region's keyed
   * locations, say. Without these, "which region has the Drowned Chapel?"
   * finds nothing, because the answer lives in a row rather than the body.
   */
  arrays?: { name: string; fields: string[] }[];
};

const collect = (data: Record<string, unknown>, opts: Options): string => {
  const parts: string[] = [];

  for (const name of opts.text ?? []) {
    const value = data?.[name];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }

  for (const name of opts.rich ?? []) {
    const value = data?.[name];
    if (value && typeof value === "object") {
      const text = lexicalToPlainText(value as SerializedEditorState);
      if (text) parts.push(text);
    }
  }

  return parts.join("\n");
};

export const searchTextField = (opts: Options): Field => ({
  name: "searchText",
  type: "textarea",
  admin: {
    hidden: true,
    readOnly: true,
    description: "Generated from the entry's text on save. Not edited directly.",
  },
  // Excluded from the API by default: it is a duplicate of content the caller
  // already has, and shipping it doubles every payload for no benefit.
  hooks: {
    beforeChange: [({ data }) => collect((data ?? {}) as Record<string, unknown>, opts)],
  },
});
