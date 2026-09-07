import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal";
import { getLegalDocument } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Trademark and licence notices for Starfall and Pyrelight Press.",
};

/**
 * Carries every notice applicable across the catalogue. An individual product
 * carries only the ones matching what it actually used — see
 * docs/legal-and-licensing.md.
 */
export default async function LegalPage() {
  const doc = await getLegalDocument("legal");

  return (
    <LegalDocument
      doc={doc}
      fallbackTitle="Legal"
      notices={["trademark", "srd-5.1", "srd-5.2"]}
    />
  );
}
