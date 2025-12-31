ALTER TABLE "scheduleAvailabilities" ALTER COLUMN "dayOfWeek" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."day";--> statement-breakpoint
CREATE TYPE "public"."day" AS ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo');--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ALTER COLUMN "dayOfWeek" SET DATA TYPE "public"."day" USING "dayOfWeek"::"public"."day";--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "description" SET NOT NULL;