import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."dispatches" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_dispatches_v" ADD COLUMN "version_search_text" varchar;
  ALTER TABLE "payload"."products" ADD COLUMN "search_text" varchar;
  ALTER TABLE "payload"."_products_v" ADD COLUMN "version_search_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."dispatches" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_dispatches_v" DROP COLUMN "version_search_text";
  ALTER TABLE "payload"."products" DROP COLUMN "search_text";
  ALTER TABLE "payload"."_products_v" DROP COLUMN "version_search_text";`)
}
