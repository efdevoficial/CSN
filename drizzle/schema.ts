import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Core user table backing the Manus OAuth session. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const portalMembers = mysqlTable("portal_members", {
  id: int("id").autoincrement().primaryKey(),
  displayName: varchar("displayName", { length: 120 }).notNull(),
  handle: varchar("handle", { length: 80 }).notNull().unique(),
  rank: varchar("rank", { length: 120 }).notNull(),
  kind: mysqlEnum("kind", ["member", "staff"]).default("member").notNull(),
  gameUsername: varchar("gameUsername", { length: 80 }),
  avatarUrl: text("avatarUrl"),
  mojangConnected: int("mojangConnected").default(0).notNull(),
  discordConnected: int("discordConnected").default(0).notNull(),
  isOnline: int("isOnline").default(0).notNull(),
  lastSeen: timestamp("lastSeen").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  content: text("content").notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  label: varchar("label", { length: 40 }).default("COMUNICADO").notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const approvalReports = mysqlTable("approval_reports", {
  id: int("id").autoincrement().primaryKey(),
  reportType: mysqlEnum("reportType", ["members", "economy", "approvers"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  approvalNumber: varchar("approvalNumber", { length: 80 }),
  approvedBy: varchar("approvedBy", { length: 120 }),
  details: text("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type PortalMember = typeof portalMembers.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;
export type ApprovalReport = typeof approvalReports.$inferSelect;
