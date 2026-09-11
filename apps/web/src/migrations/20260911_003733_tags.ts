import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_tags_group" AS ENUM('subject', 'type', 'system');
  CREATE TABLE "payload"."products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "payload"."_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "payload"."tags_aliases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alias" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"group" "payload"."enum_tags_group" DEFAULT 'subject' NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload"."dispatches_rels" DROP CONSTRAINT "dispatches_rels_categories_fk";
  
  ALTER TABLE "payload"."_dispatches_v_rels" DROP CONSTRAINT "_dispatches_v_rels_categories_fk";
  
  ALTER TABLE "payload"."categories" ALTER COLUMN "kind" SET DATA TYPE text;
  ALTER TABLE "payload"."categories" ALTER COLUMN "kind" SET DEFAULT 'wiki'::text;
  DROP TYPE "payload"."enum_categories_kind";
  CREATE TYPE "payload"."enum_categories_kind" AS ENUM('wiki', 'dispatch');
  ALTER TABLE "payload"."categories" ALTER COLUMN "kind" SET DEFAULT 'wiki'::"payload"."enum_categories_kind";
  ALTER TABLE "payload"."categories" ALTER COLUMN "kind" SET DATA TYPE "payload"."enum_categories_kind" USING "kind"::"payload"."enum_categories_kind";
  DROP INDEX "payload"."dispatches_rels_categories_id_idx";
  DROP INDEX "payload"."_dispatches_v_rels_categories_id_idx";
  ALTER TABLE "payload"."dispatches" ADD COLUMN "category_id" integer;
  ALTER TABLE "payload"."dispatches_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."_dispatches_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."wiki_articles_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."wiki_regions_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."wiki_factions_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."wiki_gods_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."tags_aliases" ADD CONSTRAINT "tags_aliases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_rels_order_idx" ON "payload"."products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "payload"."products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "payload"."products_rels" USING btree ("path");
  CREATE INDEX "products_rels_tags_id_idx" ON "payload"."products_rels" USING btree ("tags_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "payload"."_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "payload"."_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "payload"."_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_tags_id_idx" ON "payload"."_products_v_rels" USING btree ("tags_id");
  CREATE INDEX "tags_aliases_order_idx" ON "payload"."tags_aliases" USING btree ("_order");
  CREATE INDEX "tags_aliases_parent_id_idx" ON "payload"."tags_aliases" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "payload"."tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "payload"."tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "payload"."tags" USING btree ("created_at");
  ALTER TABLE "payload"."dispatches" ADD CONSTRAINT "dispatches_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."dispatches_rels" ADD CONSTRAINT "dispatches_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v" ADD CONSTRAINT "_dispatches_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD CONSTRAINT "_dispatches_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dispatches_category_idx" ON "payload"."dispatches" USING btree ("category_id");
  CREATE INDEX "dispatches_rels_tags_id_idx" ON "payload"."dispatches_rels" USING btree ("tags_id");
  CREATE INDEX "_dispatches_v_version_version_category_idx" ON "payload"."_dispatches_v" USING btree ("version_category_id");
  CREATE INDEX "_dispatches_v_rels_tags_id_idx" ON "payload"."_dispatches_v_rels" USING btree ("tags_id");
  CREATE INDEX "wiki_articles_rels_tags_id_idx" ON "payload"."wiki_articles_rels" USING btree ("tags_id");
  CREATE INDEX "_wiki_articles_v_rels_tags_id_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("tags_id");
  CREATE INDEX "wiki_regions_rels_tags_id_idx" ON "payload"."wiki_regions_rels" USING btree ("tags_id");
  CREATE INDEX "_wiki_regions_v_rels_tags_id_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("tags_id");
  CREATE INDEX "wiki_factions_rels_tags_id_idx" ON "payload"."wiki_factions_rels" USING btree ("tags_id");
  CREATE INDEX "_wiki_factions_v_rels_tags_id_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("tags_id");
  CREATE INDEX "wiki_gods_rels_tags_id_idx" ON "payload"."wiki_gods_rels" USING btree ("tags_id");
  CREATE INDEX "_wiki_gods_v_rels_tags_id_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("tags_id");
  ALTER TABLE "payload"."dispatches_rels" DROP COLUMN "categories_id";
  ALTER TABLE "payload"."_dispatches_v_rels" DROP COLUMN "categories_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "payload"."enum_categories_kind" ADD VALUE 'both';
  ALTER TABLE "payload"."products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."tags_aliases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."tags" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."products_rels" CASCADE;
  DROP TABLE "payload"."_products_v_rels" CASCADE;
  DROP TABLE "payload"."tags_aliases" CASCADE;
  DROP TABLE "payload"."tags" CASCADE;
  ALTER TABLE "payload"."dispatches" DROP CONSTRAINT "dispatches_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."dispatches_rels" DROP CONSTRAINT "dispatches_rels_tags_fk";
  
  ALTER TABLE "payload"."_dispatches_v" DROP CONSTRAINT "_dispatches_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "payload"."_dispatches_v_rels" DROP CONSTRAINT "_dispatches_v_rels_tags_fk";
  
  ALTER TABLE "payload"."wiki_articles_rels" DROP CONSTRAINT "wiki_articles_rels_tags_fk";
  
  ALTER TABLE "payload"."_wiki_articles_v_rels" DROP CONSTRAINT "_wiki_articles_v_rels_tags_fk";
  
  ALTER TABLE "payload"."wiki_regions_rels" DROP CONSTRAINT "wiki_regions_rels_tags_fk";
  
  ALTER TABLE "payload"."_wiki_regions_v_rels" DROP CONSTRAINT "_wiki_regions_v_rels_tags_fk";
  
  ALTER TABLE "payload"."wiki_factions_rels" DROP CONSTRAINT "wiki_factions_rels_tags_fk";
  
  ALTER TABLE "payload"."_wiki_factions_v_rels" DROP CONSTRAINT "_wiki_factions_v_rels_tags_fk";
  
  ALTER TABLE "payload"."wiki_gods_rels" DROP CONSTRAINT "wiki_gods_rels_tags_fk";
  
  ALTER TABLE "payload"."_wiki_gods_v_rels" DROP CONSTRAINT "_wiki_gods_v_rels_tags_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  DROP INDEX "payload"."dispatches_category_idx";
  DROP INDEX "payload"."dispatches_rels_tags_id_idx";
  DROP INDEX "payload"."_dispatches_v_version_version_category_idx";
  DROP INDEX "payload"."_dispatches_v_rels_tags_id_idx";
  DROP INDEX "payload"."wiki_articles_rels_tags_id_idx";
  DROP INDEX "payload"."_wiki_articles_v_rels_tags_id_idx";
  DROP INDEX "payload"."wiki_regions_rels_tags_id_idx";
  DROP INDEX "payload"."_wiki_regions_v_rels_tags_id_idx";
  DROP INDEX "payload"."wiki_factions_rels_tags_id_idx";
  DROP INDEX "payload"."_wiki_factions_v_rels_tags_id_idx";
  DROP INDEX "payload"."wiki_gods_rels_tags_id_idx";
  DROP INDEX "payload"."_wiki_gods_v_rels_tags_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_tags_id_idx";
  ALTER TABLE "payload"."dispatches_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload"."dispatches_rels" ADD CONSTRAINT "dispatches_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD CONSTRAINT "_dispatches_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dispatches_rels_categories_id_idx" ON "payload"."dispatches_rels" USING btree ("categories_id");
  CREATE INDEX "_dispatches_v_rels_categories_id_idx" ON "payload"."_dispatches_v_rels" USING btree ("categories_id");
  ALTER TABLE "payload"."dispatches" DROP COLUMN "category_id";
  ALTER TABLE "payload"."dispatches_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."_dispatches_v" DROP COLUMN "version_category_id";
  ALTER TABLE "payload"."_dispatches_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."wiki_articles_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."_wiki_articles_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."wiki_regions_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."_wiki_regions_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."wiki_factions_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."_wiki_factions_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."wiki_gods_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."_wiki_gods_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "tags_id";
  DROP TYPE "payload"."enum_tags_group";`)
}
