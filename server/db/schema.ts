import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const panicPages = sqliteTable("panic_pages", {
  id: text().primaryKey(),
  channel: text({ enum: ["red", "green"] }).notNull(),
  issue: text().notNull(),
  contact: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  notificationStatus: text({ enum: ["pending", "sent", "failed"] })
    .notNull()
    .default("pending"),
  notificationError: text(),
  notificationMessageId: text(),
  notifiedAt: integer({ mode: "timestamp" }),
})

export type Channel = (typeof panicPages.$inferSelect)["channel"]
export type NotificationStatus = (typeof panicPages.$inferSelect)["notificationStatus"]
