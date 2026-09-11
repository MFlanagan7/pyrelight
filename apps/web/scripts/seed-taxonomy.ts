/**
 * Seeds the structural taxonomy: the seven wiki pillars and the four dispatch
 * categories from docs/starfall-site-ia.md.
 *
 * These are structure rather than editorial content — the pillars are already
 * declared in lib/wiki.ts and reserved as slugs, so creating them by hand in
 * the admin would just be transcription with a chance of typos.
 *
 * Idempotent: entries are matched by slug and skipped if present, so it is safe
 * to re-run, and it is how the production database gets the same taxonomy when
 * dev and production are finally split.
 *
 *   pnpm seed:taxonomy
 *
 * Tags are deliberately NOT seeded. The vocabulary in the IA is a starting
 * list, and tags are best added as real content demands them — a vocabulary
 * invented ahead of the writing tends to describe content nobody wrote.
 */
import { readFileSync } from "node:fs";

for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
  if (!/^[A-Z]/.test(line)) continue;
  const i = line.indexOf("=");
  process.env[line.slice(0, i)] = line.slice(i + 1).trim();
}

const { getPayload } = await import("payload");
const { default: config } = await import("../src/payload.config");
const { WIKI_PILLARS } = await import("../src/lib/wiki");

const payload = await getPayload({ config });

type Seed = {
  title: string;
  slug: string;
  kind: "wiki" | "dispatch";
  description: string;
};

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  astralite:
    "The falling divine light: what it is, its grades and uses, the economy around it, the craters, the Descent.",
  gods: "The pantheon, the fallen and the dead, gods walking among mortals, divine politics.",
  sea: "The wild seas, the wardens, the Serpent Wall, sea-dread, the drowned god's legacy.",
  peoples: "Races, noble houses, factions, guilds, the Colvan Exchange, the Athean Order.",
  magic: "Primvok, the first language. Magic items, how magic works, the Primvoker path.",
  realms: "Continents, regions, geography, and who holds what.",
  history: "Timeline, the Hoarding Age, the Descent, ages and turning points.",
};

const DISPATCH_CATEGORIES: Seed[] = [
  { title: "Design Notes", slug: "design-notes", kind: "dispatch", description: "How a map or adventure was built, usually alongside a release." },
  { title: "Worldbuilding", slug: "worldbuilding", kind: "dispatch", description: "Lore essays and the thinking behind the setting." },
  { title: "GM Advice", slug: "gm-advice", kind: "dispatch", description: "Running intrigue, seafaring, Primvok; craft in general." },
  { title: "Studio", slug: "studio", kind: "dispatch", description: "Building in public: retrospectives, what sold, what did not." },
];

const seeds: Seed[] = [
  ...WIKI_PILLARS.map((p) => ({
    title: p.title,
    slug: p.slug,
    kind: "wiki" as const,
    description: PILLAR_DESCRIPTIONS[p.slug] ?? "",
  })),
  ...DISPATCH_CATEGORIES,
];

let created = 0;
let skipped = 0;

for (const seed of seeds) {
  const existing = await payload.find({
    collection: "categories",
    where: { slug: { equals: seed.slug } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    skipped++;
    console.log(`  skip    ${seed.kind.padEnd(8)} ${seed.slug}`);
    continue;
  }

  await payload.create({ collection: "categories", data: seed });
  created++;
  console.log(`  create  ${seed.kind.padEnd(8)} ${seed.slug}`);
}

console.log(`\n${created} created, ${skipped} already present.`);
process.exit(0);
