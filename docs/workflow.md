# How work gets to the live site

Written to be followed, not skimmed. If you only remember one line, make it this
one: **`staging` leads `main`, always.** Nothing reaches the live site until a
real deployment of that exact commit has been seen working.

---

## There are two kinds of change, and they travel differently

This is the part people get wrong, and getting it wrong is how work gets lost.

| | What it is | How it travels |
| --- | --- | --- |
| **Content** | Pages, dispatches, products, wiki entries, settings. Anything you type into `/admin` | Straight into that environment's database. Never through git |
| **Code** | Routes, components, collection definitions, styles | Through git, via staging, then to production |

Content is **not** in your repository and is **not** in your commits. Copying a
branch around does not copy content. Each environment has its own database and
its own content, and they only meet when you deliberately copy one to the other.

---

## The three environments

| Name | Where | Database | Who can see it |
| --- | --- | --- | --- |
| **Local** | Your machine, `pnpm dev` | Staging's | You |
| **Staging** | Vercel, the `staging` branch | Its own, in `us-east-1` | Anyone logged into your Vercel account |
| **Production** | Vercel, the `main` branch | Its own, in `us-west-2` | Everyone, once a domain points at it |

Local and staging share one database on purpose. It means local work can never
damage the live site, and it means staging already holds whatever you have been
building with. Staging's content is **disposable** — never let it be the only
copy of anything.

---

## Changing code

```
work locally  →  push to staging  →  look at it  →  merge to main  →  live
```

**1. Work locally.** `pnpm dev`. You are pointed at staging's database, so
create, break and delete freely.

**2. If you changed a collection, create a migration.**

```bash
pnpm migrate:create <short-name>   # writes reviewable SQL
pnpm migrate                       # applies it to staging's database
```

Commit that migration file together with the code that needs it. They belong in
one commit because they are one change. A deploy that has the code but not the
migration fails, and the reverse silently reshapes a database for no reason.

**3. Push to `staging`.** The deploy applies any pending migrations to staging's
database, then builds.

**4. Actually look at it.** Not the build log, the site. A green build only means
it compiled. Click the thing you changed.

**5. Merge into `main` and push.** The production deploy applies the same
migrations to production's database and goes live.

Pull request branches deploy too, but deliberately **do not** migrate. They share
staging's database, and a branch still under review must not reshape it. A
preview needing a new column will fail until that migration reaches staging.
That is intended: a broken preview is cheap and visible, a silently changed
schema is neither.

---

## Changing content

Author content in the environment it belongs to.

- **Live content is written in production's `/admin`.** Not locally. There is no
  mechanism that pushes local content to production, and there should not be.
- **Staging content is for testing.** Make a mess of it.
- To give staging realistic content, copy production's database down to it. See
  "Copying content between environments" in `deployment.md`. The copy only ever
  runs in that direction.

**Drafts are your safety net.** Publish is the moment something goes live, so an
unfinished entry stays a draft. This is the content equivalent of staging.

---

## When this starts

**Now, for code.** Production is deployed and holds content you would rather not
lose, and that is the only threshold that matters.

Before this, `main` and `staging` were pushed together, which was reasonable when
nothing was live. It is not reasonable any more.

**What changes at launch is the cost, not the process.** Today a bad deploy is
embarrassing for a few minutes. Once a domain resolves and readers arrive from
itch.io, a bad deploy is public, and a schema mistake reaches real data that real
people are reading.

Practising the workflow now is the point. A procedure you have never run is not a
procedure, and launch day is a bad time to discover that.

---

## When something goes wrong

1. **Read the error, not the summary.** Every database failure on this project so
   far has reported "timeout exceeded when trying to connect", and not one of
   them was the network. The real cause was usually further down the log, past
   where it was truncated.
2. **Check which commit deployed.** Vercel's "Redeploy" rebuilds the *same*
   commit, so a fix that is not pushed is not in the build. The hash is in the
   third line of every build log.
3. **Check which database it used.** Every deploy that migrates prints
   `[build] database: <host>:<port>` with the password stripped.
4. **Runtime failures are in the runtime logs**, which are a different tab from
   the build logs. A page that loads and then errors is a runtime failure.

Production keeps serving the last successful deployment while a new one fails, so
a failed build is not an outage.
