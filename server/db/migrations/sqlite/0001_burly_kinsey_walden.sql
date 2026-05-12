ALTER TABLE `panic_pages` ADD `notificationStatus` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `notificationError` text;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `notificationMessageId` text;--> statement-breakpoint
ALTER TABLE `panic_pages` ADD `notifiedAt` integer;