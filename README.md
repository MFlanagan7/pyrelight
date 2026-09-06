# Pyrelight Press — web

Monorepo for Pyrelight Press's sites. Currently one app: **Starfall**, a
fifth-edition compatible fantasy setting, shipping to
`starfall.pyrelightpress.com`.

> **Repo name.** This folder is still `starfall-pub`. Pyrelight is the parent
> brand and Starfall is a subdomain of it, so the repo should be renamed to
> `pyrelight`. There is no git remote yet, so it is a folder rename and nothing
> more — do it before pushing anywhere.

## Layout

```
pyrelight/
├─ apps/
│  ├─ web/              Starfall — Next.js 16, App Router, TypeScript, CSS Modules
│  └─ pyrelight/        parent studio site — not yet created
├─ design-system/       read-only export from Claude Design. Never edited here.
├─ docs/
│  └─ legal-and-licensing.md    licence obligations + content workflow rules
└─ pnpm-workspace.yaml
```

Inside `apps/web`:

```
src/
├─ app/                 file-based routes (App Router)
├─ components/
│  └─ core/             ported design system primitives (TSX + *.module.css)
├─ lib/                 data access
└─ styles/
   ├─ tokens/           copied verbatim from /design-system/tokens/
   └─ reset.css
```

## Decisions

**Routing** is Next's file-based App Router. No React Router.

**Styling** is CSS Modules over the design system's token files. Zero styling
dependencies.

The design system ships components styled with inline `style={}` objects, which
cannot express `:hover`, `:focus-visible`, `@media`, or `prefers-reduced-motion`
— all four of which the system itself mandates. Components are therefore
**ported** to CSS Modules rather than imported. `design-system/` stays a
read-only reference so it can be replaced wholesale when regenerated.

**Fonts** load through `next/font` (self-hosted, preloaded) rather than the
design system's Google Fonts `@import`. `globals.css` points the `--sf-font-*`
tokens at the generated variables.

**Dark-only.** "Never a light section" is policy; `color-scheme: dark` is set.

**CMS is Payload**, running inside the Next app rather than as a second server.
Strapi was rejected: there is no pricing tier short of an enterprise contract
where Strapi version upgrades stop being manual work, and it required a second
server to maintain. Payload is MIT-licensed with no per-seat ceiling, and
upgrades are a dependency bump in a repo that already deploys.

**Supabase provides Postgres and Storage, not auth.** Nothing on the site logs
in until the shop ships, and Payload brings its own editor auth. The Supabase
auth wiring was removed rather than left as dead code implying a decision that
had not been made. Revisit Supabase Auth / Auth0 / Clerk alongside Stripe.

**Both sites share this monorepo** so a single Payload instance can serve both —
impossible across two repos. Their design systems are deliberately different, so
they share little UI.

## v1 scope

Home · What is Starfall · Dispatches index · Dispatches post · Legal · Privacy ·
Content licence.

Deferred: the wiki cluster (v2), shop and cart (pending VAT, tax, and Stripe
decisions), tools, gallery, timeline, VTT assets.

The blog is **Dispatches**. The design system's voice guide still calls it
"field notes" — update it there when convenient.

## Before launch

- Replace the eleven placeholder social glyphs with official brand assets.
- No logo exists yet; the wordmark is set in Cormorant Garamond.
- See the open items in `docs/legal-and-licensing.md`.

## Getting started

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # then fill it in
pnpm dev                                        # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint over `apps/web` |
