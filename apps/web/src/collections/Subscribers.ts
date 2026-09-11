import type { CollectionConfig } from "payload";

/**
 * Newsletter list.
 *
 * `confirmed` defaults to false and nothing sets it true yet — double opt-in is
 * required under GDPR and is not built. Do not send a broadcast to this list
 * until confirmation is wired up; see docs/legal-and-licensing.md.
 */
export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "confirmed", "createdAt"],
    group: "Settings",
  },
  access: {
    // Written only through the server action, never read publicly.
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    {
      name: "confirmed",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Set only by a confirmed double opt-in. Not yet implemented." },
    },
    { name: "source", type: "text", admin: { description: "Which page or resource the address came from." } },
    {
      name: "consentedAt",
      type: "date",
      admin: {
        readOnly: true,
        description:
          "When marketing consent was given, if it was. An address captured to deliver a download has NOT consented to email — that tick is separate and optional, because making subscription a condition of the download is bundled consent and not defensible under GDPR.",
      },
    },
    {
      name: "reason",
      type: "select",
      defaultValue: "newsletter",
      options: [
        { label: "Newsletter signup", value: "newsletter" },
        { label: "Download — delivery only", value: "download" },
      ],
      admin: {
        readOnly: true,
        description:
          "Why this address is on file. A download-only address must not receive a broadcast unless consentedAt is set.",
      },
    },
  ],
};
