/**
 * Licence notices, reproduced verbatim.
 *
 * These strings are mandated by licence terms — a typo in an attribution is a
 * licence breach, not a copy tweak. That is why they live in code with a single
 * source rather than in the CMS where they could be edited casually. Keep them
 * in step with docs/legal-and-licensing.md.
 */

/** Design-system mandated, on every page footer. */
export const TRADEMARK_NOTICE =
  "© 2024–2026 Pyrelight Press. Starfall and all associated names, sigils and artwork are trademarks of Pyrelight Press. Compatible with fifth edition; not affiliated with or endorsed by Wizards of the Coast.";

export const SRD_5_1_ATTRIBUTION =
  'This work includes material from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC, available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.';

export const SRD_5_2_ATTRIBUTION =
  'This work includes material from the System Reference Document 5.2 ("SRD 5.2") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.';

/**
 * The notice a single product or entry must carry, based on what it actually
 * used. Attributing an SRD a work did not draw from is misleading, so anything
 * without a recorded licence gets nothing.
 */
export const attributionFor = (licence?: string | null): string | null => {
  switch (licence) {
    case "srd-5.1":
      return SRD_5_1_ATTRIBUTION;
    case "srd-5.2":
      return SRD_5_2_ATTRIBUTION;
    case "orc":
      return "This work includes material licensed under the ORC License, held by Azora Law and available at https://paizo.com/orclicense.";
    default:
      return null;
  }
};
