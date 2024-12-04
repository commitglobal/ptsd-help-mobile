CREATE TABLE `sleep_activities` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`favorites` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
