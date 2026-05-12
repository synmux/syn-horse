CREATE TABLE `panic_pages` (
	`id` text PRIMARY KEY NOT NULL,
	`channel` text NOT NULL,
	`issue` text NOT NULL,
	`contact` text NOT NULL,
	`createdAt` integer NOT NULL
);
