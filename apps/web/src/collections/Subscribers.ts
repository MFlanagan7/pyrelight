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
    { name: "source", type: "text", admin: { description: "Which page the signup came from." } },
  ],
};
