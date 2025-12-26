CREATE TABLE `diaryHistoryRecords` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`comment` text
);
--> statement-breakpoint
CREATE TABLE `diaryHistoryRecords_to_symptoms` (
	`diaryHistoryRecord_id` text NOT NULL,
	`symptom_id` text NOT NULL,
	`strengtOfPain` integer NOT NULL,
	PRIMARY KEY(`diaryHistoryRecord_id`, `symptom_id`),
	FOREIGN KEY (`diaryHistoryRecord_id`) REFERENCES `diaryHistoryRecords`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`symptom_id`) REFERENCES `symptoms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `symptoms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
