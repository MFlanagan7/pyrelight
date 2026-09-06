import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    // Sizes match the design system's frames: cards, covers, and full-bleed art.
    imageSizes: [
      { name: "thumb", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "cover", width: 1200, position: "centre" },
      { name: "hero", width: 2560, position: "centre" },
    ],
    focalPoint: true,
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe what the image shows. Decorative art still needs alt text — say what it depicts.",
      },
    },
    { name: "credit", type: "text", admin: { description: "Artist attribution, where commissioned." } },
  ],
};
