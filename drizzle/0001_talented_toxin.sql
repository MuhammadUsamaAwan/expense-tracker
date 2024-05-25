ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "date" SET NOT NULL;