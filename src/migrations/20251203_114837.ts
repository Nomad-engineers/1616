import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" ALTER COLUMN "slug" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "slug" DROP DEFAULT;
  CREATE UNIQUE INDEX "pages_blocks_section_slug_idx" ON "pages_blocks_section" USING btree ("slug");
  CREATE INDEX "_pages_v_blocks_section_slug_idx" ON "_pages_v_blocks_section" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_blocks_section_slug_idx";
  DROP INDEX "_pages_v_blocks_section_slug_idx";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "slug" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "slug" SET DEFAULT '';`)
}
