# Starfall site — UI kit

`index.html` is a static, token-driven recreation of the Starfall home page: fixed nav, scrimmed
hero, entry strip, wiki grid, sea band, shop grid, newsletter and footer. Every value resolves from
`styles.css`, so editing a token changes the kit.

**The living source of truth** is `Starfall Home v3.dc.html` at the root of the parent project —
it carries the interactive behaviour this static kit omits: nav solidify-on-scroll, the three hero
treatments (still image / looping video / parallax stars), star twinkle, scroll cue, and the
drag-and-drop image slots.

## Screens in this kit
| File | Page |
| --- | --- |
| `index.html` | Home — hero, entry strip, wiki grid, sea band, shop grid, newsletter, footer. |
| `what-is-starfall.html` | The premise long-form: reading column, sticky contents rail, sea band, FAQ. |
| `start-playing.html` | Quickstart path: four-step strip, free download cards, session-one guide with checklist, what-to-read-next covers, GM FAQ. |
| `press-kit.html` | Boilerplate blocks, wordmark colourways, asset download rows, art grid, fact-sheet rail, press contact. |
| `newsletter.html` | Signup-only landing for paid traffic. Minimal chrome — wordmark only, no nav or footer — with an inline success state. |

Marketing pages share one nav and one footer, repeated inline per file so each screen opens
standalone. FAQ blocks are native `<details>` in these static screens; the React equivalent is
`FaqAccordion`.

## Screens still to build
Wiki (home, category index, article, region, faction, god, search) and shop (index, product,
free downloads, handoff, confirmation) are going to `templates/` rather than here, per the agreed
split. Still unassigned: adventures index and detail, tools, gallery, artwork detail, field notes
index and post, the five legal policies, and the community group.

## Known gaps
No logo exists, so the press kit sets the wordmark as type in both colourways and says so on the
page. Artwork credits read `[ARTIST]` pending real attribution.

## Image slots in this kit
The diagonal hatch fill marks where art goes. Ratios: hero wide/full-bleed, wiki + region cards
16:9, sea 16:10, atlas 4:3, product covers 2:3, race portraits 3:4, house sigils 1:1.
