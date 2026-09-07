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
| `DATABASE_URI` | Supabase **transaction** pooler, port **6543** | Not the session pooler used locally — see below |
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
pool of N becomes N × concurrent invocations. `payload.config.ts` already drops
`max` to 1 when `process.env.VERCEL` is set, but the connection string has to
match: the **transaction** pooler (6543) is built for many brief clients, while
the **session** pooler (5432) caps a tenant at 15 and is right for one
long-lived dev process.

Getting this backwards exhausts the database under mild traffic rather than
failing loudly at deploy time.

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
