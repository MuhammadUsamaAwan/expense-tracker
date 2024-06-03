ALTER TABLE "expense_tacker_templates" ADD COLUMN "username" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_tacker_templates" ADD CONSTRAINT "expense_tacker_templates_username_expense_tacker_users_username_fk" FOREIGN KEY ("username") REFERENCES "public"."expense_tacker_users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
