CREATE TABLE `feelings` (
	`id` integer PRIMARY KEY NOT NULL,
	`feelings` text NOT NULL,
	`discomfort` integer NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `i_message` (
	`id` integer PRIMARY KEY NOT NULL,
	`annoyance` text,
	`message` text,
	`because` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `sleep_activities` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`favorites` text,
	`reminder_time` integer DEFAULT NULL,
	`notification_id` text DEFAULT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `worries` (
	`id` integer PRIMARY KEY NOT NULL,
	`worry` text,
	`reminder_enabled` integer DEFAULT false,
	`reminder_time` integer,
	`notification_id` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
