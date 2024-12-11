CREATE TABLE `favourites` (
	`id` integer PRIMARY KEY NOT NULL,
	`toolId` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
