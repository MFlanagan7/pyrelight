# Legal, licensing, and content workflow

Living document. Update it as decisions are made — do not let it go stale, because
the rules below are the kind that are cheap to follow and expensive to unwind.

Nothing here is legal advice. Before the first commercial release, have a lawyer
read the actual licence texts against the actual product.

---

## The one rule that must never be broken

> **Build the lore once. Write the crunch twice. Never mix the two licences in one
> document.**

Starfall's *setting* — places, factions, gods, history, art, names — is Pyrelight
Press's own copyright. It can appear anywhere, in any product, under any system.

Starfall's *mechanics* are derived from someone else's licensed text, and the
licences are **not interoperable**:

| System | Licence | Source |
| --- | --- | --- |
| D&D 5e (2014 rules) | CC BY 4.0 | SRD 5.1 |
| D&D 5e (2024 rules) | CC BY 4.0 | SRD 5.2 / 5.2.1 |
| Pathfinder 2e, Starfinder 2e | ORC Licence | Paizo |

**You may not carry SRD-derived mechanical text into an ORC product, or ORC-derived
text into an SRD product.** Not a stat block, not a condition definition, not a
spell description, not a turn of phrase lifted from either. Shared *lore* between
editions is fine and expected. Shared *rules text* is a licence breach.

In practice: one setting bible, then a separate mechanical layer per system,
written independently from the relevant SRD/ORC source.

### Working checklist

Before any content is written or committed:

- [ ] Is this **lore** or **crunch**? Lore is reusable everywhere; crunch is not.
- [ ] If crunch — which system, and which source document is open on the desk?
- [ ] Does the file/entry carry a `gameSystem` and `srdVersion` (or `orcLicence`) value?
- [ ] Has any text been copied from a *different* system's product? If so, rewrite from
      the correct source rather than adapting.

---

## Required notices

### Site-wide (every page footer)

Mandated verbatim by the design system:

> © 2024–2026 Pyrelight Press. Starfall and all associated names, sigils and artwork
> are trademarks of Pyrelight Press. Compatible with fifth edition; not affiliated
> with or endorsed by Wizards of the Coast.

### SRD 5.1 attribution

> This work includes material from the System Reference Document 5.1 ("SRD 5.1") by
> Wizards of the Coast LLC, available at
> https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is
> licensed under the Creative Commons Attribution 4.0 International License,
> available at https://creativecommons.org/licenses/by/4.0/legalcode.

### SRD 5.2 attribution

> This work includes material from the System Reference Document 5.2 ("SRD 5.2") by
> Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2
> is licensed under the Creative Commons Attribution 4.0 International License,
> available at https://creativecommons.org/licenses/by/4.0/legalcode.

### Placement rule

The `/legal` page carries **all** applicable notices, because the site as a whole
covers a catalogue that may draw on several.

An **individual product carries only the notices matching what it actually used**.
Attributing SRD 5.2 in a book that used none of it is misleading. This is why the
content model needs a per-product licence field — the correct notice should render
automatically rather than depend on memory.

---

## Prohibited, under every licence above

- **Trademarks.** No "Dungeons & Dragons", "D&D", the ampersand logo, "Wizards of the
  Coast", or the core rulebook titles used as branding.
- **Implied endorsement.** CC BY explicitly forbids suggesting the licensor endorses
  you. Say "compatible with fifth edition", never imply official status.
- **Published settings.** Forgotten Realms, Eberron, Ravenloft, Dragonlance,
  Greyhawk, Spelljammer, Golarion.
- **Named characters.** Drizzt, Elminster, Strahd, Mordenkainen. Note the SRD already
  strips these from spell names — use *Arcane Hand*, not *Bigby's Hand*.
- **Product Identity creatures, excluded from both SRDs.** Beholder, mind flayer /
  illithid, displacer beast, yuan-ti, githyanki, githzerai, umber hulk, carrion
  crawler, slaad, kuo-toa. Also *tanar'ri* / *baatezu* as terms — write "demon" and
  "devil".
- **Excluded from SRD 5.2 specifically.** Artificer, Aasimar.
- **Anything not in the SRD at all.** If it is in the PHB but not the SRD, it is
  off-limits regardless of licence.
- **Publisher art and trade dress.**

## Paizo specifics, for when Pathfinder/Starfinder content happens

- Paizo has moved off the OGL to the **ORC Licence** — system-neutral and
  irrevocable, covering Pathfinder 2e Remastered and Starfinder 2e.
- Using the Pathfinder or Starfinder **logo** to signal compatibility requires the
  separate **Paizo Compatibility License**, in addition to ORC.
- Paizo's Infinite platforms currently prohibit ORC-licensed mechanical content, so
  they are not a distribution route for this material.

---

## Content model requirements this imposes

Whatever CMS is chosen, these fields are not optional:

| Field | Values | Why |
| --- | --- | --- |
| `gameSystem` | `5e-2014`, `5e-2024`, `pf2e`, `sf2e`, `system-neutral` | Drives filtering and the correct notice |
| `licence` | `srd-5.1`, `srd-5.2`, `orc`, `none` | Renders the right attribution per product |
| `contentKind` | `lore`, `crunch` | Makes the build-once/crunch-twice rule visible at authoring time |

`system-neutral` + `lore` is the combination that can be reused freely. Anything
marked `crunch` is locked to its system.

---

## Open items

- [ ] Decide the primary SRD anchor (5.1 for reach, 5.2 for longevity) — see the
      per-product notice rule; both can coexist across the catalogue.
- [ ] Replace the eleven placeholder social glyphs with official brand assets
      before launch.
- [ ] Confirm trademark position on "Starfall" and "Pyrelight Press" — a search at
      minimum, registration if the names are worth defending.
- [ ] Privacy policy: decide the analytics vendor first, since it determines whether
      a cookie banner is required at all.
- [ ] Newsletter: double opt-in and an unsubscribe link are required under
      GDPR/CAN-SPAM regardless of vendor.
