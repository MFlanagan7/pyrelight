import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Renames the legal document slug "content-licence" to "content-license".
 *
 * Hand-edited after generation. Payload's generated version converted the
 * column to text, dropped the enum, recreated it without the old value, and
 * cast back — which fails on the published row still holding "content-licence",
 * because that value no longer exists in the type.
 *
 * The UPDATE statements below sit in the window where the column is plain text
 * and therefore unconstrained. Postgres cannot rename an enum value in place
 * while rows depend on it, so this drop-and-recreate is the shape the change
 * has to take; the data just has to move inside it.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload"."legal_documents" ALTER COLUMN "slug" SET DATA TYPE text;
  UPDATE "payload"."legal_documents" SET "slug" = 'content-license' WHERE "slug" = 'content-licence';
  DROP TYPE "payload"."enum_legal_documents_slug";
  CREATE TYPE "payload"."enum_legal_documents_slug" AS ENUM('legal', 'privacy', 'content-license');
  ALTER TABLE "payload"."legal_documents" ALTER COLUMN "slug" SET DATA TYPE "payload"."enum_legal_documents_slug" USING "slug"::"payload"."enum_legal_documents_slug";

  ALTER TABLE "payload"."_legal_documents_v" ALTER COLUMN "version_slug" SET DATA TYPE text;
  UPDATE "payload"."_legal_documents_v" SET "version_slug" = 'content-license' WHERE "version_slug" = 'content-licence';
  DROP TYPE "payload"."enum__legal_documents_v_version_slug";
  CREATE TYPE "payload"."enum__legal_documents_v_version_slug" AS ENUM('legal', 'privacy', 'content-license');
  ALTER TABLE "payload"."_legal_documents_v" ALTER COLUMN "version_slug" SET DATA TYPE "payload"."enum__legal_documents_v_version_slug" USING "version_slug"::"payload"."enum__legal_documents_v_version_slug";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload"."legal_documents" ALTER COLUMN "slug" SET DATA TYPE text;
  UPDATE "payload"."legal_documents" SET "slug" = 'content-licence' WHERE "slug" = 'content-license';
  DROP TYPE "payload"."enum_legal_documents_slug";
  CREATE TYPE "payload"."enum_legal_documents_slug" AS ENUM('legal', 'privacy', 'content-licence');
  ALTER TABLE "payload"."legal_documents" ALTER COLUMN "slug" SET DATA TYPE "payload"."enum_legal_documents_slug" USING "slug"::"payload"."enum_legal_documents_slug";

  ALTER TABLE "payload"."_legal_documents_v" ALTER COLUMN "version_slug" SET DATA TYPE text;
  UPDATE "payload"."_legal_documents_v" SET "version_slug" = 'content-licence' WHERE "version_slug" = 'content-license';
  DROP TYPE "payload"."enum__legal_documents_v_version_slug";
  CREATE TYPE "payload"."enum__legal_documents_v_version_slug" AS ENUM('legal', 'privacy', 'content-licence');
  ALTER TABLE "payload"."_legal_documents_v" ALTER COLUMN "version_slug" SET DATA TYPE "payload"."enum__legal_documents_v_version_slug" USING "version_slug"::"payload"."enum__legal_documents_v_version_slug";`)
}
