CREATE TABLE `announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`content` text NOT NULL,
	`author` varchar(120) NOT NULL,
	`label` varchar(40) NOT NULL DEFAULT 'COMUNICADO',
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `approval_reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reportType` enum('members','economy','approvers') NOT NULL,
	`title` varchar(180) NOT NULL,
	`approvalNumber` varchar(80),
	`approvedBy` varchar(120),
	`details` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `approval_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portal_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`displayName` varchar(120) NOT NULL,
	`handle` varchar(80) NOT NULL,
	`rank` varchar(120) NOT NULL,
	`kind` enum('member','staff') NOT NULL DEFAULT 'member',
	`gameUsername` varchar(80),
	`avatarUrl` text,
	`mojangConnected` int NOT NULL DEFAULT 0,
	`discordConnected` int NOT NULL DEFAULT 0,
	`isOnline` int NOT NULL DEFAULT 0,
	`lastSeen` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portal_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_members_handle_unique` UNIQUE(`handle`)
);
