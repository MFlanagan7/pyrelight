import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Dispatches } from "./collections/Dispatches";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";
import { WikiArticles } from "./collections/wiki/Articles";
import { WikiFactions } from "./collections/wiki/Factions";
import { WikiGods } from "./collections/wiki/Gods";
import { WikiRegions } from "./collections/wiki/Regions";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: "· Pyrelight Press",
    },
  },

  collections: [
    // v1
    Pages,
    Dispatches,
    Products,
    Categories,
    Media,
    Users,
    // v2 — the wiki cluster
    WikiArticles,
    WikiRegions,
    WikiFactions,
    WikiGods,
  ],

  globals: [SiteSettings],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    // Keep Payload's ~30 tables out of `public`. Supabase auto-exposes `public`
    // through PostgREST, so putting CMS tables there would publish the entire
    // content model — drafts and all — on the project's REST API.
    schemaName: "payload",
  }),

  sharp,

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // Blocks are referenced by several collections; naming them here keeps a
  // single generated interface per block instead of one per usage.
  telemetry: false,
});
