# Deployment

Frontend and CMS deploy together to Vercel as one Next.js app. There is no
second server: Payload's admin and API are routes inside `apps/web`.

## Vercel project setup

1. Import the repository.
2. **Root Directory: `apps/web`.** Vercel detects the pnpm workspace and installs
   from the repo root automatically.
3. Framework preset: Next.js. Leave the build command empty — Vercel runs the
   `vercel-build` script in preference to `build`, which is
   `scripts/vercel-build.mjs`.
4. Add the environment variables below.
5. Add the domain `starfall.pyrelightpress.com`, then add the CNAME Vercel gives
   you to `pyrelightpress.com`'s DNS.

## Environment variables

| Variable | Production value | Notes |
| --- | --- | --- |
| `DATABASE_URI` | Supabase **transaction** pooler, port **6543** | Use it locally too — see below |
| `PAYLOAD_SECRET` | 32+ random bytes | Changing it invalidates every admin session |
| `NEXT_PUBLIC_SITE_URL` | `https://starfall.pyrelightpress.com` | Inlined at build time; changing it needs a redeploy |
| `RESEND_API_KEY` | from Resend | Without it, password resets go to a log nobody reads |
| `EMAIL_FROM_ADDRESS` | `noreply@mail.pyrelightpress.com` | Must be on the verified sending domain |
| `EMAIL_FROM_NAME` | `Pyrelight Press` | |
| `S3_ENDPOINT` | `https://<ref>.storage.supabase.co/storage/v1/s3` | |
| `S3_REGION` | matches the Supabase project | |
| `S3_BUCKET` | `pyrelight-media` | |
| `S3_PUBLIC_BUCKET` | `true` | Serves media from Supabase's CDN rather than a function |
| `S3_ACCESS_KEY_ID` | from Supabase Storage | |
| `S3_SECRET_ACCESS_KEY` | from Supabase Storage | Secret — Vercel only, never committed |

Anything prefixed `NEXT_PUBLIC_` is compiled into the browser bundle. Never put a
secret behind that prefix.

## Why the transaction pooler in production

Each serverless invocation is its own process with its own connection pool, so a
pool of N becomes N × concurrent invocations. The **transaction** pooler (6543)
is built for exactly that: many short-lived clients.

Pool size is set by role rather than environment, and the distinction matters:

| Context | `max` | Why |
| --- | --- | --- |
| Serverless runtime | 1 | Many processes, one connection each |
| Production build | 5 | One process prerendering many pages *concurrently* |
| Local dev | 5 | One long-lived process |

A build is the opposite of serverless. Each prerender worker renders pages in
parallel within one process, and they all queue on the pool — set `max` to 1
there and the queue exceeds `connectionTimeoutMillis`, failing with "timeout
exceeded when trying to connect". That reads like a network fault but is pure
self-contention. Vercel sets `VERCEL` during its build too, so the build-phase
check has to be evaluated first.

**Use the transaction pooler locally as well.** The session pooler (5432) caps a
tenant at 15 clients, which a build's workers plus a running dev server plus any
connections leaked by killed processes will exceed. Transaction mode handles
migrations, transactions, and session parameters correctly — verified against
this project.

## Migrations

`scripts/vercel-build.mjs` runs `pnpm migrate` before building, **only when
`VERCEL_ENV=production`**.

Previews deliberately skip migrations. They share `DATABASE_URI` with production
unless a separate database is configured, so migrating from a preview would
apply a feature branch's schema to the live database the moment a pull request
opened — before the code using it shipped.

The consequence: a preview whose code needs a new column fails until that
migration reaches production. That is the intended trade. A broken preview is
visible and cheap; a silently mutated production schema is neither.

Workflow after changing any collection:

```bash
pnpm migrate:create <name>   # generates reviewable SQL
pnpm migrate                 # applies locally
git add apps/web/src/migrations && git commit
```

## Known gap: dev and production share one database

There is a single Supabase project, so local development writes to the same
database the deployed site reads. Fine while nothing is live — it is how the
current content got authored — but before real traffic, create a second Supabase
project for production and point Vercel at it.

Until that split exists, treat local content edits as edits to the live site,
and do not run destructive scripts against `DATABASE_URI` casually.

## After the first deploy

- [ ] `/admin` loads and you can sign in
- [ ] `/` renders the home page's blocks
- [ ] An image in a block loads from `<ref>.supabase.co`, not `/api/media/file/`
- [ ] `/sitemap.xml` and `/robots.txt` return absolute production URLs, not localhost
- [ ] A social card previews correctly (paste a link into Slack or Discord)
- [ ] Trigger a password reset and confirm the mail arrives
