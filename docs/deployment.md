# Deployment

Frontend and CMS deploy together to Vercel as one Next.js app. There is no
second server: Payload's admin and API are routes inside `apps/web`.

## Branches and environments

| Branch | Vercel environment | Database | Badge |
| --- | --- | --- | --- |
| `main` | Production | Production | None |
| `staging` | Preview, with its own domain | **Its own** | Gold strip |
| anything else | Preview | Whatever that environment points at | Teal strip |

Work lands on `staging`, gets tested on a real deployment, and is merged to
`main` to go live.

**Staging needs its own `DATABASE_URI`.** Scope it to the staging environment in
Vercel. Staging runs migrations — it has to, or it cannot prove a release before
it goes live — so if it shares production's database, a staging deploy reshapes
production. That is the exact failure this arrangement exists to prevent.

Pull-request previews deliberately do not migrate. A branch still under review
must not reshape a shared schema. A preview needing a new column therefore fails
until that migration reaches staging: a visible, cheap failure, where a silently
mutated schema is neither.

Every deploy that migrates prints its database host to the build log, with
credentials stripped. It is the one line that answers "which database did this
deploy just change?" — check it after the first staging deploy.

## The environment badge

Local, staging and preview builds carry a thin coloured strip down the left edge
showing environment, branch and commit. Production has none, and anything
unrecognised is treated as production — failing closed, so a misconfigured build
cannot brand the live site.

Values are inlined at build time by `next.config.ts`: `VERCEL_GIT_*` exists only
on the build machine, and a serverless runtime cannot shell out to git. Locally
it reads git directly, and a missing git is not an error.

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
6. Production Branch: `main`.
7. Add a second domain — `staging.starfall.pyrelightpress.com` — assigned to the
   `staging` branch, so staging has a stable URL rather than a per-deploy one.
8. Scope the variables listed under "Which variables differ" separately for
   Production and Preview. The rest are shared.

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

`DATABASE_POOL_MAX` is available as an override but should normally be left
unset — see "Why the transaction pooler in production" below.

Several of these take different values on staging. See "Which variables differ".

## Why the transaction pooler in production

Each serverless invocation is its own process with its own connection pool, so a
pool of N becomes N × concurrent invocations. The **transaction** pooler (6543)
is built for exactly that: many short-lived clients.

Pool size is set by role rather than environment, and the distinction matters:

| Context | `max` | Why |
| --- | --- | --- |
| Serverless runtime | 1 | Many processes, one connection each |
| Production build | 5 | One process prerendering many pages *concurrently* |
| `payload migrate` | 5 | Holds a transaction and queries beside it |
| Local dev | 5 | One long-lived process |

Only the serverless runtime wants one connection. **Every other context needs
more than one, and a pool of one deadlocks against itself**: it cannot hold a
transaction and run a query at the same time, so it waits out
`connectionTimeoutMillis` and fails with "timeout exceeded when trying to
connect". That reads like a network fault and is pure self-contention.

Both known cases have now bitten this project. A build's prerender workers queue
on one shared pool, and the migration runner holds a client for its transaction
while querying the migrations table. The second broke every production deploy
until 2026-09-11, behind a preflight showing the network perfectly healthy.

So the test is `VERCEL && NEXT_RUNTIME` — "am I inside the Next server runtime" —
rather than `VERCEL` alone, which a CLI task run in the build container also sees.
`scripts/vercel-build.mjs` additionally sets `DATABASE_POOL_MAX` for the migrate
step, so a deploy never depends on that inference being right. Setting
`DATABASE_POOL_MAX` by hand overrides all of it, which is also how to reproduce
the failure:

```bash
DATABASE_POOL_MAX=1 pnpm migrate   # times out in 15s
DATABASE_POOL_MAX=5 pnpm migrate   # done
```

**Use the transaction pooler locally as well.** The session pooler (5432) caps a
tenant at 15 clients, which a build's workers plus a running dev server plus any
connections leaked by killed processes will exceed. Transaction mode handles
migrations, transactions, and session parameters correctly — verified against
this project.

## Migrations

`scripts/vercel-build.mjs` runs `pnpm migrate` before building, on **production
and on the `staging` branch**, and nowhere else.

Staging has to migrate, or it cannot do the one job it exists for: proving a
release, schema changes included, before it goes live.

Pull-request previews deliberately skip migrations. They share staging's
database, so migrating from a preview would apply a feature branch's schema to
the database staging is meanwhile trying to validate — before the code using it
had been reviewed.

The consequence: a preview whose code needs a new column fails until that
migration reaches staging. That is the intended trade. A broken preview is
visible and cheap; a silently mutated shared schema is neither.

Workflow after changing any collection:

```bash
pnpm migrate:create <name>   # generates reviewable SQL
pnpm migrate                 # applies locally
git add apps/web/src/migrations && git commit
```

## Two Supabase projects, three environments

Supabase's free plan allows **two active projects**, so there are two, not three:

| Uses | Supabase project | Migrations run |
| --- | --- | --- |
| Production (`main`) | `pyrelight-production` | Yes, on deploy |
| Staging, PR previews, **and local dev** | `pyrelight-staging` | Yes, on `staging` deploys only |

Local development shares staging rather than production. That is the point: it
ends the earlier arrangement where authoring locally wrote straight to the live
database, and it means staging holds realistic content without a separate seed.

The cost is that staging's data is not sacred. Anyone may reset it. Never treat
staging as the only copy of anything, and never point `DATABASE_URI` at
production from a developer machine.

### Setting up the staging project

1. Supabase dashboard → **New project**, named `pyrelight-staging`, same region
   as production so latency and the S3 endpoint shape match.
2. Copy the **transaction pooler** string (port **6543**) from Connect. Not the
   session pooler.
3. Storage → create two buckets, matching production exactly:
   `pyrelight-media` (**public**) and `pyrelight-downloads` (**private**).
4. Storage → S3 access keys → create one. It is shown once.
5. Project Settings → Database → SSL → download the CA certificate if you are
   setting `DATABASE_CA_CERT`. It is per-project, so production's does not apply.
6. Set the Vercel variables below for **Preview**.
7. Push `staging`. The build migrates the empty database into a full schema.
8. Visit `staging.…/admin` and create the first user. A fresh database has none,
   and Payload offers the create-first-user screen only while that is true.
9. Point your local `.env` at the same staging project, so development stops
   touching production.

### Which variables differ

Vercel scopes variables to Production, Preview and Development. Staging is a
Preview deployment, so a Preview-scoped value covers staging *and* every PR
preview — which is what we want, since they share one database.

| Variable | Scope | Why |
| --- | --- | --- |
| `DATABASE_URI` | **Separate** | The whole point. Staging migrates; sharing means staging reshapes production |
| `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | **Separate** | Keys are per-project. Shared ones would leave staging rows pointing at production files |
| `PAYLOAD_SECRET` | **Separate** | A leaked staging secret must not forge a production admin session |
| `NEXT_PUBLIC_SITE_URL` | **Separate** | So staging tests its own email and download links rather than sending testers to the live site |
| `DATABASE_CA_CERT` | **Separate** | Per-project certificate |
| `S3_BUCKET`, `S3_DOWNLOADS_BUCKET`, `S3_PUBLIC_BUCKET` | Shared | Same names, different projects |
| `RESEND_API_KEY`, `EMAIL_FROM_*` | Shared | One verified sending domain |

Because `NEXT_PUBLIC_SITE_URL` differs, staging's canonical tags point at
staging rather than production. Search engines never see them: non-production
builds serve `Disallow: /` and an `X-Robots-Tag: noindex` header, so a staging
domain cannot compete with the live site or expose unpublished drafts.

## After the first deploy

- [ ] `/admin` loads and you can sign in
- [ ] `/` renders the home page's blocks
- [ ] An image in a block loads from `<ref>.supabase.co`, not `/api/media/file/`
- [ ] `/sitemap.xml` and `/robots.txt` return absolute production URLs, not localhost
- [ ] A social card previews correctly (paste a link into Slack or Discord)
- [ ] Trigger a password reset and confirm the mail arrives
