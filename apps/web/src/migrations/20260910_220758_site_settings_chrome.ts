import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  ALTER TABLE "payload"."site_settings_social" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "payload"."enum_site_settings_social_platform";
  CREATE TYPE "payload"."enum_site_settings_social_platform" AS ENUM('instagram', 'facebook', 'reddit', 'discord', 'youtube', 'tiktok', 'bluesky', 'itch', 'drivethru', 'patreon', 'kofi');
  ALTER TABLE "payload"."site_settings_social" ALTER COLUMN "platform" SET DATA TYPE "payload"."enum_site_settings_social_platform" USING "platform"::"payload"."enum_site_settings_social_platform";
  ALTER TABLE "payload"."site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "payload"."site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "payload"."site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "payload"."site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "payload"."site_settings_footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."site_settings_footer_columns_links" CASCADE;
  DROP TABLE "payload"."site_settings_footer_columns" CASCADE;
  ALTER TABLE "payload"."site_settings_social" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "payload"."enum_site_settings_social_platform";
  CREATE TYPE "payload"."enum_site_settings_social_platform" AS ENUM('bluesky', 'mastodon', 'discord', 'youtube', 'itch', 'drivethrurpg', 'rss');
  ALTER TABLE "payload"."site_settings_social" ALTER COLUMN "platform" SET DATA TYPE "payload"."enum_site_settings_social_platform" USING "platform"::"payload"."enum_site_settings_social_platform";`)
}
