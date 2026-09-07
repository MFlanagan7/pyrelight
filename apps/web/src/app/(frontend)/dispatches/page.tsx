import type { Metadata } from "next";
import { DispatchIndex } from "@/components/dispatches/DispatchIndex";

export const metadata: Metadata = {
  title: "Dispatches",
  description: "Notes from the work and from the world. Starfall, built in public.",
  alternates: { canonical: "/dispatches" },
};

export default async function DispatchesIndex() {
  return <DispatchIndex page={1} />;
}
