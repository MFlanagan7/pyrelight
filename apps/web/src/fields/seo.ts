import type { Field } from "payload";

/**
 * Per-entry SEO overrides. All optional — when blank, the page falls back to the
 * entry's own title and excerpt, which is right most of the time.
 */
export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: { position: "sidebar" },
  fields: [
    {
      name: "title",
      type: "text",
      admin: { description: "Overrides the browser tab and search result title." },
    },
    {
      name: "description",
      type: "textarea",
      maxLength: 160,
      admin: { description: "Search result snippet. Around 155 characters reads best." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Social share card. 1200×630 or larger." },
    },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Hide from search engines." },
    },
  ],
};
