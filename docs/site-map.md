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
| `/world` | CMS Page | Atmospheric on-ramp; gateways into the wiki pillars | **Live.** Renamed from `what-is-starfall`. Still titled "What is Starfall?" — retitle if you want "The World". |
| `/about` | CMS Page | Who, why, newsletter signup | **Not created.** No code needed. |
| `/products` | Coded route | Grid of published products, filtered by tier | **Live.** Zero products, so it shows an empty state. |
| `/products/[slug]` | Collection | Cover, blurb, buy links, description, gallery, licence notice | **Live.** Zero products. |

> Resolved: the page's slug moved from `what-is-starfall` to `world`, so the IA
> and the nav now agree. `/what-is-starfall` no longer exists.

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

## Wiki

Entries live flat at `/wiki/<slug>`; pillar names are reserved (`lib/wiki.ts`),
so one dynamic segment serves both without ambiguity.

| Route | Served by | Status |
| --- | --- | --- |
| `/wiki` | Coded route | **Live.** Seven pillar cards with entry counts, in declared order |
| `/wiki/<pillar>` × 7 | Coded route | **Live.** Lists every entry in that pillar, across all four collections |
| `/wiki/<slug>` | Collection | **Live.** Zero entries. Type-aware info rail, contents list, tags, related |
| `/tags` | Coded route | **Live.** Vocabulary index, grouped by subject / type / system |
| `/tags/<tag>` | Coded route | **Live.** Aggregates every content area including the wiki |
| `/search` | Coded route | Not built. `searchText` is populated; tsvector, index and query are not |

**Pillars are not one-to-one with collections.** "Peoples & Powers" spans
factions and articles; "The Gods" spans gods and articles about divine
politics. Every wiki collection therefore carries a pillar field, and the
picker is filtered to categories marked as wiki pillars so a dispatch category
cannot be assigned by mistake.

**Spoiler handling.** An entry marked `spoiler` renders its whole body behind a
reveal, rather than relying on an author remembering to wrap it. Its contents
list is suppressed too — a list of concealed headings gives away what the
reveal protects.

## Resources

One `Resources` collection covers all five sections including tools, so
everything is tagged, searched and sitemapped by the same machinery. What
differs is **delivery**, not kind.

| Route | Served by | Status |
| --- | --- | --- |
| `/resources` | Coded route | **Live.** Section cards with counts |
| `/resources/<section>` | Coded route | **Live.** Five sections; an unknown one 404s |
| `/resources/<section>/<slug>` | Collection | **Live.** Zero entries |

**Delivery modes**

| Mode | What happens |
| --- | --- |
| `file` | Hosted in the private bucket, delivered by a signed link that expires in ten minutes. Optionally gated behind an email. |
| `link` | Points at itch.io or elsewhere. |
| `tool` | Renders a generator registered in `lib/tools.ts`. None built yet — a key with no component says so rather than rendering a blank panel. |

**The email gate and consent.** An address given to receive a file has consented
to that file, not to marketing. Newsletter signup is a separate, unticked
checkbox; only a tick sets `consentedAt` and marks the record as a newsletter
signup. Making the download conditional on subscribing would be bundled consent,
which GDPR does not permit — and a list built that way gets marked as spam,
damaging the sending domain. The rule is enforced in the server action, not the
form, because the form is a suggestion and the action is what writes.

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
| Pages | 2 — `home`, `world` |
| Categories | 11 — seven wiki pillars, four dispatch categories (seeded) |
| Tags | 0 — added as the writing demands them |
| Legal documents | 3 — all published, prose placeholder |
| Media | 3 |
| Dispatches, Products, all wiki collections | 0 |
| Resources, Downloads | 0 |
| Site settings | Saved — navigation now comes from the CMS |

---

## Open decisions

**Product type — resolved as a tag.** Maps, adventures and supplements are Type
tags, not a new product field. Using the shared vocabulary means one tag page
can show the map product, the region article it covers, and the dispatch about
making it. `tier` stays a product field: free versus premium is a different
axis from what a thing is.

**Search implementation.** Settled as Postgres full-text. `searchText` is
populated on every wiki collection. The `tsvector` column, GIN index, weighted
query and `SearchField` remain.

---

## What to author next, in order

Nothing here needs a developer. All of it is admin work.

1. **Save Site Settings.** Nav, footer columns, social links, and the newsletter
   heading and body. Until this is saved the site runs on a fallback nav of four
   items; the footer has no columns, no socials, and no signup form, because the
   signup only renders when the newsletter setting is enabled.
2. **Create `/about`** as a Page.
3. **Fill in the home page's remaining blocks.** It publishes a Hero and nothing
   else. Twelve block types are available.
4. **Write the three legal documents properly.** All three are published with
   placeholder prose. The licence notices already render from code.
5. **Retitle `/world`** if "What is Starfall?" is not the heading you want.
6. **First product and first dispatch.** Both indexes show empty states.
7. **Replace the eleven placeholder social glyphs** before launch —
   `apps/web/src/assets/social-paths.ts`.

Completed: the `/world` slug rename.
