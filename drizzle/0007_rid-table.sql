CREATE TABLE `rid` (
	`id` integer PRIMARY KEY NOT NULL,
	`trigger` text,
	`difference` text,
	`decision` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
