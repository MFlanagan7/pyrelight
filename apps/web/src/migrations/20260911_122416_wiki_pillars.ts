import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."wiki_regions" ADD COLUMN "category_id" integer;
  ALTER TABLE "payload"."_wiki_regions_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload"."wiki_factions" ADD COLUMN "category_id" integer;
  ALTER TABLE "payload"."_wiki_factions_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload"."wiki_gods" ADD COLUMN "category_id" integer;
  ALTER TABLE "payload"."_wiki_gods_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload"."wiki_regions" ADD CONSTRAINT "wiki_regions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v" ADD CONSTRAINT "_wiki_regions_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions" ADD CONSTRAINT "wiki_factions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v" ADD CONSTRAINT "_wiki_factions_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods" ADD CONSTRAINT "wiki_gods_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v" ADD CONSTRAINT "_wiki_gods_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "wiki_regions_category_idx" ON "payload"."wiki_regions" USING btree ("category_id");
  CREATE INDEX "_wiki_regions_v_version_version_category_idx" ON "payload"."_wiki_regions_v" USING btree ("version_category_id");
  CREATE INDEX "wiki_factions_category_idx" ON "payload"."wiki_factions" USING btree ("category_id");
  CREATE INDEX "_wiki_factions_v_version_version_category_idx" ON "payload"."_wiki_factions_v" USING btree ("version_category_id");
  CREATE INDEX "wiki_gods_category_idx" ON "payload"."wiki_gods" USING btree ("category_id");
  CREATE INDEX "_wiki_gods_v_version_version_category_idx" ON "payload"."_wiki_gods_v" USING btree ("version_category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."wiki_regions" DROP CONSTRAINT "wiki_regions_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."_wiki_regions_v" DROP CONSTRAINT "_wiki_regions_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."wiki_factions" DROP CONSTRAINT "wiki_factions_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."_wiki_factions_v" DROP CONSTRAINT "_wiki_factions_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."wiki_gods" DROP CONSTRAINT "wiki_gods_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."_wiki_gods_v" DROP CONSTRAINT "_wiki_gods_v_version_category_id_categories_id_fk";
  
  DROP INDEX "payload"."wiki_regions_category_idx";
  DROP INDEX "payload"."_wiki_regions_v_version_version_category_idx";
  DROP INDEX "payload"."wiki_factions_category_idx";
  DROP INDEX "payload"."_wiki_factions_v_version_version_category_idx";
  DROP INDEX "payload"."wiki_gods_category_idx";
  DROP INDEX "payload"."_wiki_gods_v_version_version_category_idx";
  ALTER TABLE "payload"."wiki_regions" DROP COLUMN "category_id";
  ALTER TABLE "payload"."_wiki_regions_v" DROP COLUMN "version_category_id";
  ALTER TABLE "payload"."wiki_factions" DROP COLUMN "category_id";
  ALTER TABLE "payload"."_wiki_factions_v" DROP COLUMN "version_category_id";
  ALTER TABLE "payload"."wiki_gods" DROP COLUMN "category_id";
  ALTER TABLE "payload"."_wiki_gods_v" DROP COLUMN "version_category_id";`)
}
