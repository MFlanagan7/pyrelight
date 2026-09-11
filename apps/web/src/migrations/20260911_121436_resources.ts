import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_resources_section" AS ENUM('maps', 'adventures', 'tools', 'guides', 'templates');
  CREATE TYPE "payload"."enum_resources_delivery" AS ENUM('file', 'link', 'tool');
  CREATE TYPE "payload"."enum_resources_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_resources_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_resources_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_resources_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__resources_v_version_section" AS ENUM('maps', 'adventures', 'tools', 'guides', 'templates');
  CREATE TYPE "payload"."enum__resources_v_version_delivery" AS ENUM('file', 'link', 'tool');
  CREATE TYPE "payload"."enum__resources_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__resources_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__resources_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__resources_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_subscribers_reason" AS ENUM('newsletter', 'download');
  CREATE TABLE "payload"."resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"section" "payload"."enum_resources_section",
  	"summary" varchar,
  	"cover_id" integer,
  	"body" jsonb,
  	"delivery" "payload"."enum_resources_delivery" DEFAULT 'file',
  	"file_id" integer,
  	"require_email" boolean DEFAULT false,
  	"url" varchar,
  	"tool_key" varchar,
  	"search_text" varchar,
  	"content_kind" "payload"."enum_resources_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_resources_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_resources_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_resources_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "payload"."_resources_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_section" "payload"."enum__resources_v_version_section",
  	"version_summary" varchar,
  	"version_cover_id" integer,
  	"version_body" jsonb,
  	"version_delivery" "payload"."enum__resources_v_version_delivery" DEFAULT 'file',
  	"version_file_id" integer,
  	"version_require_email" boolean DEFAULT false,
  	"version_url" varchar,
  	"version_tool_key" varchar,
  	"version_search_text" varchar,
  	"version_content_kind" "payload"."enum__resources_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__resources_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__resources_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__resources_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_resources_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "payload"."downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload"."subscribers" ADD COLUMN "consented_at" timestamp(3) with time zone;
  ALTER TABLE "payload"."subscribers" ADD COLUMN "reason" "payload"."enum_subscribers_reason" DEFAULT 'newsletter';
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "downloads_id" integer;
  ALTER TABLE "payload"."resources" ADD CONSTRAINT "resources_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."resources" ADD CONSTRAINT "resources_file_id_downloads_id_fk" FOREIGN KEY ("file_id") REFERENCES "payload"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."resources" ADD CONSTRAINT "resources_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."resources_rels" ADD CONSTRAINT "resources_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v" ADD CONSTRAINT "_resources_v_parent_id_resources_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."resources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v" ADD CONSTRAINT "_resources_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v" ADD CONSTRAINT "_resources_v_version_file_id_downloads_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "payload"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v" ADD CONSTRAINT "_resources_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_resources_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "resources_slug_idx" ON "payload"."resources" USING btree ("slug");
  CREATE INDEX "resources_section_idx" ON "payload"."resources" USING btree ("section");
  CREATE INDEX "resources_cover_idx" ON "payload"."resources" USING btree ("cover_id");
  CREATE INDEX "resources_file_idx" ON "payload"."resources" USING btree ("file_id");
  CREATE INDEX "resources_seo_seo_image_idx" ON "payload"."resources" USING btree ("seo_image_id");
  CREATE INDEX "resources_updated_at_idx" ON "payload"."resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "payload"."resources" USING btree ("created_at");
  CREATE INDEX "resources__status_idx" ON "payload"."resources" USING btree ("_status");
  CREATE INDEX "resources_rels_order_idx" ON "payload"."resources_rels" USING btree ("order");
  CREATE INDEX "resources_rels_parent_idx" ON "payload"."resources_rels" USING btree ("parent_id");
  CREATE INDEX "resources_rels_path_idx" ON "payload"."resources_rels" USING btree ("path");
  CREATE INDEX "resources_rels_tags_id_idx" ON "payload"."resources_rels" USING btree ("tags_id");
  CREATE INDEX "_resources_v_parent_idx" ON "payload"."_resources_v" USING btree ("parent_id");
  CREATE INDEX "_resources_v_version_version_slug_idx" ON "payload"."_resources_v" USING btree ("version_slug");
  CREATE INDEX "_resources_v_version_version_section_idx" ON "payload"."_resources_v" USING btree ("version_section");
  CREATE INDEX "_resources_v_version_version_cover_idx" ON "payload"."_resources_v" USING btree ("version_cover_id");
  CREATE INDEX "_resources_v_version_version_file_idx" ON "payload"."_resources_v" USING btree ("version_file_id");
  CREATE INDEX "_resources_v_version_seo_version_seo_image_idx" ON "payload"."_resources_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_resources_v_version_version_updated_at_idx" ON "payload"."_resources_v" USING btree ("version_updated_at");
  CREATE INDEX "_resources_v_version_version_created_at_idx" ON "payload"."_resources_v" USING btree ("version_created_at");
  CREATE INDEX "_resources_v_version_version__status_idx" ON "payload"."_resources_v" USING btree ("version__status");
  CREATE INDEX "_resources_v_created_at_idx" ON "payload"."_resources_v" USING btree ("created_at");
  CREATE INDEX "_resources_v_updated_at_idx" ON "payload"."_resources_v" USING btree ("updated_at");
  CREATE INDEX "_resources_v_latest_idx" ON "payload"."_resources_v" USING btree ("latest");
  CREATE INDEX "_resources_v_rels_order_idx" ON "payload"."_resources_v_rels" USING btree ("order");
  CREATE INDEX "_resources_v_rels_parent_idx" ON "payload"."_resources_v_rels" USING btree ("parent_id");
  CREATE INDEX "_resources_v_rels_path_idx" ON "payload"."_resources_v_rels" USING btree ("path");
  CREATE INDEX "_resources_v_rels_tags_id_idx" ON "payload"."_resources_v_rels" USING btree ("tags_id");
  CREATE INDEX "downloads_updated_at_idx" ON "payload"."downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "payload"."downloads" USING btree ("created_at");
  CREATE UNIQUE INDEX "downloads_filename_idx" ON "payload"."downloads" USING btree ("filename");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "payload"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "payload"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("downloads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."resources_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_resources_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_resources_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."downloads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."resources" CASCADE;
  DROP TABLE "payload"."resources_rels" CASCADE;
  DROP TABLE "payload"."_resources_v" CASCADE;
  DROP TABLE "payload"."_resources_v_rels" CASCADE;
  DROP TABLE "payload"."downloads" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_downloads_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_resources_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_downloads_id_idx";
  ALTER TABLE "payload"."subscribers" DROP COLUMN "consented_at";
  ALTER TABLE "payload"."subscribers" DROP COLUMN "reason";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "resources_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "downloads_id";
  DROP TYPE "payload"."enum_resources_section";
  DROP TYPE "payload"."enum_resources_delivery";
  DROP TYPE "payload"."enum_resources_content_kind";
  DROP TYPE "payload"."enum_resources_game_system";
  DROP TYPE "payload"."enum_resources_licence";
  DROP TYPE "payload"."enum_resources_status";
  DROP TYPE "payload"."enum__resources_v_version_section";
  DROP TYPE "payload"."enum__resources_v_version_delivery";
  DROP TYPE "payload"."enum__resources_v_version_content_kind";
  DROP TYPE "payload"."enum__resources_v_version_game_system";
  DROP TYPE "payload"."enum__resources_v_version_licence";
  DROP TYPE "payload"."enum__resources_v_version_status";
  DROP TYPE "payload"."enum_subscribers_reason";`)
}
