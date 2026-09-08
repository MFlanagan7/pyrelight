# Starfall — Website Information Architecture

*Navigation, pages, wiki taxonomy, and how it all fits together.*

> **The one big idea:** This is really **three sites in one**, each serving a different visitor.
> **Marketing** ("should I care?") → sell the world. **Wiki** ("tell me about X") → explore the lore. **Resources** ("help me run Thursday") → tools for GMs. Keep them structurally distinct or everything turns to mush.

---

## 1 · Top-Level Navigation

The navbar is the single most important IA decision — it teaches visitors what this site is. Keep it to **5–6 items**. Resist cramming; depth lives in landing pages, not the bar.

**Recommended navbar (in order):**

| Nav item | Leads to | Job |
|---|---|---|
| The World | Wiki/lore landing | Explore the setting (your atmospheric hook) |
| Products | Product catalog | Buy — links out to itch/DriveThru |
| Resources | Tools/guides/maps landing | Help GMs run the game |
| Dispatches | Blog | Content engine, build-in-public |
| About | Studio + newsletter | Who + why + signup |

> **Why this order:** "The World" leads because wonder is your hook — the first click should drop them into the setting, not a store. "Products" sits second so buying is always one click away. A persistent **newsletter signup** and a small **search** belong in the nav or its immediate area on every page.

Utility nav (footer or top-right, smaller): Search, Newsletter, and the cross-link to *Pyrelight Press* (the studio site). Legal / Privacy / Content-License live in the footer only.

---

## 2 · Marketing Pages

The pages that sell the world and route visitors. These launch **first** and can exist before the wiki or resource library has much in it.

| Page | URL | Contains |
|---|---|---|
| Home | `/` | Dark hero (astralite hook, tagline, CTA), lore teasers, latest products, newsletter. The front door. |
| The World (landing) | `/world` | Atmospheric intro to the setting + gateways into the wiki's main pillars. NOT the wiki itself — the on-ramp to it. |
| Products | `/products` | Grid of products (maps, adventures, supplements) linking to itch/DriveThru. Filter by type. |
| Product detail | `/products/[slug]` | Per-product page: covers, blurb, previews, what's inside, buy links, related. |
| About | `/about` | Who you are, why Starfall, the studio, prominent newsletter signup. |
| Dispatches | `/dispatches` | Blog index (see §5). |

> **The World page is a hinge:** `/world` is where marketing hands off to wiki. It should be **evocative, not encyclopedic** — a beautiful gateway that teases the pillars (Astralite, The Gods, The Sea, The Peoples, Magic) and links into the deeper wiki. Newcomers get wonder; the curious get a door.

---

## 3 · The Wiki (Lore)

The explorable setting. This is where your worldbuilding lives. The key design choice: **organize by the world's own structure**, not by a flat A–Z list. Your setting already has natural pillars — use them as the top categories.

### Wiki top categories (the pillars)

Seven pillars, drawn from what Starfall actually is. Each is a landing page that lists its articles.

| Pillar | URL | Holds |
|---|---|---|
| Astralite | `/wiki/astralite` | The falling divine light: what it is, grades, uses, the economy, craters, the Descent. Your signature — give it top billing. |
| The Gods | `/wiki/gods` | The pantheon, the fallen/dead gods, gods walking among mortals, divine politics. |
| The Sea | `/wiki/sea` | The wild seas, the wardens (Tochigi), the Serpent Wall, sea-dread, the drowned god's legacy. |
| Peoples & Powers | `/wiki/peoples` | Races, noble houses, factions, guilds, the Colvan Exchange, the Athean Order. |
| Magic | `/wiki/magic` | Primvok (the first language), magic items, how magic works, the Primvoker path. |
| Realms | `/wiki/realms` | Continents, regions, geography, who holds what. |
| History | `/wiki/history` | Timeline, the Hoarding Age, the Descent, ages and turning points. |

> **Reserved slugs:** Entries live flat at `/wiki/<slug>` and pillars at `/wiki/<pillar>`, so the pillar names are reserved and rejected as entry slugs — an entry called "gods" would otherwise shadow the Gods pillar silently. Flat is deliberate: nesting entries under their pillar would break every link the first time an entry is recategorised. Enforced in `apps/web/src/lib/wiki.ts`.

> **Why pillars, not A–Z:** A flat wiki (just articles + tags) makes newcomers feel lost — they don't know where to start. Pillar landing pages give a **guided way in**: someone who clicked "Astralite" on the marketing site lands on a curated pillar page, not a search box. Tags then provide the cross-cutting connections underneath.

### Wiki article types (templates)

Different lore needs different page shapes. Define a handful of **article templates** so entries are consistent and skimmable:

- **Concept** (Astralite, Primvok, the Descent) — what it is, how it works, why it matters, mysteries.
- **Deity** (a god) — domain, status (living/fallen/dead), symbols, worship, current role, secrets.
- **Faction** (a house, guild, order) — who they are, goals, leadership, relationships, hooks.
- **People/Race** — origins, culture, relationship to astralite, notable members, play notes.
- **Place** (continent, region, city) — geography, who holds it, what happens there, adventure seeds.
- **Character** (an NPC) — role, motivation, secrets, stat-block link.

### The two-taxonomy rule: Categories ≠ Tags

Your idea list mixes these, so separate them cleanly — this is the single most useful wiki-IA distinction:

| | CATEGORIES | TAGS |
|---|---|---|
| What | The article's home — ONE primary pillar | Cross-cutting labels — MANY per article |
| Answers | "Where does this live?" | "What else is this related to?" |
| Rule | Every article has exactly one | An article has several |
| Example | "Tochigi" → category: Peoples & Powers | tags: sea, warden, race, faction, dragonborn |

### The tag vocabulary

Tags are the connective tissue — they let a reader on the Astralite page jump to every faction, place, and item that touches astralite. Keep the vocabulary **controlled** (a fixed list you maintain), not free-form, or it sprawls into chaos. Group them:

**Subject tags** (what the article is about):
`astralite · primvok · sea · gods · undead · nobility · trade · shadow · warforged · the-descent · bloodmark`

**Type tags** (what kind of thing it is):
`deity · faction · race · house · guild · region · continent · city · npc · concept · magic-item · creature · event`

**System tags** (mechanical content the entry *contains*):
`5e · statblock · encounter · spell · class · lifepath · gm-note`

> **One term, one facet.** `magic-item` was in both Type and System. It is a *noun* — what the entry is about — so it belongs in Type only. The test for a System tag: does it describe game mechanics the entry **contains**? `statblock`, `spell`, `encounter` and `5e` pass; `magic-item` does not. Keeping a term in two facets is how a controlled vocabulary starts drifting.

> **Keep type out of categories:** Don't make "Races" or "Gods" both a category AND rely on it as a tag redundantly. **Category = the pillar it lives under; type-tag = what kind of entry it is.** A god lives under the *Gods* pillar (category) and carries the *deity* type-tag. Clean separation prevents the classic wiki mess.

### The spoiler / knowledge-tier problem

Critical, because your setting has buried secrets (what astralite truly is, Edan's plan). A public wiki can **spoil your own campaigns and products.** Handle it structurally:

- **Public wiki =** the surface + middle layers only (the wonder, the visible world). Never the depth-layer secrets.
- **Player-safe by default.** Write wiki articles at the "common knowledge" tier your DM doc already defines.
- **DM-only material** (the secrets, Edan, the true nature of astralite) stays OUT of the public wiki — it lives in your private bible and in products sold to GMs, possibly behind a "GM content" gate later.

---

## 4 · The Resource Library (for GMs)

Where GMs get help running games. This is your **practical-first** promise made real, and it's a major SEO + value driver (GMs search for exactly these things). Organize by **what the GM is trying to do.**

| Section | URL | Holds |
|---|---|---|
| Maps | `/resources/maps` | Battlemaps, region maps, VTT-ready files. Often free lead products. |
| Adventures & Modules | `/resources/adventures` | One-shots, encounters, full modules. Your Rung 3+ products live here or link out. |
| Tools & Generators | `/resources/tools` | Interactive generators (NPC, name, astralite-find, encounter). Your dev skills shine here. |
| Guides | `/resources/guides` | How-to-run guides: running Primvok, seafaring, intrigue, nobility campaigns. |
| Templates & Handouts | `/resources/templates` | Character sheets, session templates, player handouts, printable aids. |

> **Generators are your secret weapon:** You're a developer. Interactive tools (an astralite-shard generator, a Primvok word-builder, an NPC generator seeded with Starfall flavor) are **cheap for you and rare for competitors**. They pull search traffic, delight GMs, and show off the world. Prioritize a few once the basics ship.

Resource tagging mirrors the wiki's *system tags* (5e, encounter, map, statblock, class, spell, etc.) plus *subject tags* (astralite, sea, primvok) so a GM can filter "all sea encounters" or "all astralite maps."

---

## 5 · Dispatches (Blog)

The content engine — the byproduct of making products, per your plan. One index, filterable by a small set of **post categories**:

- **Design Notes** — "how I built this map/adventure" (ties to product launches).
- **Worldbuilding** — lore essays, the thinking behind the setting (feeds wiki interest).
- **GM Advice** — running intrigue, seafaring, Primvok; general craft (pulls search traffic).
- **Studio** — build-in-public, retrospectives, "what sold" posts.

Blog posts can share the wiki's *subject/system tags* so a "primvok" tag surfaces the lore article, the guide, AND the design-notes post together. Cross-linking the three areas is where the site becomes greater than its parts.

---

## 6 · URL Structure & Full Tree

Clean, readable, hierarchical URLs (good for humans and SEO). The full site tree:

```
starfall.pyrelightpress.com/
├─ /                      (home)
├─ /world                 (world landing — marketing→wiki hinge)
├─ /products
│   └─ /products/[slug]
├─ /wiki
│   ├─ /wiki/astralite
│   ├─ /wiki/gods
│   ├─ /wiki/sea
│   ├─ /wiki/peoples
│   ├─ /wiki/magic
│   ├─ /wiki/realms
│   ├─ /wiki/history
│   └─ /wiki/[article-slug]
├─ /resources
│   ├─ /resources/maps
│   ├─ /resources/adventures
│   ├─ /resources/tools
│   ├─ /resources/guides
│   └─ /resources/templates
├─ /dispatches            (blog index, paginated at /dispatches/page/N)
│   └─ /dispatches/[post-slug]
├─ /about
├─ /search
└─ footer: /legal  /privacy  /content-license
```

> **Tag & category pages:** Pillars are listing pages at `/wiki/<pillar>`. Tags get a **single global namespace** at `/tags/<tag>`, not one per area — a tag page aggregates wiki entries, resources, AND dispatches together, which is the whole point of shared tags. `/wiki/tag/...` and `/resources/tag/...` would each show only a third of the answer.

---

## 7 · Don't Build It All at Once

The full architecture above is the **target**, not the launch. An empty wiki signals abandonment; build in phases so every live page has real content.

| Phase | Build | Why |
|---|---|---|
| 1 (launch) | Home, `/world` (thin), `/products`, `/about`, `/dispatches`, legal pages | Sell the world + capture emails. Minimum viable marketing site. |
| 2 (first content) | `/resources/maps` + a few free maps; 3–4 dispatches | Ship product, start the content engine, prove the pipeline. |
| 3 (wiki seed) | Wiki pillars + ~10 flagship articles (Astralite, the 6 pillars, a few factions) | A small, complete-feeling wiki beats a big empty one. |
| 4 (grow) | More resources, generators, wiki articles as products ship | Each product/post adds wiki + resource entries. Compounds over time. |

> **The compounding habit:** Every time you ship a product, it spawns entries across all three areas: a **product page** (marketing), the **lore it introduces** (wiki), the **map or tool inside it** (resources), and a **design-notes post** (blog). One unit of work, four cross-linked pages. That's how a solo creator fills a big site without drowning.

---

*Three areas, one world. Marketing sells it, the wiki explores it, resources run it — tied together by shared tags. Launch thin, grow with every product.*