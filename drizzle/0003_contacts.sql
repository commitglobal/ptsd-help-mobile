CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY NOT NULL,
	`contact_ids` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
