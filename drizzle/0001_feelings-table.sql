CREATE TABLE `feelings` (
	`id` integer PRIMARY KEY NOT NULL,
	`feelings` text NOT NULL,
	`disconfort` integer NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
