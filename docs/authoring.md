# Authoring — where to start and how to proceed

Companion to `workflow.md`, which covers code. This one covers words and
pictures. `site-map.md` tracks what exists; `roadmap.md` tracks what is next.

---

## The one rule

**Live content is written in production's `/admin`.** Not locally.

Local and staging share a database which is a *copy* of production. Anything you
write there is invisible to the live site, and the next sync deletes it. There is
no mechanism that pushes local content up, and there should not be — content is
not in git and does not travel with a deploy.

Use local and staging to test how content *renders*, never to write the real
thing.

---

## Order of work

Work outward from what other things depend on. Each step here unblocks the next.

| # | Do | Why here |
| --- | --- | --- |
| 1 | **Upload images to Media** | Blocks reference media. Hunting for an upload mid-compose breaks your flow |
| 2 | **Create the core tag vocabulary** | Tags connect the three areas. Retrofitting consistency across finished entries is miserable. Categories are already seeded |
| 3 | **Write `/about`** | Small, self-contained, settles your voice before anything longer |
| 4 | **Fill the home page** | Needs images to place and `/about` to link to. Currently publishes a Hero and nothing else, of twelve block types |
| 5 | **Retitle and flesh out `/world`** | The on-ramp into the wiki |
| 6 | **The three legal documents, in one sitting** | A different mode of writing; batch it. The licence notices already render from code, so you write only the prose around them |
| 7 | **Site Settings last** | Navigation, footer, socials, newsletter. Last, so the nav points at pages that exist rather than accumulating broken links |

Then the content engine itself: first dispatch, then a wiki seed of roughly ten
flagship entries, then the first map. That is phases 2 and 3 of
`starfall-site-ia.md`, which remains the right sequence.

---

## What to expect

**Publishing updates the live site by itself.** Payload's `afterChange` hooks
purge the affected paths, so no redeploy is needed. This works because Payload
runs inside the Next app. The one thing that bypasses it is the sync script,
which writes to Postgres directly — that is why it tells you to redeploy.

**Draft is the safety net.** Publish is the moment a thing goes live. Content has
no staging environment and does not need one: drafts *are* the staging step, and
they live in production alongside what they will become.

**Three fields on wiki entries deserve thought:**

- **Pillar** decides where the entry is listed. Not the same axis as tags
- **Spoiler** hides the entire body behind a reveal, and suppresses the contents
  list, since a list of concealed headings gives away what the reveal protects
- **Licence** drives the attribution notice. This is a legal obligation, not a
  preference — see `legal-and-licensing.md`

**Search indexes itself.** Nothing to run after publishing.

**Categories and tags are different things** and one field could not do both. A
category is structural and exclusive: which pillar an entry belongs to. A tag is
cross-cutting vocabulary: what the entry is *about*, what kind of thing it is,
which system it targets. One term, one facet.

---

## Content and code together

Most authoring needs no code. When it does — a new block type, a new field —
the two have to move in step, and the order is not obvious.

**Sync production down to staging BEFORE writing a migration**, not after. A
migration that works against an empty staging database can still fail against
production's data. This project has already seen one: a rename that would have
died on a published row. Local shares staging's database, so a recent sync means
you develop against realistic content and discover that locally, which is the
cheapest place to discover anything.

**Know what staging does and does not prove for migrations.** Running
`pnpm migrate` locally applies it to staging's database, so by the time you push,
the staging deploy has nothing left to apply. Staging therefore proves the *code*
works against the migrated schema. It does not rehearse the migration itself —
production is the first deploy-time run. That is acceptable because the SQL is
reviewable and already ran once against an identical Postgres with production-like
data, but it is worth knowing rather than assuming.

**A new field is empty on every existing row.** Design for that. Render something
sensible when it is absent, because every piece of content that already exists
will have it absent.
