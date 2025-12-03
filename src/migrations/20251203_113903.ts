import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "plans" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_package_card_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_package_card_features" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_package_card_features" CASCADE;
  DROP TABLE "_pages_v_blocks_package_card_features" CASCADE;
  ALTER TABLE "pages_blocks_package_card" ADD COLUMN "plan_id" integer;
  ALTER TABLE "pages_blocks_package_card" ADD COLUMN "is_primary" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_section" ADD COLUMN "slug" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_package_card" ADD COLUMN "plan_id" integer;
  ALTER TABLE "_pages_v_blocks_package_card" ADD COLUMN "is_primary" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "slug" varchar DEFAULT '';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "plans_id" integer;
  ALTER TABLE "plans_features" ADD CONSTRAINT "plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "plans_features_order_idx" ON "plans_features" USING btree ("_order");
  CREATE INDEX "plans_features_parent_id_idx" ON "plans_features" USING btree ("_parent_id");
  CREATE INDEX "plans_updated_at_idx" ON "plans" USING btree ("updated_at");
  CREATE INDEX "plans_created_at_idx" ON "plans" USING btree ("created_at");
  ALTER TABLE "pages_blocks_package_card" ADD CONSTRAINT "pages_blocks_package_card_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_package_card" ADD CONSTRAINT "_pages_v_blocks_package_card_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_package_card_plan_idx" ON "pages_blocks_package_card" USING btree ("plan_id");
  CREATE INDEX "_pages_v_blocks_package_card_plan_idx" ON "_pages_v_blocks_package_card" USING btree ("plan_id");
  CREATE INDEX "payload_locked_documents_rels_plans_id_idx" ON "payload_locked_documents_rels" USING btree ("plans_id");
  ALTER TABLE "pages_blocks_package_card" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_package_card" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_package_card" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_package_card" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_package_card" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_package_card" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_package_card_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_package_card_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "plans" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "plans_features" CASCADE;
  DROP TABLE "plans" CASCADE;
  ALTER TABLE "pages_blocks_package_card" DROP CONSTRAINT "pages_blocks_package_card_plan_id_plans_id_fk";
  
  ALTER TABLE "_pages_v_blocks_package_card" DROP CONSTRAINT "_pages_v_blocks_package_card_plan_id_plans_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_plans_fk";
  
  DROP INDEX "pages_blocks_package_card_plan_idx";
  DROP INDEX "_pages_v_blocks_package_card_plan_idx";
  DROP INDEX "payload_locked_documents_rels_plans_id_idx";
  ALTER TABLE "pages_blocks_package_card" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_package_card" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_package_card" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_package_card" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_package_card" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_package_card" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_package_card_features" ADD CONSTRAINT "pages_blocks_package_card_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_package_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_package_card_features" ADD CONSTRAINT "_pages_v_blocks_package_card_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_package_card"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_package_card_features_order_idx" ON "pages_blocks_package_card_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_package_card_features_parent_id_idx" ON "pages_blocks_package_card_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_package_card_features_order_idx" ON "_pages_v_blocks_package_card_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_package_card_features_parent_id_idx" ON "_pages_v_blocks_package_card_features" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_package_card" DROP COLUMN "plan_id";
  ALTER TABLE "pages_blocks_package_card" DROP COLUMN "is_primary";
  ALTER TABLE "pages_blocks_section" DROP COLUMN "slug";
  ALTER TABLE "_pages_v_blocks_package_card" DROP COLUMN "plan_id";
  ALTER TABLE "_pages_v_blocks_package_card" DROP COLUMN "is_primary";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "plans_id";`)
}
