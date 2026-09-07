import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal";
import { getLegalDocument } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Content licence",
  description: "What you may do with Starfall's setting material.",
};

/**
 * Starfall's own terms for fan and third-party use — a different document from
 * /legal, which covers what Pyrelight licenses *from* others. The trademark
 * notice appears here because this page is about use of the marks.
 */
export default async function ContentLicencePage() {
  const doc = await getLegalDocument("content-licence");

  return (
    <LegalDocument
      doc={doc}
      fallbackTitle="Content licence"
      notices={["trademark"]}
    />
  );
}
