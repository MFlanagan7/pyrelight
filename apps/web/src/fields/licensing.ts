import type { Field } from "payload";

/**
 * Licensing metadata required by docs/legal-and-licensing.md.
 *
 * The rule these fields enforce: lore is reusable across every system, crunch is
 * locked to the system it was written from, and SRD-derived text may never be
 * mixed with ORC-derived text in one document. Recording it per entry is what
 * lets the site render the correct attribution automatically instead of relying
 * on someone remembering.
 */
export const licensingFields: Field[] = [
  {
    type: "collapsible",
    label: "Licensing",
    admin: {
      description:
        "Lore is reusable anywhere. Crunch is locked to its system — never carry mechanical text between SRD and ORC products.",
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "contentKind",
            type: "select",
            required: true,
            defaultValue: "lore",
            options: [
              { label: "Lore — setting, fiction, art", value: "lore" },
              { label: "Crunch — rules, stat blocks, mechanics", value: "crunch" },
            ],
            admin: { width: "50%" },
          },
          {
            name: "gameSystem",
            type: "select",
            required: true,
            defaultValue: "system-neutral",
            options: [
              { label: "System neutral", value: "system-neutral" },
              { label: "D&D 5e (2014 rules)", value: "5e-2014" },
              { label: "D&D 5e (2024 rules)", value: "5e-2024" },
              { label: "Pathfinder 2e", value: "pf2e" },
              { label: "Starfinder 2e", value: "sf2e" },
            ],
            admin: { width: "50%" },
          },
        ],
      },
      {
        name: "licence",
        type: "select",
        required: true,
        defaultValue: "none",
        options: [
          { label: "None — wholly original content", value: "none" },
          { label: "SRD 5.1 (CC BY 4.0)", value: "srd-5.1" },
          { label: "SRD 5.2 (CC BY 4.0)", value: "srd-5.2" },
          { label: "ORC Licence (Paizo)", value: "orc" },
        ],
        admin: {
          description:
            "Drives which attribution notice renders. Set this to what the entry actually drew from — attributing an SRD you did not use is misleading.",
        },
      },
    ],
  },
];

/**
 * Rejects the one combination that is a licence breach rather than a mistake:
 * mechanical content that claims a licence belonging to a different system.
 */
export const validateLicensing = (data: {
  contentKind?: string;
  gameSystem?: string;
  licence?: string;
}): string | true => {
  const { contentKind, gameSystem, licence } = data;

  if (contentKind !== "crunch") return true;

  const srd = licence === "srd-5.1" || licence === "srd-5.2";
  const orc = licence === "orc";
  const dnd = gameSystem === "5e-2014" || gameSystem === "5e-2024";
  const paizo = gameSystem === "pf2e" || gameSystem === "sf2e";

  if (srd && paizo) {
    return "SRD-licensed text cannot be used in a Pathfinder or Starfinder product. Rewrite the mechanics from the ORC source.";
  }
  if (orc && dnd) {
    return "ORC-licensed text cannot be used in a D&D product. Rewrite the mechanics from the relevant SRD.";
  }
  if (licence === "none" && (dnd || paizo)) {
    return "Mechanical content derived from a system needs its licence recorded. Choose the SRD or ORC source it was written from.";
  }

  return true;
};
