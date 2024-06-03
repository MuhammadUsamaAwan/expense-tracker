CREATE TABLE IF NOT EXISTS "expense_tacker_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expense_tacker_expenses" ALTER COLUMN "date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "expense_tacker_expenses" ADD COLUMN "templateId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_tacker_expenses" ADD CONSTRAINT "expense_tacker_expenses_templateId_expense_tacker_templates_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."expense_tacker_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
