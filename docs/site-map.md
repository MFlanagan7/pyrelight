# Site map — every route, how it is served, what fills it

The bridge between `starfall-site-ia.md` (what the site *should* be) and the
code (what it currently *is*). Use it to see what exists, what is authored, and
what to write next.

`starfall-site-ia.md` stays the strategy document. This one tracks reality
against it, and should be updated whenever a route lands.

**How routes are served**

| Mechanism | Meaning |
| --- | --- |
| **CMS Page** | A `Page` entry rendered by the `[[...slug]]` catch-all. No code needed — create the entry, compose blocks, publish. |
| **Coded route** | A hand-written route file. Needs a developer. |
| **Collection** | A coded route rendering a collection entry, one page per entry. |

---

## Marketing

| Route | Served by | Content | Status |
| --- | --- | --- | --- |
| `/` | CMS Page `home` | Hero → start-here → lore teasers → product grid → newsletter | **Live.** Published, renders a Hero. Remaining blocks unfilled. |
| `/world` | CMS Page | Atmospheric on-ramp; gateways into the wiki pillars | **Not created.** See the naming conflict below. |
| `/about` | CMS Page | Who, why, newsletter signup | **Not created.** No code needed. |
| `/products` | Coded route | Grid of published products, filtered by tier | **Live.** Zero products, so it shows an empty state. |
| `/products/[slug]` | Collection | Cover, blurb, buy links, description, gallery, licence notice | **Live.** Zero products. |

> **Naming conflict.** The IA document calls the marketing on-ramp `/world`, but
> the published page is `/what-is-starfall`. They are the same idea under two
> names. Pick one: rename the page's slug to `world`, or change the IA document
> and the nav. Leaving both means a dead nav link, because the fallback nav
> already points at `/world`.

## Dispatches

| Route | Served by | Content | Status |
| --- | --- | --- | --- |
| `/dispatches` | Coded route | Card grid, newest first, 12 per page | **Live.** Zero posts. |
| `/dispatches/page/N` | Coded route | Pages 2+; page 1 redirects to `/dispatches` | **Live.** |
| `/dispatches/[slug]` | Collection | Cover, body, date | **Live.** |

Post categories from the IA — Design Notes, Worldbuilding, GM Advice, Studio —
are not yet created as `Categories` entries.

## Legal

| Route | Served by | Content | Status |
| --- | --- | --- | --- |
| `/legal` | Coded route + CMS | Your prose, then trademark + both SRD notices from code | **Live.** Document exists, prose is placeholder. |
| `/privacy` | Coded route + CMS | Your prose, no licence notices | **Live.** Placeholder prose. |
| `/content-license` | Coded route + CMS | Fan-use terms + trademark notice | **Live.** Placeholder prose. |

Notices render from `lib/legal.ts` whether or not the prose exists — a missing
page must never mean a missing attribution.

## Wiki — Phase 3, nothing built

Entries live flat at `/wiki/<slug>`; pillar names are reserved
(`lib/wiki.ts`). Every component these need is ported and waiting.

| Route | Served by | Status |
| --- | --- | --- |
| `/wiki` | Coded route | Not built |
| `/wiki/<pillar>` × 7 | Coded route | Not built. Pillars: astralite, gods, sea, peoples, magic, realms, history |
| `/wiki/<slug>` | Collection | Not built. Four collections share this namespace |
| `/tags/<tag>` | Coded route | Not built. Global, aggregating wiki + resources + dispatches |
| `/search` | Coded route | Not built. `searchText` column exists; tsvector, index and query do not |

## Resources — Phase 2, nothing modelled

No collection exists. This is a build, not a configuration.

`/resources` and its five sections — maps, adventures, tools, guides, templates.

## System

| Route | Status |
| --- | --- |
| `/sitemap.xml` | **Live.** Pages, dispatches, products, legal. Add wiki, resources and tags as they land — it names collections explicitly. |
| `/robots.txt` | **Live.** |
| `/opengraph-image` | **Live.** Site-wide default card. |
| `/admin`, `/api/*` | **Live.** |
| 404 | **Live.** Designed. |

---

## Content inventory

| Collection | Entries |
| --- | --- |
| Pages | 2 — `home`, `what-is-starfall` |
| Legal documents | 3 — all published, prose placeholder |
| Media | 3 |
| Dispatches, Products, Categories, all wiki collections | 0 |
| Site settings | **Never saved** — the site runs on fallback navigation |

---

## Open decisions

**Tags are not built.** `Categories` currently does both jobs and is attached
only to wiki articles. The IA settles that categories and tags are different
things; the collection, the field on each collection, and the migration are
still to do. Search weighting depends on it.

**Product type.** The IA asks for products filtered by type — maps, adventures,
supplements. The model has `tier` (free / PWYW / premium), not type, so
`/products` filters by tier. Decide with the tags work whether type is a product
field, a tag, or both.

**Search implementation.** Settled as Postgres full-text. `searchText` is
populated on every wiki collection. The `tsvector` column, GIN index, weighted
query and `SearchField` remain.

---

## What to author next, in order

1. **Resolve `/world` versus `/what-is-starfall`** — it is a dead nav link today.
2. **Save Site Settings** — nav, footer columns, socials. Until then the site
   runs on fallbacks, one of which points at `/resources`, which does not exist.
3. **Create `/about`** as a Page.
4. **Fill in the home page's remaining blocks.**
5. **Write the three legal documents properly.**
6. **First product and first dispatch** — both indexes currently show empty
   states.
