# Onboarding guide — PLANNED

**Status: not started.** Listed here so the outline can grow as we build, rather
than being reconstructed from memory at the end.

## When to write it

**In the gap between "content is authored" and "the domain goes live."** Not
after launch, which was the original plan and is wrong.

Three reasons that window is the right one. The procedures have stopped changing
by then, so the guide will not be obsolete on arrival. You still have slack,
which you will not once the site is public. And writing it *is* the launch
rehearsal: a procedure nobody has followed is not a procedure, and the way you
find out is by writing it down and discovering the step you cannot describe.

Two parts do not wait for that window:

- **Decisions and their reasons** are being lost continuously, right now. Every
  reversal on this project — Strapi to Payload, push to migrations, the pool
  sizing we got wrong three times — is currently recorded only in commit
  messages and code comments. Harvest them as they happen.
- **Operations** should be drafted the first time each procedure is run for real,
  while the surprises are still fresh. A runbook written from memory records the
  happy path, which is the one nobody needs help with.

## Who it is for

Anyone joining the project — a developer, a content editor, a collaborator, or
Michael in two years having forgotten why any of this is the way it is.

**Written for a layperson.** Someone who has never used a CMS should be able to
read it and understand what the site is, how content gets onto it, and why it
was built this way. Technical depth belongs in it, but never as the entry
point: every section should open with what the thing *does* before how it works.

## What it must cover

**The shape of the thing**
- What Starfall is, what Pyrelight Press is, and how the site serves both
- The three areas — marketing, wiki, resources — and why they are kept distinct
- The monorepo: what `apps/web` is, what `design-system/` is and why it is
  read-only, what lives in `docs/`

**Payload, explained from nothing**
- What a headless CMS is and why this project has one
- Why Payload rather than Strapi or WordPress — including that Strapi was
  chosen first and rejected, and why
- That it runs *inside* the Next app rather than as a second server, and what
  that buys
- Collections, globals, fields, blocks, drafts, versions — in plain terms
- Every collection we built, what it is for, and the fields that are not obvious
- How to add a page, a dispatch, a product, a wiki entry, without a developer

**Content structure and why**
- Categories versus tags, and why one field could not do both
- The seven wiki pillars, flat URLs, and why entry slugs are reserved
- The tag vocabulary: subject, type, system, and the one-term-one-facet test
- Aliases as a synonym layer, and what full-text search cannot infer

**The design system**
- Where it came from, what it dictates, and why components were ported rather
  than imported
- Tokens, and why re-skinning is a one-file change
- The interaction states the original could not express, and why that mattered

**Legal and licensing**
- SRD 5.1 versus 5.2, CC BY versus OGL, and why CC BY was chosen
- ORC and what changes for Pathfinder and Starfinder content
- Build lore once, write crunch twice — and the fields that enforce it
- Which notices are editable and which are code, and why

**Operations**
- Deploying, and what happens during a deploy
- Migrations: why push is off, and what to run after changing a collection
- The database, storage, and email: what each does and where it is configured
- What to do when something breaks, with the failures we actually hit

**Decisions and their reasons**
- A record of what was chosen, what was rejected, and why — including the
  reversals, because a decision without its reasoning gets undone by the next
  person who finds it inconvenient

## Sources to draw on

The commit history is unusually explanatory and should be mined rather than
re-derived. `docs/` already holds the site IA, the site map, legal and
licensing, and deployment. This guide is the front door to all of it, not a
replacement.
