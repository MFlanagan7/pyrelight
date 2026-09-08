# Information architecture

**Status: open.** The wiki's structure is being decided. Routes are not built
yet, and the components they need are finished and waiting.

This file records what is settled, what is not, and the decisions that are
blocked on the answer.

---

## Open: separate categories from tags, and add tags

The current model has **one taxonomy** — the `Categories` collection — and it is
attached to only one of the four wiki collections.

| Collection | Taxonomy today |
| --- | --- |
| `wiki-articles` | `category` (single relationship) |
| `wiki-regions` | none — only manual `related` links |
| `wiki-factions` | none — only manual `related` links |
| `wiki-gods` | none — only manual `related` links |

Two problems follow from that.

### Categories and tags answer different questions

A **category** answers *"where does this live?"* — hierarchical, roughly one per
entry, and it drives URLs, breadcrumbs, and the sidebar's grouping. `Categories`
already has a `parent` field, so it is built as a tree, which suits this job.

A **tag** answers *"what is this about?"* — flat, many per entry, and it drives
search ranking, faceted filtering, and related-content.

Making one field do both is the usual way a wiki taxonomy fails: either the tree
grows so granular it stops working as navigation, or the tags stay so coarse
they cannot discriminate. **Add tags as a separate field alongside categories
rather than overloading the existing one.**

### Tags need to exist on all four collections

Whatever is decided, gods, factions, and regions need the same taxonomy as
articles. Manual `related` links are useful but do not scale: they must be
maintained in both directions, and they never surface a connection nobody
thought to draw.

### What tags buy, concretely

1. **A synonym layer.** If an article calls something "the Lantern" throughout,
   full-text search will never find it for a reader typing "Drowned Lantern".
   Only a human can assert that equivalence, and a tag is where it goes.
2. **Ranked relevance.** Postgres weighting can put a tagged entry above one
   that merely mentions the term in passing.
3. **Faceted filtering.** Narrowing is a different action from searching.
4. **Emergent relations.** Every entry tagged "the Sundering" links to every
   other, permanently, with no upkeep.

### Keep the vocabulary controlled

Free-text tags rot into `gods`, `god`, `Deities`, `deity` and quietly break
filtering. The current model already avoids this by making taxonomy a
**relationship** field, so authors pick from an existing list. Keep that
property for tags.

---

## Settled: search is server-side, full text

Full body search is a requirement, which rules out shipping an index to the
browser. It will be Postgres full-text: a GIN index answers in single-digit
milliseconds and stays fast into tens of thousands of rows, with no new vendor.

**Done already:** a `searchText` column on all four wiki collections, populated
on save by flattening the Lexical body plus the entry's own text fields and
array rows — a region's keyed locations, a god's domains. Built before the
search feature so it would not need backfilling across content written in the
meantime.

**Still to build:** the `tsvector` column and GIN index, weighting (title above
tags above summary above body), the query, and `SearchField`. Weighting depends
on whether tags exist, so it waits on the decision above.

---

## Blocked on this document

- Wiki routes and URL shapes
- `WikiSidebar` grouping — it takes groups with counts, which needs something to
  group by
- Breadcrumb trails
- Search result weighting and facets
- Which collections gain a `tags` field, and the migration that adds it
