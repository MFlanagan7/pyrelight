import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal";
import { getLegalDocument } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Starfall collects, and what it does not.",
};

/** No licence notices — privacy is not a licensing document. */
export default async function PrivacyPage() {
  const doc = await getLegalDocument("privacy");

  return <LegalDocument doc={doc} fallbackTitle="Privacy" notices={[]} />;
}
