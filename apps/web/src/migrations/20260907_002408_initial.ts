import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * The schema is created here, by hand, and everything below depends on it.
 *
 * Drizzle generated this migration by diffing a database whose `payload` schema
 * already existed — created by `push: true` back when development still used it
 * — so the schema was never part of the diff and never made it into the file.
 * That left a migration set that could only ever be applied to a database that
 * had already been through push, which nobody noticed until the first genuinely
 * empty database: staging.
 *
 * The failure is quiet in the worst way. Payload checks for its migrations
 * table with to_regclass, which returns NULL for a missing schema instead of
 * raising, so migrate concludes there is simply nothing applied yet and runs
 * the whole set. The first statement then dies with 3F000, schema does not
 * exist, several hundred lines into an error whose cause is off the end of it.
 *
 * IF NOT EXISTS because production has long had this schema and has already
 * recorded this migration as applied. This line is for the next empty database.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "payload";
   CREATE TYPE "payload"."enum_pages_blocks_hero_actions_variant" AS ENUM('primary', 'ghost');
  CREATE TYPE "payload"."enum_pages_blocks_section_intro_align" AS ENUM('left', 'center');
  CREATE TYPE "payload"."enum_pages_blocks_callout_tone" AS ENUM('lore', 'gm', 'rule', 'note');
  CREATE TYPE "payload"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_actions_variant" AS ENUM('primary', 'ghost');
  CREATE TYPE "payload"."enum__pages_v_blocks_section_intro_align" AS ENUM('left', 'center');
  CREATE TYPE "payload"."enum__pages_v_blocks_callout_tone" AS ENUM('lore', 'gm', 'rule', 'note');
  CREATE TYPE "payload"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_dispatches_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__dispatches_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_products_store_links_platform" AS ENUM('itch', 'drivethrurpg', 'other');
  CREATE TYPE "payload"."enum_products_tier" AS ENUM('free', 'pwyw', 'premium');
  CREATE TYPE "payload"."enum_products_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_products_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_products_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__products_v_version_store_links_platform" AS ENUM('itch', 'drivethrurpg', 'other');
  CREATE TYPE "payload"."enum__products_v_version_tier" AS ENUM('free', 'pwyw', 'premium');
  CREATE TYPE "payload"."enum__products_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__products_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__products_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_categories_kind" AS ENUM('wiki', 'dispatch', 'both');
  CREATE TYPE "payload"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "payload"."enum_wiki_articles_blocks_callout_tone" AS ENUM('lore', 'gm', 'rule', 'note');
  CREATE TYPE "payload"."enum_wiki_articles_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_wiki_articles_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_wiki_articles_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_wiki_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__wiki_articles_v_blocks_callout_tone" AS ENUM('lore', 'gm', 'rule', 'note');
  CREATE TYPE "payload"."enum__wiki_articles_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__wiki_articles_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__wiki_articles_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__wiki_articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_wiki_regions_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_wiki_regions_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_wiki_regions_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_wiki_regions_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__wiki_regions_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__wiki_regions_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__wiki_regions_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__wiki_regions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_wiki_factions_kind" AS ENUM('house', 'order', 'guild', 'cult', 'other');
  CREATE TYPE "payload"."enum_wiki_factions_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_wiki_factions_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_wiki_factions_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_wiki_factions_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__wiki_factions_v_version_kind" AS ENUM('house', 'order', 'guild', 'cult', 'other');
  CREATE TYPE "payload"."enum__wiki_factions_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__wiki_factions_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__wiki_factions_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__wiki_factions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_wiki_gods_divine_status" AS ENUM('ascendant', 'stranded', 'dead', 'unknown');
  CREATE TYPE "payload"."enum_wiki_gods_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum_wiki_gods_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum_wiki_gods_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum_wiki_gods_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__wiki_gods_v_version_divine_status" AS ENUM('ascendant', 'stranded', 'dead', 'unknown');
  CREATE TYPE "payload"."enum__wiki_gods_v_version_content_kind" AS ENUM('lore', 'crunch');
  CREATE TYPE "payload"."enum__wiki_gods_v_version_game_system" AS ENUM('system-neutral', '5e-2014', '5e-2024', 'pf2e', 'sf2e');
  CREATE TYPE "payload"."enum__wiki_gods_v_version_licence" AS ENUM('none', 'srd-5.1', 'srd-5.2', 'orc');
  CREATE TYPE "payload"."enum__wiki_gods_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_site_settings_social_platform" AS ENUM('bluesky', 'mastodon', 'discord', 'youtube', 'itch', 'drivethrurpg', 'rss');
  CREATE TABLE "payload"."pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "payload"."enum_pages_blocks_hero_actions_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "payload"."pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"lede" varchar,
  	"background_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"align" "payload"."enum_pages_blocks_section_intro_align" DEFAULT 'left',
  	"action_label" varchar,
  	"action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stat_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stat_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "payload"."pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_start_here_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_start_here" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"meta" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum_pages_blocks_callout_tone" DEFAULT 'note',
  	"label" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "payload"."pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"confirmation" varchar DEFAULT 'The map is on its way.',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "payload"."enum__pages_v_blocks_hero_actions_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"lede" varchar,
  	"background_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"align" "payload"."enum__pages_v_blocks_section_intro_align" DEFAULT 'left',
  	"action_label" varchar,
  	"action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stat_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stat_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_start_here_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_start_here" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum__pages_v_blocks_callout_tone" DEFAULT 'note',
  	"label" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"confirmation" varchar DEFAULT 'The map is on its way.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "payload"."dispatches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_id" integer,
  	"body" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_dispatches_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."dispatches_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "payload"."_dispatches_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_id" integer,
  	"version_body" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__dispatches_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_dispatches_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "payload"."products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "payload"."products_store_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "payload"."enum_products_store_links_platform",
  	"url" varchar,
  	"affiliate_url" varchar
  );
  
  CREATE TABLE "payload"."products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"blurb" varchar,
  	"cover_id" integer,
  	"description" jsonb,
  	"tier" "payload"."enum_products_tier" DEFAULT 'premium',
  	"featured" boolean DEFAULT false,
  	"content_kind" "payload"."enum_products_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_products_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_products_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_products_v_version_store_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "payload"."enum__products_v_version_store_links_platform",
  	"url" varchar,
  	"affiliate_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_blurb" varchar,
  	"version_cover_id" integer,
  	"version_description" jsonb,
  	"version_tier" "payload"."enum__products_v_version_tier" DEFAULT 'premium',
  	"version_featured" boolean DEFAULT false,
  	"version_content_kind" "payload"."enum__products_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__products_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__products_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"kind" "payload"."enum_categories_kind" DEFAULT 'wiki' NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
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
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_cover_url" varchar,
  	"sizes_cover_width" numeric,
  	"sizes_cover_height" numeric,
  	"sizes_cover_mime_type" varchar,
  	"sizes_cover_filesize" numeric,
  	"sizes_cover_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "payload"."subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"confirmed" boolean DEFAULT false,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "payload"."enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"meta" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum_wiki_articles_blocks_callout_tone" DEFAULT 'note',
  	"label" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_stat_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles_blocks_stat_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."wiki_articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"category_id" integer,
  	"body" jsonb,
  	"spoiler" boolean DEFAULT false,
  	"content_kind" "payload"."enum_wiki_articles_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_wiki_articles_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_wiki_articles_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_wiki_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."wiki_articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "payload"."enum__wiki_articles_v_blocks_callout_tone" DEFAULT 'note',
  	"label" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_stat_row_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_blocks_stat_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_wiki_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_category_id" integer,
  	"version_body" jsonb,
  	"version_spoiler" boolean DEFAULT false,
  	"version_content_kind" "payload"."enum__wiki_articles_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__wiki_articles_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__wiki_articles_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__wiki_articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_wiki_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."wiki_regions_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."wiki_regions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"terrain" varchar,
  	"map_id" integer,
  	"summary" varchar,
  	"body" jsonb,
  	"content_kind" "payload"."enum_wiki_regions_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_wiki_regions_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_wiki_regions_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_wiki_regions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."wiki_regions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_factions_id" integer,
  	"wiki_articles_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."_wiki_regions_v_version_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_wiki_regions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_terrain" varchar,
  	"version_map_id" integer,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_content_kind" "payload"."enum__wiki_regions_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__wiki_regions_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__wiki_regions_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__wiki_regions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_wiki_regions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_factions_id" integer,
  	"wiki_articles_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."wiki_factions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"kind" "payload"."enum_wiki_factions_kind" DEFAULT 'house',
  	"sigil_id" integer,
  	"motto" varchar,
  	"seat" varchar,
  	"region_id" integer,
  	"summary" varchar,
  	"body" jsonb,
  	"content_kind" "payload"."enum_wiki_factions_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_wiki_factions_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_wiki_factions_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_wiki_factions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."wiki_factions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."_wiki_factions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_kind" "payload"."enum__wiki_factions_v_version_kind" DEFAULT 'house',
  	"version_sigil_id" integer,
  	"version_motto" varchar,
  	"version_seat" varchar,
  	"version_region_id" integer,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_content_kind" "payload"."enum__wiki_factions_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__wiki_factions_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__wiki_factions_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__wiki_factions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_wiki_factions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer,
  	"wiki_regions_id" integer
  );
  
  CREATE TABLE "payload"."wiki_gods_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"domain" varchar
  );
  
  CREATE TABLE "payload"."wiki_gods" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"epithet" varchar,
  	"divine_status" "payload"."enum_wiki_gods_divine_status" DEFAULT 'stranded',
  	"symbol_id" integer,
  	"summary" varchar,
  	"body" jsonb,
  	"content_kind" "payload"."enum_wiki_gods_content_kind" DEFAULT 'lore',
  	"game_system" "payload"."enum_wiki_gods_game_system" DEFAULT 'system-neutral',
  	"licence" "payload"."enum_wiki_gods_licence" DEFAULT 'none',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_wiki_gods_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."wiki_gods_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_regions_id" integer,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer
  );
  
  CREATE TABLE "payload"."_wiki_gods_v_version_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_wiki_gods_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_epithet" varchar,
  	"version_divine_status" "payload"."enum__wiki_gods_v_version_divine_status" DEFAULT 'stranded',
  	"version_symbol_id" integer,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_content_kind" "payload"."enum__wiki_gods_v_version_content_kind" DEFAULT 'lore',
  	"version_game_system" "payload"."enum__wiki_gods_v_version_game_system" DEFAULT 'system-neutral',
  	"version_licence" "payload"."enum__wiki_gods_v_version_licence" DEFAULT 'none',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__wiki_gods_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."_wiki_gods_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wiki_regions_id" integer,
  	"wiki_articles_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"dispatches_id" integer,
  	"products_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"subscribers_id" integer,
  	"users_id" integer,
  	"wiki_articles_id" integer,
  	"wiki_regions_id" integer,
  	"wiki_factions_id" integer,
  	"wiki_gods_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "payload"."enum_site_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"footer_note" varchar,
  	"newsletter_enabled" boolean DEFAULT true,
  	"newsletter_heading" varchar,
  	"newsletter_body" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_section_intro" ADD CONSTRAINT "pages_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stat_row_items" ADD CONSTRAINT "pages_blocks_stat_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_stat_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stat_row" ADD CONSTRAINT "pages_blocks_stat_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_start_here_items" ADD CONSTRAINT "pages_blocks_start_here_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_start_here"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_start_here" ADD CONSTRAINT "pages_blocks_start_here_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_reading_panel" ADD CONSTRAINT "pages_blocks_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_callout" ADD CONSTRAINT "pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_section_intro" ADD CONSTRAINT "_pages_v_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stat_row_items" ADD CONSTRAINT "_pages_v_blocks_stat_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_stat_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stat_row" ADD CONSTRAINT "_pages_v_blocks_stat_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_start_here_items" ADD CONSTRAINT "_pages_v_blocks_start_here_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_start_here"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_start_here" ADD CONSTRAINT "_pages_v_blocks_start_here_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_reading_panel" ADD CONSTRAINT "_pages_v_blocks_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_callout" ADD CONSTRAINT "_pages_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."dispatches" ADD CONSTRAINT "dispatches_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."dispatches" ADD CONSTRAINT "dispatches_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."dispatches_rels" ADD CONSTRAINT "dispatches_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."dispatches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."dispatches_rels" ADD CONSTRAINT "dispatches_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v" ADD CONSTRAINT "_dispatches_v_parent_id_dispatches_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."dispatches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v" ADD CONSTRAINT "_dispatches_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v" ADD CONSTRAINT "_dispatches_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD CONSTRAINT "_dispatches_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_dispatches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_dispatches_v_rels" ADD CONSTRAINT "_dispatches_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_store_links" ADD CONSTRAINT "products_store_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products" ADD CONSTRAINT "products_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products" ADD CONSTRAINT "products_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_products_v_version_store_links" ADD CONSTRAINT "_products_v_version_store_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_products_v" ADD CONSTRAINT "_products_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_products_v" ADD CONSTRAINT "_products_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_reading_panel" ADD CONSTRAINT "wiki_articles_blocks_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_quote" ADD CONSTRAINT "wiki_articles_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_callout" ADD CONSTRAINT "wiki_articles_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_gallery_images" ADD CONSTRAINT "wiki_articles_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_gallery_images" ADD CONSTRAINT "wiki_articles_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_gallery" ADD CONSTRAINT "wiki_articles_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_stat_row_items" ADD CONSTRAINT "wiki_articles_blocks_stat_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles_blocks_stat_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_blocks_stat_row" ADD CONSTRAINT "wiki_articles_blocks_stat_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles" ADD CONSTRAINT "wiki_articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles" ADD CONSTRAINT "wiki_articles_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_articles_rels" ADD CONSTRAINT "wiki_articles_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_reading_panel" ADD CONSTRAINT "_wiki_articles_v_blocks_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_quote" ADD CONSTRAINT "_wiki_articles_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_callout" ADD CONSTRAINT "_wiki_articles_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_gallery_images" ADD CONSTRAINT "_wiki_articles_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_gallery_images" ADD CONSTRAINT "_wiki_articles_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_gallery" ADD CONSTRAINT "_wiki_articles_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_stat_row_items" ADD CONSTRAINT "_wiki_articles_v_blocks_stat_row_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v_blocks_stat_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_blocks_stat_row" ADD CONSTRAINT "_wiki_articles_v_blocks_stat_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v" ADD CONSTRAINT "_wiki_articles_v_parent_id_wiki_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v" ADD CONSTRAINT "_wiki_articles_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v" ADD CONSTRAINT "_wiki_articles_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_wiki_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_articles_v_rels" ADD CONSTRAINT "_wiki_articles_v_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_locations" ADD CONSTRAINT "wiki_regions_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions" ADD CONSTRAINT "wiki_regions_map_id_media_id_fk" FOREIGN KEY ("map_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions" ADD CONSTRAINT "wiki_regions_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_regions_rels" ADD CONSTRAINT "wiki_regions_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_version_locations" ADD CONSTRAINT "_wiki_regions_v_version_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_regions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v" ADD CONSTRAINT "_wiki_regions_v_parent_id_wiki_regions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v" ADD CONSTRAINT "_wiki_regions_v_version_map_id_media_id_fk" FOREIGN KEY ("version_map_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v" ADD CONSTRAINT "_wiki_regions_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_wiki_regions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_regions_v_rels" ADD CONSTRAINT "_wiki_regions_v_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions" ADD CONSTRAINT "wiki_factions_sigil_id_media_id_fk" FOREIGN KEY ("sigil_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions" ADD CONSTRAINT "wiki_factions_region_id_wiki_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions" ADD CONSTRAINT "wiki_factions_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_factions_rels" ADD CONSTRAINT "wiki_factions_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v" ADD CONSTRAINT "_wiki_factions_v_parent_id_wiki_factions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v" ADD CONSTRAINT "_wiki_factions_v_version_sigil_id_media_id_fk" FOREIGN KEY ("version_sigil_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v" ADD CONSTRAINT "_wiki_factions_v_version_region_id_wiki_regions_id_fk" FOREIGN KEY ("version_region_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v" ADD CONSTRAINT "_wiki_factions_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_wiki_factions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_factions_v_rels" ADD CONSTRAINT "_wiki_factions_v_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_domains" ADD CONSTRAINT "wiki_gods_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods" ADD CONSTRAINT "wiki_gods_symbol_id_media_id_fk" FOREIGN KEY ("symbol_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods" ADD CONSTRAINT "wiki_gods_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."wiki_gods_rels" ADD CONSTRAINT "wiki_gods_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_version_domains" ADD CONSTRAINT "_wiki_gods_v_version_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_wiki_gods_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v" ADD CONSTRAINT "_wiki_gods_v_parent_id_wiki_gods_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v" ADD CONSTRAINT "_wiki_gods_v_version_symbol_id_media_id_fk" FOREIGN KEY ("version_symbol_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v" ADD CONSTRAINT "_wiki_gods_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_wiki_gods_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_wiki_gods_v_rels" ADD CONSTRAINT "_wiki_gods_v_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dispatches_fk" FOREIGN KEY ("dispatches_id") REFERENCES "payload"."dispatches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "payload"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wiki_articles_fk" FOREIGN KEY ("wiki_articles_id") REFERENCES "payload"."wiki_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wiki_regions_fk" FOREIGN KEY ("wiki_regions_id") REFERENCES "payload"."wiki_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wiki_factions_fk" FOREIGN KEY ("wiki_factions_id") REFERENCES "payload"."wiki_factions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wiki_gods_fk" FOREIGN KEY ("wiki_gods_id") REFERENCES "payload"."wiki_gods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "payload"."pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "payload"."pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "payload"."pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "payload"."pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_idx" ON "payload"."pages_blocks_hero" USING btree ("background_id");
  CREATE INDEX "pages_blocks_section_intro_order_idx" ON "payload"."pages_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_intro_parent_id_idx" ON "payload"."pages_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_intro_path_idx" ON "payload"."pages_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_stat_row_items_order_idx" ON "payload"."pages_blocks_stat_row_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_row_items_parent_id_idx" ON "payload"."pages_blocks_stat_row_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_row_order_idx" ON "payload"."pages_blocks_stat_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_row_parent_id_idx" ON "payload"."pages_blocks_stat_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_row_path_idx" ON "payload"."pages_blocks_stat_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "payload"."pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "payload"."pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "payload"."pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "payload"."pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "payload"."pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "payload"."pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_grid_order_idx" ON "payload"."pages_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_parent_id_idx" ON "payload"."pages_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_path_idx" ON "payload"."pages_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_start_here_items_order_idx" ON "payload"."pages_blocks_start_here_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_start_here_items_parent_id_idx" ON "payload"."pages_blocks_start_here_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_start_here_order_idx" ON "payload"."pages_blocks_start_here" USING btree ("_order");
  CREATE INDEX "pages_blocks_start_here_parent_id_idx" ON "payload"."pages_blocks_start_here" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_start_here_path_idx" ON "payload"."pages_blocks_start_here" USING btree ("_path");
  CREATE INDEX "pages_blocks_reading_panel_order_idx" ON "payload"."pages_blocks_reading_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_reading_panel_parent_id_idx" ON "payload"."pages_blocks_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reading_panel_path_idx" ON "payload"."pages_blocks_reading_panel" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "payload"."pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "payload"."pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "payload"."pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_callout_order_idx" ON "payload"."pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_parent_id_idx" ON "payload"."pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_path_idx" ON "payload"."pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "payload"."pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "payload"."pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "payload"."pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "payload"."pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "payload"."pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "payload"."pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "payload"."pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "payload"."pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "payload"."pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "payload"."pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "payload"."pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "payload"."pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "payload"."pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "payload"."pages_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "payload"."pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "payload"."pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "payload"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "payload"."pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "payload"."pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "payload"."pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "payload"."pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_products_id_idx" ON "payload"."pages_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_blocks_hero_actions_order_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_actions_parent_id_idx" ON "payload"."_pages_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_idx" ON "payload"."_pages_v_blocks_hero" USING btree ("background_id");
  CREATE INDEX "_pages_v_blocks_section_intro_order_idx" ON "payload"."_pages_v_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_intro_parent_id_idx" ON "payload"."_pages_v_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_intro_path_idx" ON "payload"."_pages_v_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stat_row_items_order_idx" ON "payload"."_pages_v_blocks_stat_row_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_row_items_parent_id_idx" ON "payload"."_pages_v_blocks_stat_row_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_row_order_idx" ON "payload"."_pages_v_blocks_stat_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_row_parent_id_idx" ON "payload"."_pages_v_blocks_stat_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_row_path_idx" ON "payload"."_pages_v_blocks_stat_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "payload"."_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "payload"."_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "payload"."_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "payload"."_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "payload"."_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "payload"."_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_grid_order_idx" ON "payload"."_pages_v_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_grid_parent_id_idx" ON "payload"."_pages_v_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_grid_path_idx" ON "payload"."_pages_v_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_start_here_items_order_idx" ON "payload"."_pages_v_blocks_start_here_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_start_here_items_parent_id_idx" ON "payload"."_pages_v_blocks_start_here_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_start_here_order_idx" ON "payload"."_pages_v_blocks_start_here" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_start_here_parent_id_idx" ON "payload"."_pages_v_blocks_start_here" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_start_here_path_idx" ON "payload"."_pages_v_blocks_start_here" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reading_panel_order_idx" ON "payload"."_pages_v_blocks_reading_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reading_panel_parent_id_idx" ON "payload"."_pages_v_blocks_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reading_panel_path_idx" ON "payload"."_pages_v_blocks_reading_panel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "payload"."_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_callout_order_idx" ON "payload"."_pages_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_callout_parent_id_idx" ON "payload"."_pages_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_callout_path_idx" ON "payload"."_pages_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "payload"."_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "payload"."_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "payload"."_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "payload"."_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "payload"."_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "payload"."_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "payload"."_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "payload"."_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "payload"."_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "payload"."_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "payload"."_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "payload"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "payload"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "payload"."_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "payload"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "payload"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "payload"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "payload"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "payload"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "payload"."_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "payload"."_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "payload"."_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "payload"."_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "payload"."_pages_v_rels" USING btree ("products_id");
  CREATE UNIQUE INDEX "dispatches_slug_idx" ON "payload"."dispatches" USING btree ("slug");
  CREATE INDEX "dispatches_cover_idx" ON "payload"."dispatches" USING btree ("cover_id");
  CREATE INDEX "dispatches_seo_seo_image_idx" ON "payload"."dispatches" USING btree ("seo_image_id");
  CREATE INDEX "dispatches_updated_at_idx" ON "payload"."dispatches" USING btree ("updated_at");
  CREATE INDEX "dispatches_created_at_idx" ON "payload"."dispatches" USING btree ("created_at");
  CREATE INDEX "dispatches__status_idx" ON "payload"."dispatches" USING btree ("_status");
  CREATE INDEX "dispatches_rels_order_idx" ON "payload"."dispatches_rels" USING btree ("order");
  CREATE INDEX "dispatches_rels_parent_idx" ON "payload"."dispatches_rels" USING btree ("parent_id");
  CREATE INDEX "dispatches_rels_path_idx" ON "payload"."dispatches_rels" USING btree ("path");
  CREATE INDEX "dispatches_rels_categories_id_idx" ON "payload"."dispatches_rels" USING btree ("categories_id");
  CREATE INDEX "_dispatches_v_parent_idx" ON "payload"."_dispatches_v" USING btree ("parent_id");
  CREATE INDEX "_dispatches_v_version_version_slug_idx" ON "payload"."_dispatches_v" USING btree ("version_slug");
  CREATE INDEX "_dispatches_v_version_version_cover_idx" ON "payload"."_dispatches_v" USING btree ("version_cover_id");
  CREATE INDEX "_dispatches_v_version_seo_version_seo_image_idx" ON "payload"."_dispatches_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_dispatches_v_version_version_updated_at_idx" ON "payload"."_dispatches_v" USING btree ("version_updated_at");
  CREATE INDEX "_dispatches_v_version_version_created_at_idx" ON "payload"."_dispatches_v" USING btree ("version_created_at");
  CREATE INDEX "_dispatches_v_version_version__status_idx" ON "payload"."_dispatches_v" USING btree ("version__status");
  CREATE INDEX "_dispatches_v_created_at_idx" ON "payload"."_dispatches_v" USING btree ("created_at");
  CREATE INDEX "_dispatches_v_updated_at_idx" ON "payload"."_dispatches_v" USING btree ("updated_at");
  CREATE INDEX "_dispatches_v_latest_idx" ON "payload"."_dispatches_v" USING btree ("latest");
  CREATE INDEX "_dispatches_v_rels_order_idx" ON "payload"."_dispatches_v_rels" USING btree ("order");
  CREATE INDEX "_dispatches_v_rels_parent_idx" ON "payload"."_dispatches_v_rels" USING btree ("parent_id");
  CREATE INDEX "_dispatches_v_rels_path_idx" ON "payload"."_dispatches_v_rels" USING btree ("path");
  CREATE INDEX "_dispatches_v_rels_categories_id_idx" ON "payload"."_dispatches_v_rels" USING btree ("categories_id");
  CREATE INDEX "products_gallery_order_idx" ON "payload"."products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "payload"."products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "payload"."products_gallery" USING btree ("image_id");
  CREATE INDEX "products_store_links_order_idx" ON "payload"."products_store_links" USING btree ("_order");
  CREATE INDEX "products_store_links_parent_id_idx" ON "payload"."products_store_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "payload"."products" USING btree ("slug");
  CREATE INDEX "products_cover_idx" ON "payload"."products" USING btree ("cover_id");
  CREATE INDEX "products_seo_seo_image_idx" ON "payload"."products" USING btree ("seo_image_id");
  CREATE INDEX "products_updated_at_idx" ON "payload"."products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "payload"."products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "payload"."products" USING btree ("_status");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "payload"."_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "payload"."_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "payload"."_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_store_links_order_idx" ON "payload"."_products_v_version_store_links" USING btree ("_order");
  CREATE INDEX "_products_v_version_store_links_parent_id_idx" ON "payload"."_products_v_version_store_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "payload"."_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "payload"."_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_cover_idx" ON "payload"."_products_v" USING btree ("version_cover_id");
  CREATE INDEX "_products_v_version_seo_version_seo_image_idx" ON "payload"."_products_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "payload"."_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "payload"."_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "payload"."_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "payload"."_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "payload"."_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "payload"."_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "payload"."categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "payload"."categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "payload"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "payload"."categories" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "payload"."media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "payload"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_cover_sizes_cover_filename_idx" ON "payload"."media" USING btree ("sizes_cover_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "payload"."media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "payload"."subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "payload"."subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "payload"."subscribers" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE INDEX "wiki_articles_blocks_reading_panel_order_idx" ON "payload"."wiki_articles_blocks_reading_panel" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_reading_panel_parent_id_idx" ON "payload"."wiki_articles_blocks_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_reading_panel_path_idx" ON "payload"."wiki_articles_blocks_reading_panel" USING btree ("_path");
  CREATE INDEX "wiki_articles_blocks_quote_order_idx" ON "payload"."wiki_articles_blocks_quote" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_quote_parent_id_idx" ON "payload"."wiki_articles_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_quote_path_idx" ON "payload"."wiki_articles_blocks_quote" USING btree ("_path");
  CREATE INDEX "wiki_articles_blocks_callout_order_idx" ON "payload"."wiki_articles_blocks_callout" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_callout_parent_id_idx" ON "payload"."wiki_articles_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_callout_path_idx" ON "payload"."wiki_articles_blocks_callout" USING btree ("_path");
  CREATE INDEX "wiki_articles_blocks_gallery_images_order_idx" ON "payload"."wiki_articles_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_gallery_images_parent_id_idx" ON "payload"."wiki_articles_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_gallery_images_image_idx" ON "payload"."wiki_articles_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "wiki_articles_blocks_gallery_order_idx" ON "payload"."wiki_articles_blocks_gallery" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_gallery_parent_id_idx" ON "payload"."wiki_articles_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_gallery_path_idx" ON "payload"."wiki_articles_blocks_gallery" USING btree ("_path");
  CREATE INDEX "wiki_articles_blocks_stat_row_items_order_idx" ON "payload"."wiki_articles_blocks_stat_row_items" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_stat_row_items_parent_id_idx" ON "payload"."wiki_articles_blocks_stat_row_items" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_stat_row_order_idx" ON "payload"."wiki_articles_blocks_stat_row" USING btree ("_order");
  CREATE INDEX "wiki_articles_blocks_stat_row_parent_id_idx" ON "payload"."wiki_articles_blocks_stat_row" USING btree ("_parent_id");
  CREATE INDEX "wiki_articles_blocks_stat_row_path_idx" ON "payload"."wiki_articles_blocks_stat_row" USING btree ("_path");
  CREATE UNIQUE INDEX "wiki_articles_slug_idx" ON "payload"."wiki_articles" USING btree ("slug");
  CREATE INDEX "wiki_articles_category_idx" ON "payload"."wiki_articles" USING btree ("category_id");
  CREATE INDEX "wiki_articles_seo_seo_image_idx" ON "payload"."wiki_articles" USING btree ("seo_image_id");
  CREATE INDEX "wiki_articles_updated_at_idx" ON "payload"."wiki_articles" USING btree ("updated_at");
  CREATE INDEX "wiki_articles_created_at_idx" ON "payload"."wiki_articles" USING btree ("created_at");
  CREATE INDEX "wiki_articles__status_idx" ON "payload"."wiki_articles" USING btree ("_status");
  CREATE INDEX "wiki_articles_rels_order_idx" ON "payload"."wiki_articles_rels" USING btree ("order");
  CREATE INDEX "wiki_articles_rels_parent_idx" ON "payload"."wiki_articles_rels" USING btree ("parent_id");
  CREATE INDEX "wiki_articles_rels_path_idx" ON "payload"."wiki_articles_rels" USING btree ("path");
  CREATE INDEX "wiki_articles_rels_wiki_articles_id_idx" ON "payload"."wiki_articles_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "wiki_articles_rels_wiki_factions_id_idx" ON "payload"."wiki_articles_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "wiki_articles_rels_wiki_gods_id_idx" ON "payload"."wiki_articles_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "wiki_articles_rels_wiki_regions_id_idx" ON "payload"."wiki_articles_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "_wiki_articles_v_blocks_reading_panel_order_idx" ON "payload"."_wiki_articles_v_blocks_reading_panel" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_reading_panel_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_reading_panel_path_idx" ON "payload"."_wiki_articles_v_blocks_reading_panel" USING btree ("_path");
  CREATE INDEX "_wiki_articles_v_blocks_quote_order_idx" ON "payload"."_wiki_articles_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_quote_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_quote_path_idx" ON "payload"."_wiki_articles_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_wiki_articles_v_blocks_callout_order_idx" ON "payload"."_wiki_articles_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_callout_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_callout_path_idx" ON "payload"."_wiki_articles_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_images_order_idx" ON "payload"."_wiki_articles_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_images_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_images_image_idx" ON "payload"."_wiki_articles_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_order_idx" ON "payload"."_wiki_articles_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_gallery_path_idx" ON "payload"."_wiki_articles_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_wiki_articles_v_blocks_stat_row_items_order_idx" ON "payload"."_wiki_articles_v_blocks_stat_row_items" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_stat_row_items_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_stat_row_items" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_stat_row_order_idx" ON "payload"."_wiki_articles_v_blocks_stat_row" USING btree ("_order");
  CREATE INDEX "_wiki_articles_v_blocks_stat_row_parent_id_idx" ON "payload"."_wiki_articles_v_blocks_stat_row" USING btree ("_parent_id");
  CREATE INDEX "_wiki_articles_v_blocks_stat_row_path_idx" ON "payload"."_wiki_articles_v_blocks_stat_row" USING btree ("_path");
  CREATE INDEX "_wiki_articles_v_parent_idx" ON "payload"."_wiki_articles_v" USING btree ("parent_id");
  CREATE INDEX "_wiki_articles_v_version_version_slug_idx" ON "payload"."_wiki_articles_v" USING btree ("version_slug");
  CREATE INDEX "_wiki_articles_v_version_version_category_idx" ON "payload"."_wiki_articles_v" USING btree ("version_category_id");
  CREATE INDEX "_wiki_articles_v_version_seo_version_seo_image_idx" ON "payload"."_wiki_articles_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_wiki_articles_v_version_version_updated_at_idx" ON "payload"."_wiki_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_wiki_articles_v_version_version_created_at_idx" ON "payload"."_wiki_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_wiki_articles_v_version_version__status_idx" ON "payload"."_wiki_articles_v" USING btree ("version__status");
  CREATE INDEX "_wiki_articles_v_created_at_idx" ON "payload"."_wiki_articles_v" USING btree ("created_at");
  CREATE INDEX "_wiki_articles_v_updated_at_idx" ON "payload"."_wiki_articles_v" USING btree ("updated_at");
  CREATE INDEX "_wiki_articles_v_latest_idx" ON "payload"."_wiki_articles_v" USING btree ("latest");
  CREATE INDEX "_wiki_articles_v_rels_order_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("order");
  CREATE INDEX "_wiki_articles_v_rels_parent_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_wiki_articles_v_rels_path_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("path");
  CREATE INDEX "_wiki_articles_v_rels_wiki_articles_id_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "_wiki_articles_v_rels_wiki_factions_id_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "_wiki_articles_v_rels_wiki_gods_id_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "_wiki_articles_v_rels_wiki_regions_id_idx" ON "payload"."_wiki_articles_v_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "wiki_regions_locations_order_idx" ON "payload"."wiki_regions_locations" USING btree ("_order");
  CREATE INDEX "wiki_regions_locations_parent_id_idx" ON "payload"."wiki_regions_locations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "wiki_regions_slug_idx" ON "payload"."wiki_regions" USING btree ("slug");
  CREATE INDEX "wiki_regions_map_idx" ON "payload"."wiki_regions" USING btree ("map_id");
  CREATE INDEX "wiki_regions_seo_seo_image_idx" ON "payload"."wiki_regions" USING btree ("seo_image_id");
  CREATE INDEX "wiki_regions_updated_at_idx" ON "payload"."wiki_regions" USING btree ("updated_at");
  CREATE INDEX "wiki_regions_created_at_idx" ON "payload"."wiki_regions" USING btree ("created_at");
  CREATE INDEX "wiki_regions__status_idx" ON "payload"."wiki_regions" USING btree ("_status");
  CREATE INDEX "wiki_regions_rels_order_idx" ON "payload"."wiki_regions_rels" USING btree ("order");
  CREATE INDEX "wiki_regions_rels_parent_idx" ON "payload"."wiki_regions_rels" USING btree ("parent_id");
  CREATE INDEX "wiki_regions_rels_path_idx" ON "payload"."wiki_regions_rels" USING btree ("path");
  CREATE INDEX "wiki_regions_rels_wiki_factions_id_idx" ON "payload"."wiki_regions_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "wiki_regions_rels_wiki_articles_id_idx" ON "payload"."wiki_regions_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "wiki_regions_rels_wiki_gods_id_idx" ON "payload"."wiki_regions_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "wiki_regions_rels_wiki_regions_id_idx" ON "payload"."wiki_regions_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "_wiki_regions_v_version_locations_order_idx" ON "payload"."_wiki_regions_v_version_locations" USING btree ("_order");
  CREATE INDEX "_wiki_regions_v_version_locations_parent_id_idx" ON "payload"."_wiki_regions_v_version_locations" USING btree ("_parent_id");
  CREATE INDEX "_wiki_regions_v_parent_idx" ON "payload"."_wiki_regions_v" USING btree ("parent_id");
  CREATE INDEX "_wiki_regions_v_version_version_slug_idx" ON "payload"."_wiki_regions_v" USING btree ("version_slug");
  CREATE INDEX "_wiki_regions_v_version_version_map_idx" ON "payload"."_wiki_regions_v" USING btree ("version_map_id");
  CREATE INDEX "_wiki_regions_v_version_seo_version_seo_image_idx" ON "payload"."_wiki_regions_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_wiki_regions_v_version_version_updated_at_idx" ON "payload"."_wiki_regions_v" USING btree ("version_updated_at");
  CREATE INDEX "_wiki_regions_v_version_version_created_at_idx" ON "payload"."_wiki_regions_v" USING btree ("version_created_at");
  CREATE INDEX "_wiki_regions_v_version_version__status_idx" ON "payload"."_wiki_regions_v" USING btree ("version__status");
  CREATE INDEX "_wiki_regions_v_created_at_idx" ON "payload"."_wiki_regions_v" USING btree ("created_at");
  CREATE INDEX "_wiki_regions_v_updated_at_idx" ON "payload"."_wiki_regions_v" USING btree ("updated_at");
  CREATE INDEX "_wiki_regions_v_latest_idx" ON "payload"."_wiki_regions_v" USING btree ("latest");
  CREATE INDEX "_wiki_regions_v_rels_order_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("order");
  CREATE INDEX "_wiki_regions_v_rels_parent_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_wiki_regions_v_rels_path_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("path");
  CREATE INDEX "_wiki_regions_v_rels_wiki_factions_id_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "_wiki_regions_v_rels_wiki_articles_id_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "_wiki_regions_v_rels_wiki_gods_id_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "_wiki_regions_v_rels_wiki_regions_id_idx" ON "payload"."_wiki_regions_v_rels" USING btree ("wiki_regions_id");
  CREATE UNIQUE INDEX "wiki_factions_slug_idx" ON "payload"."wiki_factions" USING btree ("slug");
  CREATE INDEX "wiki_factions_sigil_idx" ON "payload"."wiki_factions" USING btree ("sigil_id");
  CREATE INDEX "wiki_factions_region_idx" ON "payload"."wiki_factions" USING btree ("region_id");
  CREATE INDEX "wiki_factions_seo_seo_image_idx" ON "payload"."wiki_factions" USING btree ("seo_image_id");
  CREATE INDEX "wiki_factions_updated_at_idx" ON "payload"."wiki_factions" USING btree ("updated_at");
  CREATE INDEX "wiki_factions_created_at_idx" ON "payload"."wiki_factions" USING btree ("created_at");
  CREATE INDEX "wiki_factions__status_idx" ON "payload"."wiki_factions" USING btree ("_status");
  CREATE INDEX "wiki_factions_rels_order_idx" ON "payload"."wiki_factions_rels" USING btree ("order");
  CREATE INDEX "wiki_factions_rels_parent_idx" ON "payload"."wiki_factions_rels" USING btree ("parent_id");
  CREATE INDEX "wiki_factions_rels_path_idx" ON "payload"."wiki_factions_rels" USING btree ("path");
  CREATE INDEX "wiki_factions_rels_wiki_articles_id_idx" ON "payload"."wiki_factions_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "wiki_factions_rels_wiki_factions_id_idx" ON "payload"."wiki_factions_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "wiki_factions_rels_wiki_gods_id_idx" ON "payload"."wiki_factions_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "wiki_factions_rels_wiki_regions_id_idx" ON "payload"."wiki_factions_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "_wiki_factions_v_parent_idx" ON "payload"."_wiki_factions_v" USING btree ("parent_id");
  CREATE INDEX "_wiki_factions_v_version_version_slug_idx" ON "payload"."_wiki_factions_v" USING btree ("version_slug");
  CREATE INDEX "_wiki_factions_v_version_version_sigil_idx" ON "payload"."_wiki_factions_v" USING btree ("version_sigil_id");
  CREATE INDEX "_wiki_factions_v_version_version_region_idx" ON "payload"."_wiki_factions_v" USING btree ("version_region_id");
  CREATE INDEX "_wiki_factions_v_version_seo_version_seo_image_idx" ON "payload"."_wiki_factions_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_wiki_factions_v_version_version_updated_at_idx" ON "payload"."_wiki_factions_v" USING btree ("version_updated_at");
  CREATE INDEX "_wiki_factions_v_version_version_created_at_idx" ON "payload"."_wiki_factions_v" USING btree ("version_created_at");
  CREATE INDEX "_wiki_factions_v_version_version__status_idx" ON "payload"."_wiki_factions_v" USING btree ("version__status");
  CREATE INDEX "_wiki_factions_v_created_at_idx" ON "payload"."_wiki_factions_v" USING btree ("created_at");
  CREATE INDEX "_wiki_factions_v_updated_at_idx" ON "payload"."_wiki_factions_v" USING btree ("updated_at");
  CREATE INDEX "_wiki_factions_v_latest_idx" ON "payload"."_wiki_factions_v" USING btree ("latest");
  CREATE INDEX "_wiki_factions_v_rels_order_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("order");
  CREATE INDEX "_wiki_factions_v_rels_parent_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_wiki_factions_v_rels_path_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("path");
  CREATE INDEX "_wiki_factions_v_rels_wiki_articles_id_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "_wiki_factions_v_rels_wiki_factions_id_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "_wiki_factions_v_rels_wiki_gods_id_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "_wiki_factions_v_rels_wiki_regions_id_idx" ON "payload"."_wiki_factions_v_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "wiki_gods_domains_order_idx" ON "payload"."wiki_gods_domains" USING btree ("_order");
  CREATE INDEX "wiki_gods_domains_parent_id_idx" ON "payload"."wiki_gods_domains" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "wiki_gods_slug_idx" ON "payload"."wiki_gods" USING btree ("slug");
  CREATE INDEX "wiki_gods_symbol_idx" ON "payload"."wiki_gods" USING btree ("symbol_id");
  CREATE INDEX "wiki_gods_seo_seo_image_idx" ON "payload"."wiki_gods" USING btree ("seo_image_id");
  CREATE INDEX "wiki_gods_updated_at_idx" ON "payload"."wiki_gods" USING btree ("updated_at");
  CREATE INDEX "wiki_gods_created_at_idx" ON "payload"."wiki_gods" USING btree ("created_at");
  CREATE INDEX "wiki_gods__status_idx" ON "payload"."wiki_gods" USING btree ("_status");
  CREATE INDEX "wiki_gods_rels_order_idx" ON "payload"."wiki_gods_rels" USING btree ("order");
  CREATE INDEX "wiki_gods_rels_parent_idx" ON "payload"."wiki_gods_rels" USING btree ("parent_id");
  CREATE INDEX "wiki_gods_rels_path_idx" ON "payload"."wiki_gods_rels" USING btree ("path");
  CREATE INDEX "wiki_gods_rels_wiki_regions_id_idx" ON "payload"."wiki_gods_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "wiki_gods_rels_wiki_articles_id_idx" ON "payload"."wiki_gods_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "wiki_gods_rels_wiki_factions_id_idx" ON "payload"."wiki_gods_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "wiki_gods_rels_wiki_gods_id_idx" ON "payload"."wiki_gods_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "_wiki_gods_v_version_domains_order_idx" ON "payload"."_wiki_gods_v_version_domains" USING btree ("_order");
  CREATE INDEX "_wiki_gods_v_version_domains_parent_id_idx" ON "payload"."_wiki_gods_v_version_domains" USING btree ("_parent_id");
  CREATE INDEX "_wiki_gods_v_parent_idx" ON "payload"."_wiki_gods_v" USING btree ("parent_id");
  CREATE INDEX "_wiki_gods_v_version_version_slug_idx" ON "payload"."_wiki_gods_v" USING btree ("version_slug");
  CREATE INDEX "_wiki_gods_v_version_version_symbol_idx" ON "payload"."_wiki_gods_v" USING btree ("version_symbol_id");
  CREATE INDEX "_wiki_gods_v_version_seo_version_seo_image_idx" ON "payload"."_wiki_gods_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_wiki_gods_v_version_version_updated_at_idx" ON "payload"."_wiki_gods_v" USING btree ("version_updated_at");
  CREATE INDEX "_wiki_gods_v_version_version_created_at_idx" ON "payload"."_wiki_gods_v" USING btree ("version_created_at");
  CREATE INDEX "_wiki_gods_v_version_version__status_idx" ON "payload"."_wiki_gods_v" USING btree ("version__status");
  CREATE INDEX "_wiki_gods_v_created_at_idx" ON "payload"."_wiki_gods_v" USING btree ("created_at");
  CREATE INDEX "_wiki_gods_v_updated_at_idx" ON "payload"."_wiki_gods_v" USING btree ("updated_at");
  CREATE INDEX "_wiki_gods_v_latest_idx" ON "payload"."_wiki_gods_v" USING btree ("latest");
  CREATE INDEX "_wiki_gods_v_rels_order_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("order");
  CREATE INDEX "_wiki_gods_v_rels_parent_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("parent_id");
  CREATE INDEX "_wiki_gods_v_rels_path_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("path");
  CREATE INDEX "_wiki_gods_v_rels_wiki_regions_id_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "_wiki_gods_v_rels_wiki_articles_id_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "_wiki_gods_v_rels_wiki_factions_id_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "_wiki_gods_v_rels_wiki_gods_id_idx" ON "payload"."_wiki_gods_v_rels" USING btree ("wiki_gods_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_dispatches_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("dispatches_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_wiki_articles_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("wiki_articles_id");
  CREATE INDEX "payload_locked_documents_rels_wiki_regions_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("wiki_regions_id");
  CREATE INDEX "payload_locked_documents_rels_wiki_factions_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("wiki_factions_id");
  CREATE INDEX "payload_locked_documents_rels_wiki_gods_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("wiki_gods_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_order_idx" ON "payload"."site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "payload"."site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "payload"."site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "payload"."site_settings_social" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."pages_blocks_hero_actions" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero" CASCADE;
  DROP TABLE "payload"."pages_blocks_section_intro" CASCADE;
  DROP TABLE "payload"."pages_blocks_stat_row_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_stat_row" CASCADE;
  DROP TABLE "payload"."pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "payload"."pages_blocks_card_grid" CASCADE;
  DROP TABLE "payload"."pages_blocks_product_grid" CASCADE;
  DROP TABLE "payload"."pages_blocks_start_here_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_start_here" CASCADE;
  DROP TABLE "payload"."pages_blocks_reading_panel" CASCADE;
  DROP TABLE "payload"."pages_blocks_quote" CASCADE;
  DROP TABLE "payload"."pages_blocks_callout" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq" CASCADE;
  DROP TABLE "payload"."pages_blocks_gallery_images" CASCADE;
  DROP TABLE "payload"."pages_blocks_gallery" CASCADE;
  DROP TABLE "payload"."pages_blocks_newsletter" CASCADE;
  DROP TABLE "payload"."pages" CASCADE;
  DROP TABLE "payload"."pages_rels" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_actions" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_section_intro" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stat_row_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stat_row" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_product_grid" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_start_here_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_start_here" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_reading_panel" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_quote" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_callout" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "payload"."_pages_v" CASCADE;
  DROP TABLE "payload"."_pages_v_rels" CASCADE;
  DROP TABLE "payload"."dispatches" CASCADE;
  DROP TABLE "payload"."dispatches_rels" CASCADE;
  DROP TABLE "payload"."_dispatches_v" CASCADE;
  DROP TABLE "payload"."_dispatches_v_rels" CASCADE;
  DROP TABLE "payload"."products_gallery" CASCADE;
  DROP TABLE "payload"."products_store_links" CASCADE;
  DROP TABLE "payload"."products" CASCADE;
  DROP TABLE "payload"."_products_v_version_gallery" CASCADE;
  DROP TABLE "payload"."_products_v_version_store_links" CASCADE;
  DROP TABLE "payload"."_products_v" CASCADE;
  DROP TABLE "payload"."categories" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."subscribers" CASCADE;
  DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_reading_panel" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_quote" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_callout" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_gallery_images" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_gallery" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_stat_row_items" CASCADE;
  DROP TABLE "payload"."wiki_articles_blocks_stat_row" CASCADE;
  DROP TABLE "payload"."wiki_articles" CASCADE;
  DROP TABLE "payload"."wiki_articles_rels" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_reading_panel" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_quote" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_callout" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_gallery_images" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_gallery" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_stat_row_items" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_blocks_stat_row" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v" CASCADE;
  DROP TABLE "payload"."_wiki_articles_v_rels" CASCADE;
  DROP TABLE "payload"."wiki_regions_locations" CASCADE;
  DROP TABLE "payload"."wiki_regions" CASCADE;
  DROP TABLE "payload"."wiki_regions_rels" CASCADE;
  DROP TABLE "payload"."_wiki_regions_v_version_locations" CASCADE;
  DROP TABLE "payload"."_wiki_regions_v" CASCADE;
  DROP TABLE "payload"."_wiki_regions_v_rels" CASCADE;
  DROP TABLE "payload"."wiki_factions" CASCADE;
  DROP TABLE "payload"."wiki_factions_rels" CASCADE;
  DROP TABLE "payload"."_wiki_factions_v" CASCADE;
  DROP TABLE "payload"."_wiki_factions_v_rels" CASCADE;
  DROP TABLE "payload"."wiki_gods_domains" CASCADE;
  DROP TABLE "payload"."wiki_gods" CASCADE;
  DROP TABLE "payload"."wiki_gods_rels" CASCADE;
  DROP TABLE "payload"."_wiki_gods_v_version_domains" CASCADE;
  DROP TABLE "payload"."_wiki_gods_v" CASCADE;
  DROP TABLE "payload"."_wiki_gods_v_rels" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."site_settings_nav" CASCADE;
  DROP TABLE "payload"."site_settings_social" CASCADE;
  DROP TABLE "payload"."site_settings" CASCADE;
  DROP TYPE "payload"."enum_pages_blocks_hero_actions_variant";
  DROP TYPE "payload"."enum_pages_blocks_section_intro_align";
  DROP TYPE "payload"."enum_pages_blocks_callout_tone";
  DROP TYPE "payload"."enum_pages_status";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_actions_variant";
  DROP TYPE "payload"."enum__pages_v_blocks_section_intro_align";
  DROP TYPE "payload"."enum__pages_v_blocks_callout_tone";
  DROP TYPE "payload"."enum__pages_v_version_status";
  DROP TYPE "payload"."enum_dispatches_status";
  DROP TYPE "payload"."enum__dispatches_v_version_status";
  DROP TYPE "payload"."enum_products_store_links_platform";
  DROP TYPE "payload"."enum_products_tier";
  DROP TYPE "payload"."enum_products_content_kind";
  DROP TYPE "payload"."enum_products_game_system";
  DROP TYPE "payload"."enum_products_licence";
  DROP TYPE "payload"."enum_products_status";
  DROP TYPE "payload"."enum__products_v_version_store_links_platform";
  DROP TYPE "payload"."enum__products_v_version_tier";
  DROP TYPE "payload"."enum__products_v_version_content_kind";
  DROP TYPE "payload"."enum__products_v_version_game_system";
  DROP TYPE "payload"."enum__products_v_version_licence";
  DROP TYPE "payload"."enum__products_v_version_status";
  DROP TYPE "payload"."enum_categories_kind";
  DROP TYPE "payload"."enum_users_role";
  DROP TYPE "payload"."enum_wiki_articles_blocks_callout_tone";
  DROP TYPE "payload"."enum_wiki_articles_content_kind";
  DROP TYPE "payload"."enum_wiki_articles_game_system";
  DROP TYPE "payload"."enum_wiki_articles_licence";
  DROP TYPE "payload"."enum_wiki_articles_status";
  DROP TYPE "payload"."enum__wiki_articles_v_blocks_callout_tone";
  DROP TYPE "payload"."enum__wiki_articles_v_version_content_kind";
  DROP TYPE "payload"."enum__wiki_articles_v_version_game_system";
  DROP TYPE "payload"."enum__wiki_articles_v_version_licence";
  DROP TYPE "payload"."enum__wiki_articles_v_version_status";
  DROP TYPE "payload"."enum_wiki_regions_content_kind";
  DROP TYPE "payload"."enum_wiki_regions_game_system";
  DROP TYPE "payload"."enum_wiki_regions_licence";
  DROP TYPE "payload"."enum_wiki_regions_status";
  DROP TYPE "payload"."enum__wiki_regions_v_version_content_kind";
  DROP TYPE "payload"."enum__wiki_regions_v_version_game_system";
  DROP TYPE "payload"."enum__wiki_regions_v_version_licence";
  DROP TYPE "payload"."enum__wiki_regions_v_version_status";
  DROP TYPE "payload"."enum_wiki_factions_kind";
  DROP TYPE "payload"."enum_wiki_factions_content_kind";
  DROP TYPE "payload"."enum_wiki_factions_game_system";
  DROP TYPE "payload"."enum_wiki_factions_licence";
  DROP TYPE "payload"."enum_wiki_factions_status";
  DROP TYPE "payload"."enum__wiki_factions_v_version_kind";
  DROP TYPE "payload"."enum__wiki_factions_v_version_content_kind";
  DROP TYPE "payload"."enum__wiki_factions_v_version_game_system";
  DROP TYPE "payload"."enum__wiki_factions_v_version_licence";
  DROP TYPE "payload"."enum__wiki_factions_v_version_status";
  DROP TYPE "payload"."enum_wiki_gods_divine_status";
  DROP TYPE "payload"."enum_wiki_gods_content_kind";
  DROP TYPE "payload"."enum_wiki_gods_game_system";
  DROP TYPE "payload"."enum_wiki_gods_licence";
  DROP TYPE "payload"."enum_wiki_gods_status";
  DROP TYPE "payload"."enum__wiki_gods_v_version_divine_status";
  DROP TYPE "payload"."enum__wiki_gods_v_version_content_kind";
  DROP TYPE "payload"."enum__wiki_gods_v_version_game_system";
  DROP TYPE "payload"."enum__wiki_gods_v_version_licence";
  DROP TYPE "payload"."enum__wiki_gods_v_version_status";
  DROP TYPE "payload"."enum_site_settings_social_platform";`)
}
