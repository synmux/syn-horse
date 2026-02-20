CREATE TABLE `redirects` (
	`slug` text PRIMARY KEY NOT NULL,
	`destination` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `redirects_slug_unique` ON `redirects` (`slug`);