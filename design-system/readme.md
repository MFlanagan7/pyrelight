# Starfall — Design System

Starfall is a 5e-compatible fantasy setting published by **Pyrelight Press**. This system covers the
**world site** (starfall.com): a dark, atmospheric marketing site *and* a growing reference wiki,
selling free and premium PDFs and print books.

The studio that publishes it has its own, deliberately different system — see
`pyrelight-design-system/` in the same parent project. The two share the token *foundation*
(the same three typefaces, the same 1.25 scale, the same brand hexes) and diverge in ground,
density and personality.

## Sources

- **Web Design System.docx** and **Pyrelight Brand Guide.docx** (user-supplied, August 2024) —
  extracted to `uploads/Web_Design_System.md` and `uploads/Pyrelight_Brand_Guide.md` in the parent
  project. These decided the fonts, the 1.25 type scale, and the colour hexes; everything here
  either comes from them or was designed on top of them across four review rounds.
- **Reference sites named by the client**: LegendKeeper (primary), World Anvil (secondary), Kanka
  for Starfall; Morvold Press, Darrington Press, MCDM for the studio. The LegendKeeper direction is
  what produced the layered scrims, ambient hue zones and gradient hairlines here.
- **Live design source**: `Starfall Home v3.dc.html` in the parent project.

No logo files were supplied. The wordmark is set in type (Cormorant Garamond, essence gold,
`.08em` tracking) and the marks in `assets/marks.js` are geometric primitives built from the brand
guide's written motif description — an eight-point falling star and, for the studio, an altar pyre.
**No logo was drawn or reconstructed.** If a real mark exists, drop it into `assets/` and replace
the path data.

---

## Content fundamentals

**Voice: a designer talking to a GM, in world when it can be.** Plain, concrete, slightly dry.
Never breathless.

- **Person.** The site speaks as "we" for the studio and "I" in field notes — the press is a
  business, the blog is a person. Readers are "you", and "you" are assumed to be running a game
  on Thursday.
- **Casing.** Sentence case for headings and body. UPPERCASE only through Alegreya Sans SC, and
  always letterspaced: eyebrows, nav, buttons, meta, badges. No Title Case Headlines.
- **Length.** Section headings under nine words. Card bodies one or two sentences. Body paragraphs
  three to four sentences, then break.
- **Facts before flavour.** Every world claim carries a table consequence: "Divinity comes down as
  light and lands as currency. Whoever gathers it decides what the next age worships." Not
  "a world of wonder and mystery".
- **Numbers are counts, never metrics.** 4 regions, 12 noble houses, 60+ keyed locations, 3
  stranded gods. No percentages, no "10,000 happy GMs", no fake review scores.
- **Prices are plain.** "Hardcover + PDF · $24 · itch". Middot separators, never pipes. Free
  products sit in the same grid as paid ones with a green Free badge — the shop never hides the
  free tier.
- **Testimonials name a role, not a person.** "Playtest GM · six sessions in".
- **In-world microcopy where it costs nothing.** Newsletter confirmation reads "The map is on its
  way." Section eyebrows use world nouns: "Peoples of Starfall", "The pantheon", "Play tonight".
- **No emoji, anywhere.** No exclamation marks. No "Let's dive in", no "Unlock", no "Discover".
- **Legal copy is always present and always dry.** The 5e disclaimer is verbatim on every page:
  *"© 2024–2026 Pyrelight Press. Starfall and all associated names, sigils and artwork are
  trademarks of Pyrelight Press. Compatible with fifth edition; not affiliated with or endorsed by
  Wizards of the Coast."*

---

## Visual foundations

### The idea
A dark room with one gold light source. Navy carries everything; gold appears where the divine
does — the wordmark, one CTA, hairlines, numerals. Violet and teal are *ambient*: you feel them at
the edges of sections, you don't see them as blocks of colour.

### Colour
- **One ground family: navy.** `#0A0917` → `#1B1934`. Sections differ by ambient glow, not by
  swapping background colours. The single exception is the sea band (`#0B1A22`), which earns a
  different ground because it is a different element.
- **Gold `#EBCB6E` is the accent and it is rationed** — wordmark, one primary button per viewport,
  eyebrow labels, statistic numerals, hairline dividers, premium badges. If gold appears more than
  about six times in a viewport it stops meaning anything.
- **Never a light section.** Parchment (`#F5F0E4`) is in the tokens for print and PDF only. A light
  band inside a dark site reads as a rendering fault — this was tested and rejected in review.
- **Ink is a six-step ramp**, all of it at or above 4.5:1 on `#0D0C1B`. Lilac `#A29CC4` is a
  *label* colour, never body copy. Legal-weight ink `#7C7599` is only for the copyright line.
- **Gradients are hairlines and atmospheres, never fills.** A card border may be a gradient at 1px.
  A background may be a radial glow at 20–50% opacity. Nothing is ever a diagonal two-colour wash.

### Type
Three families, no substitutes: **Cormorant Garamond** (display — H1, section headings, card
titles, quotes, numerals, always weight 400), **Alegreya Sans SC** (nav, buttons, eyebrows, small-
caps card titles, meta, badges — always uppercase, always letterspaced .10–.24em), **Spectral**
(all running copy).

Scale is 1.25 on 16px, eight steps, nothing between them. Line height 1.05 for H1, 1.15 for
headings, 1.65 for body, 1.75 in the reading panel. Measure 72ch for long-form, 52ch for body,
46ch inside cards. Smallest on-screen size is 12.8px and only for letterspaced uppercase.

The tell of this system: **a grid of cards uses small-caps sans titles** (so it reads as an index),
while **a single feature or product uses a Cormorant title** (so it reads as a book).

### Backgrounds and imagery
Photography-free by policy; the identity is carried by type, glow, and the falling-star motif.
Where art appears it is **commissioned environment art, full-bleed or in a gradient frame** — never
stock, never people smiling at a camera.

The hero scrim is a fixed four-layer stack, in order: top scrim for nav legibility → bottom fade
that resolves exactly into the page background → edge vignette → a small gold radial sized to sit
*behind the wordmark only*. Art requirements: 2560px+ wide, dark overall value, one light source,
atmospheric haze, cool blues and violets, and a **quiet centre** — nothing focal where the wordmark
lands. Cards get a bottom-up scrim so the title never floats on detail.

Placeholder wells use a diagonal gold hatch at 6–7% so an empty layout still reads as intentional.

### Depth, borders, radii
Shadows are black and generous (`0 18px 40px rgba(0,0,0,.5)` for cards, `0 28px 70px /.55` for
floating panels) — never coloured, never soft-glow drop shadows. Glow is gold, additive, and only
on the wordmark, the primary button, and card hover. Borders are 1px lilac at 12–28% alpha; hover
warms them to gold at 45%. Radii: pills (999px) for every action, 12px for cards, 14px for panels,
10px for covers, 4–6px for thumbs. Nothing is square-cornered; nothing is more rounded than a pill.

### Interaction
Hover: cards lift 4px (covers 6px) and warm their border; buttons intensify glow; nav links go
gold. Press: `translateY(1px)`, nothing else. Focus: 2px gold ring, 3px offset — never removed.
Durations: .12s press, .25s hover, .3s lift, .35s nav chrome, all on `cubic-bezier(.4,0,.2,1)`.

### Motion
Two ambient loops only — star twinkle (4–11s, randomised per star) and the hero scroll cue (2.6s).
Parallax multipliers are .12 (far stars) and .3 (near stars) against `scrollY`. Everything is
disabled under `prefers-reduced-motion`. Nothing else on a Starfall page moves on its own.

### Layout
1180px container, 6rem section padding (5.5rem for list-style sections), `repeat(auto-fit,
minmax(…, 1fr))` grids so the page reflows without breakpoints. The nav is the only fixed element.
Blur is used exactly twice: the nav (16px + 140% saturate) and pills that sit over art (6px).
Transparency is otherwise reserved for scrims and hairlines.

---

## Iconography

- **Two brand marks, both in `assets/marks.js`**: the eight-point falling star (world) and the
  altar pyre (studio). The star's trail — a gradient stroke ending in a bright point — is the
  repeatable motif; use it once per page at most.
- **UI glyphs are drawn inline as single-path SVGs at a 24×24 viewBox**, `currentColor`, stroke
  width 1.5 where stroked. There is no icon font. There is no third-party icon set in use; if one
  is ever needed, Lucide at 1.5px stroke is the closest match to the existing chevron and would be
  the right substitution to flag.
- **Social glyphs live in `assets/social-paths.js` and are SIMPLIFIED STAND-INS.** They are
  deliberately generic geometry so nothing misrepresents a platform's real mark at 16px.
  **Replace all eleven with each platform's official brand asset before launch.**
- **No emoji, ever.** No unicode dingbats as icons. The only unicode used as ornament is the middot
  (·) in meta lines and the right arrow (→) on quiet links.
- **Sigils and heraldry are art, not icons** — flat single-colour marks on transparent PNG, dropped
  into 1:1 tiles no smaller than 5rem.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/fonts.css` | Google Fonts import; swap for self-hosted `@font-face` at launch. |
| `tokens/colors.css` | Navy grounds, accents, ink ramp, status, hairlines, semantic aliases. |
| `tokens/typography.css` | Families, 1.25 scale, line heights, tracking, measures. |
| `tokens/spacing.css` | Spacing scale, section rhythm, container, grid minimums. |
| `tokens/radii.css` | Pill / panel / card / frame / cover / thumb / chip. |
| `tokens/elevation.css` | Shadows, gold glows, gradient hairlines, scrim stack, ambient zones. |
| `tokens/motion.css` | Durations, easing, lifts, keyframes, reduced-motion reset. |
| `tokens/base.css` | Body reset, link colours, focus ring. |
| `guidelines/*.html` | 19 specimen cards (Colors, Type, Spacing, Brand). |
| `assets/marks.js` | Falling star, star trail, pyre, scroll cue path data. |
| `assets/social-paths.js` | Placeholder social glyphs — replace before launch. |
| `ui_kits/starfall-web/` | Home page recreation + notes on remaining screens. |
| `templates/` | Seven wiki page templates consuming projects can seed from. See "Templates" below. |
| `ui_kits/starfall-web/` | Static site recreations: home, what is Starfall, start playing, press kit, newsletter landing. See its README for the screen table. |
| `thumbnail.html` | Homepage tile — wordmark in type on the page navy, accent swatch strip. |
| `SKILL.md` | Agent Skills manifest for use in Claude Code. |

### Components

**`components/core/`** — Button (primary gold pill / ghost / quiet), Pill, Badge (free / premium),
SectionHeading, ImageFrame, StatRow, QuoteBlock, ReadingPanel.

**`components/site/`** — SiteNav, SiteFooter, ContentCard, ProductCard, ListRow + ListGroup,
StartHereStrip, NewsletterForm, SocialLinks.

**`components/navigation/`** — Breadcrumbs, Pagination, SearchField, Tabs, TableOfContents,
WikiSidebar.

**`components/content/`** — Callout, InfoBox, StatBlock, Accordion, FaqAccordion, SpoilerBlock,
DataTable, EmptyState.

**`components/commerce/`** — CartButton, CartDrawer + CartLineItem.

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (when to use it, one example, the
rules that matter). Directory cards: `core.card.html`, `site.card.html`,
`navigation.card.html`, `content.card.html`, `spoilers-faq.card.html`, `commerce.card.html`.

### Templates

Starting folders under `templates/`, each a Design Component that loads this system through a
sibling `ds-base.js`. Consuming projects copy the folder and edit one file.

| Folder | Template | Notes |
| --- | --- | --- |
| `wiki-home/` | Wiki home | Search-led landing, six category cards, recently updated, depth stats. |
| `wiki-category/` | Wiki category index | One template, six live instances — switch with the `category` tweak (regions, races, gods, sea, houses, essence). Sort tabs and pager. |
| `wiki-article/` | Wiki article | The workhorse: rail, trail, reading panel, fact box, sticky contents, related rows. |
| `wiki-region/` | Wiki region page | Article plus a 21:9 map, settlement list and tide-drift table. |
| `wiki-faction/` | Wiki faction page | Article plus sigil, holdings table, rivals list and a `SpoilerBlock` for GM material. |
| `wiki-god/` | Wiki god page | Article on the sea ground, with favour/cost table and worship sites. |
| `wiki-search/` | Wiki search results | Live filter tabs, result rows and pager; empties to `EmptyState` when the query clears. |
| `shop-index/` | Shop index | Free/Premium/All filter tabs, product grid, working `CartDrawer`, newsletter band. |
| `shop-product/` | Shop product detail | Cover, format radio group driving the buy label, sample pages, contents and specs tables, `FaqAccordion`. |
| `shop-free/` | Free downloads | Filterable download list, no signup required, upsell row and optional email capture. |
| `shop-handoff/` | Basket & storefront handoff | Replaces on-site checkout: removable basket rows, live total, storefront comparison table, and prose explaining why payment leaves the site. |
| `shop-confirmation/` | Order confirmation & delivery | Immediate PDF download rows, print shipping tracker, GM next-steps callout and order summary. |
| `adventures-index/` | Adventures index | Nine adventures, level-band filter tabs, the published-arc ladder; empties to `EmptyState` on level 11+. |
| `adventure-detail/` | Adventure detail | Player-safe hooks above, four `SpoilerBlock` sections below, plus a reveal-all switch that drives them together. |
| `tools-index/` | Tools & generators index | The four generators as gradient-border cards, plus their printable equivalents. |
| `tool-page/` | Tool page | One template, four working generators — switch with the `tool` tweak. The ledger computes value per port; house, sea and name tools roll live. |
| `field-notes-index/` | Field notes index | Featured post, six topic filters, reading-time meta, newsletter and most-read rails. |
| `field-notes-post/` | Field notes post | Long-form studio writing: pull quote, rules table, a `SpoilerBlock` for arc spoilers, prev/next footer. |
| `gallery/` | Art gallery | Subject tabs plus an artist chip row, mixed-ratio tiles, artist credit on every tile, `EmptyState` with a clear-filters action. |
| `artwork-detail/` | Artwork detail | Full attribution: artist block with bio slot, commission brief, copyable credit line, appearance list and licence terms. |
| `content-licence/` | Content licence | What fans may do with the world, as yes / yes-with-conditions / no. Carries the credit line to copy and the ownership split. |
| `legal-policy/` | Legal policy | Privacy, terms of sale, cookies and accessibility from one template — switch with the `policy` tweak. Ships with a draft banner to delete. |
| `community-hub/` | Community hub | Entry strip to chat/forum/LFG, four-rule conduct summary, community creations shelf with the unofficial disclaimer. |
| `timeline/` | History timeline | Five eras of the fall and after. Era buttons plus arrow-key navigation, and the full chronology repeated as a static list below. |
| `vtt-assets/` | VTT assets | Platform tabs (Foundry, Roll20, plain images), download rows and the grid/scale specification table. |
| `character-options/` | Character options index | Backgrounds, subclasses and feats with type filters, source column and free marking; plus the two session-zero questions. |
| `errata/` | Errata & changelog | Corrections grouped by product and printing, each a table of where/what/fix, with reporting and credit policy. |

All twenty-seven repeat the nav inline and use inline styles only, per Design Component rules.
Layout reflows below 1180 px and 860–1080 px via one media-query block per template.

`timeline/` is the only template with a bespoke interaction. It is built keyboard-first — real
`<button>` elements, `aria-current` on the selected era, `aria-live` on the detail panel, arrow-key
navigation, and prev/next buttons that genuinely disable at the ends. The complete chronology is
also rendered as a static list below the interactive view, so nothing is reachable only by pointer.
Note that `legal-policy/`'s accessibility draft lists a keyboard-hostile timeline as a known gap —
that placeholder text is now wrong and should be replaced when the real audit happens.

**The four policies are unreviewed drafts.** `legal-policy/` renders a red draft banner at the top
of every policy saying so, and the data, refund and liability sections carry inline `[CONFIRM: …]`
notes naming what a lawyer needs to check. Delete the banner only once the wording has actually
been reviewed. The accessibility policy's "what is still wrong" list is a plausible example, not an
audit result — replace it with real findings rather than publishing untested claims.

`content-licence/` is different: it is a policy decision rather than legal boilerplate, so it is
written as finished prose. The stance it takes (commercial fan material allowed, no royalty, no
revenue threshold, art and files excluded, AI training refused) is a proposal — confirm it is the
studio's actual position.

**Artist credits are placeholders on purpose.** `gallery/` and `artwork-detail/` render
`[ARTIST 1–4]` and a bracketed bio slot rather than invented names — a fabricated attribution is
worse than a visibly empty one. Replace them with what each artist supplies, and ask the artist to
write their own bio rather than paraphrasing a portfolio.

Two templates carry an enum tweak instead of duplicate folders: `wiki-category` (six categories)
and `tool-page` (four generators). Both have real content behind every option.

**Commerce is a handoff, not a checkout.** Payment completes on itch.io or DriveThruRPG, so
`shop-handoff/` stands in for cart and checkout both, and no template collects card details. The
`CartButton` and `CartDrawer` primitives are still used — the basket is built on-site and rebuilt
on the storefront.

### Intentional additions

No component library was supplied, so the inventory was derived from the approved v3 pages plus the
screens the site still needs (wiki index and article, shop, cart, gallery). Entries with no
counterpart on the approved home page, and why they exist:

- **ImageFrame** — wraps the gradient-border-plus-scrim treatment that appears at five ratios.
- **ListGroup** — the hairline-divider wrapper that would otherwise be copy-pasted.
- **Navigation set** — the wiki cannot ship without a rail, a trail, a pager, search and in-article
  contents; `Tabs` covers the shop's free/premium filter.
- **StatBlock, InfoBox, Callout, DataTable** — a wiki that hosts 5e content needs a stat block, a
  fact box, GM-only asides and random tables. These are the components most likely to be filled by
  a content editor rather than a designer, so their prompt files carry the grammar rules.
- **Commerce set** — free and premium products share one checkout flow, so a cart is required.
- **EmptyState** — search and filtered grids will hit zero results.
- **SpoilerBlock** — wiki articles and adventure pages are read by players and GMs at the same URL,
  so GM-facing material has to be gated rather than merely labelled. Closed by default; the `note`
  prop lets a reader judge whether the spoiler is safe before opening it. `Callout tone="gm"`
  remains the right choice when the text is already visible and only needs marking.
- **FaqAccordion** — `Accordion` is controlled and single-open, which suits a linked table of
  contents but makes every FAQ block carry state. This wrapper holds its own state and lets rows
  open independently so two answers can be compared side by side.

Deliberately NOT built, to keep the surface honest: Toast, Avatar, Modal (other than CartDrawer),
Stepper, Rating, and a login/account system. Ask if the build needs them.
