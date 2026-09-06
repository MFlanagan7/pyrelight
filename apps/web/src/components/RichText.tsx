import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import styles from "./RichText.module.css";

/**
 * Renders Payload's Lexical content. Wrapped rather than used directly so the
 * prose styling lives in one place and every long-form surface matches.
 */
export function RichText({
  data,
  className,
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  return (
    <LexicalRichText
      data={data}
      className={[styles.prose, className].filter(Boolean).join(" ")}
    />
  );
}
