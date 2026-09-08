import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."wiki_articles" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_wiki_articles_v" ADD COLUMN "version_search_text" varchar;
  ALTER TABLE "payload"."wiki_regions" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_wiki_regions_v" ADD COLUMN "version_search_text" varchar;
  ALTER TABLE "payload"."wiki_factions" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_wiki_factions_v" ADD COLUMN "version_search_text" varchar;
  ALTER TABLE "payload"."wiki_gods" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_wiki_gods_v" ADD COLUMN "version_search_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."wiki_articles" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_wiki_articles_v" DROP COLUMN "version_search_text";
  ALTER TABLE "payload"."wiki_regions" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_wiki_regions_v" DROP COLUMN "version_search_text";
  ALTER TABLE "payload"."wiki_factions" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_wiki_factions_v" DROP COLUMN "version_search_text";
  ALTER TABLE "payload"."wiki_gods" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_wiki_gods_v" DROP COLUMN "version_search_text";`)
}
