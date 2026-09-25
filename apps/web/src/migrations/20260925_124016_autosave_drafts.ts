import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_dispatches_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_products_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_resources_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_legal_documents_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_wiki_articles_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_wiki_regions_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_wiki_factions_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload"."_wiki_gods_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_pages_v_autosave_idx" ON "payload"."_pages_v" USING btree ("autosave");
  CREATE INDEX "_dispatches_v_autosave_idx" ON "payload"."_dispatches_v" USING btree ("autosave");
  CREATE INDEX "_products_v_autosave_idx" ON "payload"."_products_v" USING btree ("autosave");
  CREATE INDEX "_resources_v_autosave_idx" ON "payload"."_resources_v" USING btree ("autosave");
  CREATE INDEX "_legal_documents_v_autosave_idx" ON "payload"."_legal_documents_v" USING btree ("autosave");
  CREATE INDEX "_wiki_articles_v_autosave_idx" ON "payload"."_wiki_articles_v" USING btree ("autosave");
  CREATE INDEX "_wiki_regions_v_autosave_idx" ON "payload"."_wiki_regions_v" USING btree ("autosave");
  CREATE INDEX "_wiki_factions_v_autosave_idx" ON "payload"."_wiki_factions_v" USING btree ("autosave");
  CREATE INDEX "_wiki_gods_v_autosave_idx" ON "payload"."_wiki_gods_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "payload"."_pages_v_autosave_idx";
  DROP INDEX "payload"."_dispatches_v_autosave_idx";
  DROP INDEX "payload"."_products_v_autosave_idx";
  DROP INDEX "payload"."_resources_v_autosave_idx";
  DROP INDEX "payload"."_legal_documents_v_autosave_idx";
  DROP INDEX "payload"."_wiki_articles_v_autosave_idx";
  DROP INDEX "payload"."_wiki_regions_v_autosave_idx";
  DROP INDEX "payload"."_wiki_factions_v_autosave_idx";
  DROP INDEX "payload"."_wiki_gods_v_autosave_idx";
  ALTER TABLE "payload"."_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_dispatches_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_products_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_resources_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_legal_documents_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_wiki_articles_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_wiki_regions_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_wiki_factions_v" DROP COLUMN "autosave";
  ALTER TABLE "payload"."_wiki_gods_v" DROP COLUMN "autosave";`)
}
