import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const panicPages = sqliteTable("panic_pages", {
  id: text().primaryKey(),
  channel: text().notNull(),
  issue: text().notNull(),
  contact: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
})
