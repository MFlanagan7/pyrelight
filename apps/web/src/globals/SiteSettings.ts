import type { GlobalConfig } from "payload";

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
              options: [
                { label: "Bluesky", value: "bluesky" },
                { label: "Mastodon", value: "mastodon" },
                { label: "Discord", value: "discord" },
                { label: "YouTube", value: "youtube" },
                { label: "itch.io", value: "itch" },
                { label: "DriveThruRPG", value: "drivethrurpg" },
                { label: "RSS", value: "rss" },
              ],
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
