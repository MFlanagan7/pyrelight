import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/**
 * Plain text out of Lexical documents.
 *
 * Used by three callers that must agree: heading anchors, the contents list,
 * and the searchText column that full-text search reads. They previously each
 * carried their own copy of this walk.
 */

export type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

/** Concatenated text of a node and everything beneath it, no separators. */
export const nodeText = (node: LexicalNode): string => {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(nodeText).join("");
};

/**
 * Whole document as plain text, one block per line.
 *
 * Blocks are newline-separated rather than concatenated so the end of one
 * paragraph and the start of the next do not fuse into a word that was never
 * written — which would then match searches for a term nobody typed.
 */
export const lexicalToPlainText = (
  data: SerializedEditorState | null | undefined,
): string => {
  if (!data?.root) return "";

  const lines: string[] = [];

  const walk = (nodes: LexicalNode[]) => {
    for (const node of nodes) {
      // Text-bearing blocks are taken whole; containers are descended into.
      if (node.type === "paragraph" || node.type === "heading" || node.type === "quote") {
        const text = nodeText(node).trim();
        if (text) lines.push(text);
        continue;
      }
      if (node.children) walk(node.children);
      else if (typeof node.text === "string" && node.text.trim()) {
        lines.push(node.text.trim());
      }
    }
  };

  walk((data.root as unknown as LexicalNode).children ?? []);
  return lines.join("\n");
};
