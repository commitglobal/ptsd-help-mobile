CREATE TABLE `strengths` (
	`id` integer PRIMARY KEY NOT NULL,
	`strength` text,
	`image` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
