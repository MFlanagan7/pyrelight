import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../fields/licensing";
import { searchTextField } from "../fields/searchText";
import { seoField } from "../fields/seo";
import { slugField } from "../fields/slug";
import { tagsField } from "../fields/tags";
import { revalidateCollection, revalidateTagPages } from "../hooks/revalidate";
import { TOOL_KEYS, isToolKey } from "../lib/tools";

/**
 * The GM resource library: maps, adventures, guides, templates and tools.
 *
 * One collection for all five sections, including tools, so everything is
 * tagged, searched, sitemapped and listed by the same machinery. A generator
 * built as a bespoke page outside the CMS would be invisible to all of it.
 *
 * What differs between them is DELIVERY, not kind:
 *
 *   file  — we host it; gated behind an email if `requireEmail` is set
 *   link  — it lives elsewhere, usually itch.io
 *   tool  — an interactive generator; the page renders a registered component
 *
 * So a tool entry still carries a title, summary, tags and SEO written in the
 * admin; only its interactive part is code.
 */
export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "section", "delivery", "_status"],
    group: "Content",
    livePreview: {
      url: ({ data }) => `/resources/${data?.section ?? ""}/${data?.slug ?? ""}`,
    },
  },
  access: { read: () => true },
  versions: { drafts: true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const result = validateLicensing(data ?? {});
        if (result !== true) throw new Error(result);
        return data;
      },
    ],
    afterChange: [
      ...revalidateCollection("/resources").afterChange,
      ...revalidateTagPages().afterChange,
    ],
    afterDelete: [
      ...revalidateCollection("/resources").afterDelete,
      ...revalidateTagPages().afterDelete,
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "section",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Maps", value: "maps" },
        { label: "Adventures", value: "adventures" },
        { label: "Tools & generators", value: "tools" },
        { label: "Guides", value: "guides" },
        { label: "Templates & handouts", value: "templates" },
      ],
      admin: {
        position: "sidebar",
        description: "Which library section this belongs to. Also its URL segment.",
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences. Shown in listings and search." },
    },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "body", type: "richText" },

    {
      name: "delivery",
      type: "select",
      required: true,
      defaultValue: "file",
      options: [
        { label: "Hosted file — we deliver it", value: "file" },
        { label: "External link — it lives elsewhere", value: "link" },
        { label: "Tool — an interactive generator", value: "tool" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "file",
      type: "upload",
      relationTo: "downloads",
      admin: {
        condition: (data) => data?.delivery === "file",
        description: "Stored privately. Delivered by a signed link that expires.",
      },
    },
    {
      name: "requireEmail",
      type: "checkbox",
      defaultValue: false,
      admin: {
        condition: (data) => data?.delivery === "file",
        description:
          "Ask for an email before delivering. Newsletter signup stays a separate, optional tick on that form — making subscription a condition of download is bundled consent, which GDPR does not allow.",
      },
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (data) => data?.delivery === "link",
        description: "Where it actually lives — an itch.io page, say.",
      },
    },
    {
      name: "toolKey",
      type: "text",
      /**
       * Text with validation rather than a select: the registry can legitimately
       * be empty, and a select with no options renders as an unusable dropdown
       * with nothing to explain why.
       */
      validate: (value: string | null | undefined, { data }: { data?: { delivery?: string } }) => {
        if (data?.delivery !== "tool") return true;
        if (!value) return "A tool entry needs a key naming the generator it renders.";
        if (!isToolKey(value)) {
          return TOOL_KEYS.length === 0
            ? "No generators are registered yet. Build one and add its key to lib/tools.ts first."
            : `Unknown tool. Registered keys: ${TOOL_KEYS.join(", ")}.`;
        }
        return true;
      },
      admin: {
        condition: (data) => data?.delivery === "tool",
        description:
          "Which generator this page renders. Must match a key in lib/tools.ts — a tool cannot be published before it is built.",
      },
    },

    tagsField(),
    searchTextField({ text: ["title", "summary"], rich: ["body"] }),
    ...licensingFields,
    seoField,
  ],
};
