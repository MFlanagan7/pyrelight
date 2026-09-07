import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { TocItem } from "@/components/navigation";

/**
 * Heading anchors for long-form content.
 *
 * The table of contents and the rendered headings must agree on every id, or
 * the links go nowhere. Both derive them from this module by walking the same
 * document in the same order, so the two cannot drift.
 */

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

/** Concatenated text of a node and everything beneath it. */
const textOf = (node: LexicalNode): string => {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(textOf).join("");
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

/**
 * Assigns an id, suffixing repeats. Two headings called "Overview" must not
 * share an anchor — the second link would jump to the first.
 *
 * `seen` carries the counts, so callers must walk headings in document order
 * with a single map for the ids to line up.
 */
export const headingId = (text: string, seen: Map<string, number>): string => {
  const base = slugify(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
};

/** h2 and h3 only. h1 is the page title, and h4+ is too fine to navigate by. */
const TOC_TAGS: Record<string, 1 | 2> = { h2: 1, h3: 2 };

/** Builds the contents list for a Lexical document. */
export const extractToc = (data: SerializedEditorState | null | undefined): TocItem[] => {
  if (!data) return [];

  const seen = new Map<string, number>();
  const items: TocItem[] = [];

  const walk = (nodes: LexicalNode[]) => {
    for (const node of nodes) {
      if (node.type === "heading") {
        const label = textOf(node).trim();
        // A heading with no text has nothing to link to or label.
        if (label) {
          // Every heading consumes an id, not just the ones listed, because the
          // renderer assigns ids to all of them. Counting a different subset
          // here would number duplicate slugs differently and break the links.
          const id = headingId(label, seen);
          const depth = node.tag ? TOC_TAGS[node.tag] : undefined;
          if (depth) items.push({ id, label, depth });
        }
        continue;
      }
      if (node.children) walk(node.children);
    }
  };

  walk((data.root as unknown as LexicalNode).children ?? []);
  return items;
};
