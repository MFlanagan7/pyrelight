# Starfall

Public site for **Starfall**, a fantasy RPG setting for D&D 5e. Built in public,
with free and premium content hosted on itch.io and DriveThruRPG.

## Layout

```
starfall-pub/
├─ apps/
│  ├─ web/           Next.js 16 (App Router, TypeScript, CSS Modules)
│  └─ cms/           Strapi 5 — not yet scaffolded, needs Supabase credentials
├─ pnpm-workspace.yaml
└─ package.json      workspace root; scripts proxy into apps/*
```

Inside `apps/web`:

```
src/
├─ app/              file-based routes (App Router). Co-locate *.module.css here.
├─ components/       shared UI
├─ lib/              data access — Strapi client, Supabase client
└─ styles/
   ├─ tokens.css     design tokens — the single file the design system replaces
   └─ reset.css      minimal reset
```

## Architecture decisions

- **Routing** is Next's built-in file-based App Router. No React Router — it
  would fight the framework rather than add anything.
- **Styling** is CSS Modules plus a global token sheet. Zero styling
  dependencies. Every component reads `var(--*)` from `src/styles/tokens.css`,
  so re-skinning is a one-file change.
- **Supabase Auth owns user identity.** Strapi's Users & Permissions plugin is
  not used for public accounts; the Strapi admin login is for editors only.
- **Strapi owns its own Postgres schema.** It connects with an owner-level role
  and therefore bypasses Supabase RLS. Anything the browser reads directly from
  Supabase must live in separate, RLS-protected tables. Do not let both systems
  write the same rows.
- **Strapi connects via Supabase's session pooler or a direct connection**, not
  the transaction pooler on 6543 — that mode breaks Knex prepared statements.
- **Uploads** go to Supabase Storage through its S3-compatible endpoint using
  the official `@strapi/provider-upload-aws-s3`, rather than a community
  Supabase provider.

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
| `pnpm build` | Production build of the site |
| `pnpm lint` | ESLint over `apps/web` |
| `pnpm cms` | Strapi dev server (once `apps/cms` exists) |
