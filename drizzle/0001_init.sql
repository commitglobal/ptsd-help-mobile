CREATE TABLE `rid` (
	`id` integer PRIMARY KEY NOT NULL,
	`trigger` text NOT NULL,
	`difference` text NOT NULL,
	`decision` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
