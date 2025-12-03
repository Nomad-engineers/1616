import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"plan_id" integer,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "header_items" DROP CONSTRAINT "header_items_page_id_pages_id_fk";
  
  DROP INDEX "header_items_page_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
  ALTER TABLE "header_items" ADD COLUMN "text" varchar;
  ALTER TABLE "header_items" ADD COLUMN "url" varchar;
  ALTER TABLE "header" ADD COLUMN "button_text" varchar;
  ALTER TABLE "header" ADD COLUMN "button_url" varchar;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "forms_plan_idx" ON "forms" USING btree ("plan_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  ALTER TABLE "header_items" DROP COLUMN "page_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forms" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "forms" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  DROP INDEX "payload_locked_documents_rels_forms_id_idx";
  ALTER TABLE "header_items" ADD COLUMN "page_id" varchar NOT NULL;
  ALTER TABLE "header_items" ADD CONSTRAINT "header_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_items_page_idx" ON "header_items" USING btree ("page_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "forms_id";
  ALTER TABLE "header_items" DROP COLUMN "text";
  ALTER TABLE "header_items" DROP COLUMN "url";
  ALTER TABLE "header" DROP COLUMN "button_text";
  ALTER TABLE "header" DROP COLUMN "button_url";`)
}
