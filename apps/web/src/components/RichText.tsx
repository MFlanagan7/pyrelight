import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { headingId } from "@/lib/toc";
import styles from "./RichText.module.css";

type HeadingNode = {
  tag?: string;
  children?: unknown[];
  text?: string;
};

const textOf = (node: HeadingNode): string => {
  if (typeof node.text === "string") return node.text;
  return ((node.children ?? []) as HeadingNode[]).map(textOf).join("");
};

/**
 * Renders Payload's Lexical content.
 *
 * Wrapped rather than used directly so prose styling lives in one place, and so
 * headings get anchor ids. Without those the table of contents renders links
 * that jump nowhere.
 *
 * Ids come from lib/toc.ts, which the contents list also uses, and the `seen`
 * map is created per render so repeated headings are numbered the same way in
 * both — the converter visits headings in document order, as extractToc does.
 */
export function RichText({
  data,
  className,
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  const seen = new Map<string, number>();

  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      const label = textOf(node as HeadingNode).trim();
      // Only h2/h3 appear in the contents, but every heading with text gets an
      // id so deep links to any of them keep working.
      const id = label ? headingId(label, seen) : undefined;

      return <Tag id={id}>{nodesToJSX({ nodes: node.children })}</Tag>;
    },
  });

  return (
    <LexicalRichText
      data={data}
      converters={converters}
      className={[styles.prose, className].filter(Boolean).join(" ")}
    />
  );
}
