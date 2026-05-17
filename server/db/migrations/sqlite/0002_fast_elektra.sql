DELETE FROM `panic_pages`;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `message` text NOT NULL;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `status` text NOT NULL;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `queueError` text;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `queuedAt` integer;--> statement-breakpoint
ALTER TABLE `panic_pages` DROP COLUMN `issue`;--> statement-breakpoint
ALTER TABLE `panic_pages` DROP COLUMN `notificationStatus`;--> statement-breakpoint
ALTER TABLE `panic_pages` DROP COLUMN `notificationError`;--> statement-breakpoint
ALTER TABLE `panic_pages` DROP COLUMN `notificationMessageId`;--> statement-breakpoint
ALTER TABLE `panic_pages` DROP COLUMN `notifiedAt`;