# Roadmap — where we are, what is next, how work reaches production

Companion to `site-map.md`, which tracks routes, and `deployment.md`, which
covers the infrastructure. This one answers "what should I do next, and why that
first".

---

## Where we are

**The engineering has run ahead of the content, deliberately.** The IA document
argues for building in four phases so no live page is empty. We built all four
phases of *code* and almost none of the *content*, so every route in the site map
exists and works, and most of them render an empty state.

That is not a mistake, but it does mean the phase table in `starfall-site-ia.md`
no longer describes a build order. It now describes an **authoring** order, and
it is still the right one.

| | State |
| --- | --- |
| Routes and rendering | Built. Marketing, dispatches, products, legal, wiki, tags, search, resources, downloads |
| Search | Built. Postgres full-text, GIN-indexed, verified by `EXPLAIN` |
| Email gate | Built, with consent separated from delivery |
| Production | Deployed and healthy, on a `.vercel.app` address, no custom domain yet |
| Staging | Deployed and healthy, own database, admin user created, no content |
| Content | Two pages, eleven categories, three placeholder legal documents. Everything else is zero |
| Ecommerce, accounts | Not started, deliberately deferred |

---

## Next up, in order

### Infrastructure, before anything else

1. **Set the Vercel function region to `pdx1`.** Production's database is in
   Oregon and its functions run in Virginia, so every query crosses the country
   and Payload issues several per request. Staging's database is in Virginia, so
   staging is currently *faster* than production and therefore hides latency
   problems rather than finding them. Needs a redeploy to take effect.

2. **Repoint the local `.env` at staging.** Authoring locally still writes to
   the live database. Until this changes, every local experiment edits the real
   site. See `deployment.md` for the connection string shape.

3. **Give staging a `home` Page and saved Site Settings.** Staging 404s at `/`
   because the root maps to a Page with slug `home` and there isn't one. It does
   not need real content, only enough to exercise the layout.

### Before the domain goes live

4. **Write the three legal documents properly.** All three are published with
   placeholder prose. The licence notices render from code regardless, but
   placeholder terms on a public site are worse than none.

5. **Save Site Settings in production.** Until then the site runs on a fallback
   navigation of four items, with no footer columns, no social links, and no
   signup form.

6. **Fill the home page.** It publishes a Hero and nothing else, out of twelve
   available block types.

7. **Create `/about`**, and retitle `/world` if "What is Starfall?" is not the
   heading you want.

8. **Replace the eleven placeholder social glyphs** in
   `apps/web/src/assets/social-paths.ts`.

9. **Extend the sitemap** to include wiki entries, resources and tags. It names
   collections explicitly, so new ones do not appear on their own.

10. **Point `starfall.pyrelightpress.com` at production**, and set
    `NEXT_PUBLIC_SITE_URL` to match.

### After launch

11. **First product and first dispatch.** Both indexes show empty states today.
12. **The onboarding guide**, written so a non-developer joining the project can
    follow it.

---

## How work reaches production

**See `workflow.md`.** It is a reference rather than a plan, so it lives on its
own and does not change when this list does.

The short version: code goes local, then `staging`, then `main`, and `staging`
leads `main` always. Content never travels through git at all, and is authored in
whichever environment it belongs to. It applies from now, because production is
deployed and holds content worth keeping.

---

## Deferred, with reasons

| Thing | Why it is waiting |
| --- | --- |
| Ecommerce, Stripe | Selling through itch.io and DriveThruRPG first. Revisit when the catalogue justifies the compliance work |
| Visitor accounts | Nothing on the public site logs in until the shop ships. Payload already provides editor auth |
| DM / Player spoiler tiers | Needs accounts. The per-entry spoiler reveal covers the immediate need |
| Pathfinder, Starfinder content | The `gameSystem` field already models it, so the schema is ready when the content is |
| Generators and tools | The `tool` delivery mode exists and the registry is empty. A key with no component says so rather than rendering a blank panel |
