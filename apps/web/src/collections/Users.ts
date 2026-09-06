import type { CollectionConfig } from "payload";

/** Editors. Payload owns editor auth — the public site has no accounts yet. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", defaultColumns: ["name", "email", "role"] },
  access: {
    // Only admins may create or delete accounts; editors may edit themselves.
    create: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // An editor must not be able to promote themselves.
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
