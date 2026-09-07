import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_legal_documents_slug" AS ENUM('legal', 'privacy', 'content-licence');
  CREATE TYPE "payload"."enum_legal_documents_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__legal_documents_v_version_slug" AS ENUM('legal', 'privacy', 'content-licence');
  CREATE TYPE "payload"."enum__legal_documents_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "payload"."legal_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" "payload"."enum_legal_documents_slug",
  	"last_reviewed" timestamp(3) with time zone,
  	"intro" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_legal_documents_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_legal_documents_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" "payload"."enum__legal_documents_v_version_slug",
  	"version_last_reviewed" timestamp(3) with time zone,
  	"version_intro" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__legal_documents_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "legal_documents_id" integer;
  ALTER TABLE "payload"."legal_documents" ADD CONSTRAINT "legal_documents_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_legal_documents_v" ADD CONSTRAINT "_legal_documents_v_parent_id_legal_documents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."legal_documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_legal_documents_v" ADD CONSTRAINT "_legal_documents_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "legal_documents_slug_idx" ON "payload"."legal_documents" USING btree ("slug");
  CREATE INDEX "legal_documents_seo_seo_image_idx" ON "payload"."legal_documents" USING btree ("seo_image_id");
  CREATE INDEX "legal_documents_updated_at_idx" ON "payload"."legal_documents" USING btree ("updated_at");
  CREATE INDEX "legal_documents_created_at_idx" ON "payload"."legal_documents" USING btree ("created_at");
  CREATE INDEX "legal_documents__status_idx" ON "payload"."legal_documents" USING btree ("_status");
  CREATE INDEX "_legal_documents_v_parent_idx" ON "payload"."_legal_documents_v" USING btree ("parent_id");
  CREATE INDEX "_legal_documents_v_version_version_slug_idx" ON "payload"."_legal_documents_v" USING btree ("version_slug");
  CREATE INDEX "_legal_documents_v_version_seo_version_seo_image_idx" ON "payload"."_legal_documents_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_legal_documents_v_version_version_updated_at_idx" ON "payload"."_legal_documents_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_documents_v_version_version_created_at_idx" ON "payload"."_legal_documents_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_documents_v_version_version__status_idx" ON "payload"."_legal_documents_v" USING btree ("version__status");
  CREATE INDEX "_legal_documents_v_created_at_idx" ON "payload"."_legal_documents_v" USING btree ("created_at");
  CREATE INDEX "_legal_documents_v_updated_at_idx" ON "payload"."_legal_documents_v" USING btree ("updated_at");
  CREATE INDEX "_legal_documents_v_latest_idx" ON "payload"."_legal_documents_v" USING btree ("latest");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_documents_fk" FOREIGN KEY ("legal_documents_id") REFERENCES "payload"."legal_documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_legal_documents_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("legal_documents_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."legal_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_legal_documents_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."legal_documents" CASCADE;
  DROP TABLE "payload"."_legal_documents_v" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_documents_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_legal_documents_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "legal_documents_id";
  DROP TYPE "payload"."enum_legal_documents_slug";
  DROP TYPE "payload"."enum_legal_documents_status";
  DROP TYPE "payload"."enum__legal_documents_v_version_slug";
  DROP TYPE "payload"."enum__legal_documents_v_version_status";`)
}
