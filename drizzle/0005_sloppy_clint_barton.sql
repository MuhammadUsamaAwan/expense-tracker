ALTER TABLE "categories" RENAME TO "expense_tacker_categories";--> statement-breakpoint
ALTER TABLE "expenses" RENAME TO "expense_tacker_expenses";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "expense_tacker_users";--> statement-breakpoint
ALTER TABLE "expense_tacker_categories" DROP CONSTRAINT "categories_username_users_username_fk";
--> statement-breakpoint
ALTER TABLE "expense_tacker_expenses" DROP CONSTRAINT "expenses_category_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "expense_tacker_expenses" DROP CONSTRAINT "expenses_username_users_username_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_tacker_categories" ADD CONSTRAINT "expense_tacker_categories_username_expense_tacker_users_username_fk" FOREIGN KEY ("username") REFERENCES "public"."expense_tacker_users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_tacker_expenses" ADD CONSTRAINT "expense_tacker_expenses_category_expense_tacker_categories_id_fk" FOREIGN KEY ("category") REFERENCES "public"."expense_tacker_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_tacker_expenses" ADD CONSTRAINT "expense_tacker_expenses_username_expense_tacker_users_username_fk" FOREIGN KEY ("username") REFERENCES "public"."expense_tacker_users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
