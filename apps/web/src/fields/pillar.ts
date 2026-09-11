import type { Field } from "payload";

/**
 * The wiki pillar an entry lives under — its one home, and what the pillar
 * landing pages list.
 *
 * Every wiki collection needs this because pillars are not one-to-one with
 * collections. "Peoples & Powers" covers races, noble houses and guilds, which
 * span Factions and Articles; "The Gods" covers the pantheon and any article
 * about divine politics. A pillar page that simply listed one collection would
 * show part of its own subject.
 *
 * `filterOptions` restricts the picker to categories marked as wiki pillars, so
 * a dispatch category cannot be assigned to a wiki entry — the two live in one
 * collection and are told apart only by `kind`.
 */
export const pillarField = (): Field => ({
  name: "category",
  label: "Pillar",
  type: "relationship",
  relationTo: "categories",
  required: true,
  index: true,
  filterOptions: () => ({ kind: { equals: "wiki" } }),
  admin: {
    position: "sidebar",
    description:
      "Which of the seven pillars this belongs to. One per entry — cross-cutting connections are tags.",
  },
});
