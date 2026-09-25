import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "payload"."resources_slug_idx";
  ALTER TABLE "payload"."products" ADD COLUMN "released_at" timestamp(3) with time zone;
  ALTER TABLE "payload"."_products_v" ADD COLUMN "version_released_at" timestamp(3) with time zone;
  ALTER TABLE "payload"."wiki_regions" ADD COLUMN "spoiler" boolean DEFAULT false;
  ALTER TABLE "payload"."_wiki_regions_v" ADD COLUMN "version_spoiler" boolean DEFAULT false;
  ALTER TABLE "payload"."wiki_factions" ADD COLUMN "spoiler" boolean DEFAULT false;
  ALTER TABLE "payload"."_wiki_factions_v" ADD COLUMN "version_spoiler" boolean DEFAULT false;
  ALTER TABLE "payload"."wiki_gods" ADD COLUMN "spoiler" boolean DEFAULT false;
  ALTER TABLE "payload"."_wiki_gods_v" ADD COLUMN "version_spoiler" boolean DEFAULT false;
  CREATE INDEX "resources_slug_idx" ON "payload"."resources" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "payload"."resources_slug_idx";
  CREATE UNIQUE INDEX "resources_slug_idx" ON "payload"."resources" USING btree ("slug");
  ALTER TABLE "payload"."products" DROP COLUMN "released_at";
  ALTER TABLE "payload"."_products_v" DROP COLUMN "version_released_at";
  ALTER TABLE "payload"."wiki_regions" DROP COLUMN "spoiler";
  ALTER TABLE "payload"."_wiki_regions_v" DROP COLUMN "version_spoiler";
  ALTER TABLE "payload"."wiki_factions" DROP COLUMN "spoiler";
  ALTER TABLE "payload"."_wiki_factions_v" DROP COLUMN "version_spoiler";
  ALTER TABLE "payload"."wiki_gods" DROP COLUMN "spoiler";
  ALTER TABLE "payload"."_wiki_gods_v" DROP COLUMN "version_spoiler";`)
}
