/**
 * The wiki's pillars — its top-level categories.
 *
 * Wiki entries live flat at /wiki/<slug> while pillars live at /wiki/<pillar>,
 * so these words are reserved: an entry slugged "gods" would shadow the Gods
 * pillar, and nothing in the admin or the build would say why. Flat URLs are
 * deliberate — nesting entries under their pillar would break every link the
 * first time an entry is recategorised, which wikis do constantly.
 *
 * Defined here rather than in the collections so the reservation list and the
 * routes that render these pages cannot drift apart.
 */
export const WIKI_PILLARS = [
  { slug: "astralite", title: "Astralite" },
  { slug: "gods", title: "The Gods" },
  { slug: "sea", title: "The Sea" },
  { slug: "peoples", title: "Peoples & Powers" },
  { slug: "magic", title: "Magic" },
  { slug: "realms", title: "Realms" },
  { slug: "history", title: "History" },
] as const;

export type WikiPillarSlug = (typeof WIKI_PILLARS)[number]["slug"];

/**
 * Slugs a wiki entry may not use. The pillars, plus "search" and "tags" so a
 * future /wiki/search or a stray link cannot be shadowed either.
 */
export const RESERVED_WIKI_SLUGS: string[] = [
  ...WIKI_PILLARS.map((p) => p.slug),
  "search",
  "tags",
  "tag",
];

/**
 * The collections sharing the flat /wiki namespace.
 *
 * Listed here, with no imports above, because the collections themselves need
 * it — to check a slug is not already taken in a sibling — and anything reached
 * through lib/payload would import the config that imports them.
 *
 * lib/wiki-content.ts derives its own list from this one, so the two cannot
 * drift.
 */
export const WIKI_COLLECTION_SLUGS = [
  "wiki-articles",
  "wiki-gods",
  "wiki-factions",
  "wiki-regions",
] as const;

export type WikiCollectionSlug = (typeof WIKI_COLLECTION_SLUGS)[number];
