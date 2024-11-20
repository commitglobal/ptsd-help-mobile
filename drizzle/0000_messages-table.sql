CREATE TABLE `i_message` (
	`id` integer PRIMARY KEY NOT NULL,
	`annoyance` text,
	`message` text,
	`because` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
