import type { CollectionConfig } from "payload";
import { licensingFields, validateLicensing } from "../fields/licensing";
import { seoField } from "../fields/seo";
import { slugField } from "../fields/slug";

/**
 * Catalogue entries that link out to itch.io and DriveThruRPG. This is not
 * commerce — no cart, no checkout, no prices. Visitors are handed off to the
 * store that actually takes the money, which is what defers the VAT and Stripe
 * problem entirely.
 */
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tier", "gameSystem", "_status"],
    livePreview: { url: ({ data }) => `/shop/${data?.slug ?? ""}` },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "blurb",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences. Facts before flavour." },
    },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "gallery", type: "array", fields: [{ name: "image", type: "upload", relationTo: "media", required: true }] },
    { name: "description", type: "richText" },
    {
      name: "tier",
      type: "select",
      required: true,
      defaultValue: "premium",
      options: [
        { label: "Free", value: "free" },
        { label: "Pay what you want", value: "pwyw" },
        { label: "Premium", value: "premium" },
      ],
      admin: {
        position: "sidebar",
        description:
          "No prices on this site — they go stale during sales. The store page is the source of truth.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "storeLinks",
      type: "array",
      minRows: 1,
      admin: { description: "Where a visitor can actually buy or download this." },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              options: [
                { label: "itch.io", value: "itch" },
                { label: "DriveThruRPG", value: "drivethrurpg" },
                { label: "Other", value: "other" },
              ],
              admin: { width: "40%" },
            },
            { name: "url", type: "text", required: true, admin: { width: "60%" } },
          ],
        },
        {
          name: "affiliateUrl",
          type: "text",
          admin: {
            description:
              "Affiliate-tagged URL, used in preference to the plain one when present. Adding this later means editing every product, so set it now if you have it.",
          },
        },
      ],
    },
    ...licensingFields,
    seoField,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const result = validateLicensing(data ?? {});
        if (result !== true) throw new Error(result);
        return data;
      },
    ],
  },
};
