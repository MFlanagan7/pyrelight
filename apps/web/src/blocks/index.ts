import type { Block } from "payload";

/**
 * Page section vocabulary. Each block maps to a component in
 * /design-system/components/, so composing a page in the admin produces a page
 * the design system can actually render. Do not add a block without a component
 * to render it.
 */

const eyebrow: Block["fields"][number] = {
  name: "eyebrow",
  type: "text",
  admin: {
    description:
      "Small-caps label above the heading. World nouns read best: 'Peoples of Starfall', 'The pantheon'.",
  },
};

/** Full-bleed opener. One per page, always first. */
export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    eyebrow,
    { name: "title", type: "text", required: true },
    { name: "lede", type: "textarea" },
    {
      name: "background",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "2560px+, dark overall, one light source, and a quiet centre — nothing focal where the wordmark lands.",
      },
    },
    {
      name: "actions",
      type: "array",
      maxRows: 2,
      admin: { description: "At most one primary. Gold is rationed." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "variant",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary — gold pill", value: "primary" },
            { label: "Ghost — outline", value: "ghost" },
          ],
        },
      ],
    },
  ],
};

/** Eyebrow + heading + body, optionally with a trailing link. */
export const SectionIntroBlock: Block = {
  slug: "sectionIntro",
  interfaceName: "SectionIntroBlock",
  labels: { singular: "Section intro", plural: "Section intros" },
  fields: [
    eyebrow,
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "align",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Centre", value: "center" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "actionLabel", type: "text", admin: { width: "50%" } },
        { name: "actionHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

/** Cormorant numerals over small-caps labels. Counts, never metrics. */
export const StatRowBlock: Block = {
  slug: "statRow",
  interfaceName: "StatRowBlock",
  labels: { singular: "Stat row", plural: "Stat rows" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 5,
      admin: {
        description:
          "Four reads best, never more than five. Counts only — no percentages, no review scores.",
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "n", type: "text", required: true, admin: { width: "30%" } },
            { name: "label", type: "text", required: true, admin: { width: "70%" } },
          ],
        },
      ],
    },
  ],
};

/** Grid of linked cards. Small-caps titles, because a grid reads as an index. */
export const CardGridBlock: Block = {
  slug: "cardGrid",
  interfaceName: "CardGridBlock",
  labels: { singular: "Card grid", plural: "Card grids" },
  fields: [
    eyebrow,
    { name: "title", type: "text" },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", admin: { description: "One or two sentences." } },
        { name: "href", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};

/** Pulls from the Products collection rather than duplicating product copy. */
export const ProductGridBlock: Block = {
  slug: "productGrid",
  interfaceName: "ProductGridBlock",
  labels: { singular: "Product grid", plural: "Product grids" },
  fields: [
    eyebrow,
    { name: "title", type: "text" },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      admin: {
        description:
          "Free and premium sit in the same grid — the shop never hides the free tier.",
      },
    },
  ],
};

/** Playtester quote. Attribution names a role, never a person. */
export const QuoteBlock: Block = {
  slug: "quote",
  interfaceName: "QuoteBlock",
  labels: { singular: "Quote", plural: "Quotes" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    {
      name: "attribution",
      type: "text",
      admin: { description: "A role, not a person: 'Playtest GM · six sessions in'." },
    },
  ],
};

/** Long-form prose on a lifted surface, 72ch measure. */
export const ReadingPanelBlock: Block = {
  slug: "readingPanel",
  interfaceName: "ReadingPanelBlock",
  labels: { singular: "Reading panel", plural: "Reading panels" },
  fields: [
    { name: "meta", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "body", type: "richText" },
  ],
};

/** Aside for rules notes, warnings, and GM guidance. */
export const CalloutBlock: Block = {
  slug: "callout",
  interfaceName: "CalloutBlock",
  labels: { singular: "Callout", plural: "Callouts" },
  fields: [
    {
      name: "tone",
      type: "select",
      defaultValue: "note",
      options: [
        { label: "Note", value: "note" },
        { label: "Warning", value: "warning" },
        { label: "Table consequence", value: "table" },
      ],
    },
    { name: "title", type: "text" },
    { name: "body", type: "richText", required: true },
  ],
};

export const FaqBlock: Block = {
  slug: "faq",
  interfaceName: "FaqBlock",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "title", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "richText", required: true },
      ],
    },
  ],
};

export const GalleryBlock: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  labels: { singular: "Gallery", plural: "Galleries" },
  fields: [
    eyebrow,
    { name: "title", type: "text" },
    {
      name: "images",
      type: "array",
      minRows: 1,
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "caption", type: "text" },
      ],
    },
  ],
};

/** The "start here" wayfinding strip — three routes into the setting. */
export const StartHereBlock: Block = {
  slug: "startHere",
  interfaceName: "StartHereBlock",
  labels: { singular: "Start here strip", plural: "Start here strips" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "body", type: "text" },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

export const NewsletterBlock: Block = {
  slug: "newsletter",
  interfaceName: "NewsletterBlock",
  labels: { singular: "Newsletter form", plural: "Newsletter forms" },
  fields: [
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "confirmation",
      type: "text",
      defaultValue: "The map is on its way.",
      admin: { description: "In-world microcopy where it costs nothing." },
    },
  ],
};

/** Everything a Page may be composed from. */
export const pageBlocks = [
  HeroBlock,
  SectionIntroBlock,
  StatRowBlock,
  CardGridBlock,
  ProductGridBlock,
  StartHereBlock,
  ReadingPanelBlock,
  QuoteBlock,
  CalloutBlock,
  FaqBlock,
  GalleryBlock,
  NewsletterBlock,
];

/** Blocks that also make sense inside a long-form wiki article. */
export const articleBlocks = [
  ReadingPanelBlock,
  QuoteBlock,
  CalloutBlock,
  GalleryBlock,
  StatRowBlock,
];
