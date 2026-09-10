import type { GlobalConfig } from "payload";
import { SOCIAL_PATHS } from "../assets/social-paths";
import { revalidateSiteSettings } from "../hooks/revalidate";

/** Display names for the glyph keys; anything unlisted falls back to the key. */
const SOCIAL_LABELS: Record<string, string> = {
  bluesky: "Bluesky",
  discord: "Discord",
  youtube: "YouTube",
  itch: "itch.io",
  drivethru: "DriveThruRPG",
  patreon: "Patreon",
  kofi: "Ko-fi",
  instagram: "Instagram",
  facebook: "Facebook",
  reddit: "Reddit",
  tiktok: "TikTok",
};

/**
 * Site chrome an editor should be able to change without a deploy: navigation,
 * footer, social links.
 *
 * The legal notices are deliberately NOT editable here. They are mandated
 * verbatim by licence terms and live in docs/legal-and-licensing.md — a typo in
 * an attribution string is a licence breach, not a copy tweak.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Settings" },
  access: { read: () => true },
  // Nav and footer appear on every page, so a change here purges the whole site.
  hooks: revalidateSiteSettings(),
  fields: [
    {
      name: "nav",
      type: "array",
      label: "Primary navigation",
      maxRows: 6,
      admin: { description: "Six items is the practical ceiling before the nav wraps." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
            { name: "href", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "footerColumns",
      type: "array",
      label: "Footer columns",
      maxRows: 4,
      admin: { description: "Sitemap columns. Four is the practical ceiling before they wrap." },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          minRows: 1,
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", type: "text", required: true, admin: { width: "50%" } },
                { name: "href", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "footerNote",
      type: "textarea",
      admin: {
        description:
          "Optional line above the legal block. The copyright and licence notices are fixed and render automatically.",
      },
    },
    {
      name: "social",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              /**
               * Derived from the glyphs that actually exist. Hand-listing these
               * had already drifted: "mastodon" and "rss" had no glyph and would
               * have rendered nothing, and "drivethrurpg" did not match the
               * "drivethru" key.
               */
              options: Object.keys(SOCIAL_PATHS).map((key) => ({
                label: SOCIAL_LABELS[key] ?? key,
                value: key,
              })),
              admin: { width: "40%" },
            },
            { name: "url", type: "text", required: true, admin: { width: "60%" } },
          ],
        },
      ],
    },
    {
      name: "newsletter",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: true },
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};
