import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const panicPages = sqliteTable("panic_pages", {
  id: text().primaryKey(),
  channel: text({ enum: ["red", "green"] }).notNull(),
  message: text().notNull(),
  contact: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  status: text({ enum: ["queued", "send_failed"] }).notNull(),
  queueError: text(),
  queuedAt: integer({ mode: "timestamp" }),
})

export type Channel = (typeof panicPages.$inferSelect)["channel"]
export type PageStatus = (typeof panicPages.$inferSelect)["status"]
