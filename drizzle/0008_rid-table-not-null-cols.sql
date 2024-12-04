PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rid` (
	`id` integer PRIMARY KEY NOT NULL,
	`trigger` text NOT NULL,
	`difference` text NOT NULL,
	`decision` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_rid`("id", "trigger", "difference", "decision", "updated_at", "created_at", "deleted_at") SELECT "id", "trigger", "difference", "decision", "updated_at", "created_at", "deleted_at" FROM `rid`;--> statement-breakpoint
DROP TABLE `rid`;--> statement-breakpoint
ALTER TABLE `__new_rid` RENAME TO `rid`;--> statement-breakpoint
PRAGMA foreign_keys=ON;