CREATE TABLE `i_worry` (
	`id` integer PRIMARY KEY NOT NULL,
	`worry` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
