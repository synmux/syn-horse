import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const redirects = sqliteTable("redirects", {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull(),
  destination: text().notNull().unique(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
})

export const panicPages = sqliteTable("panic_pages", {
  id: text().primaryKey(),
  channel: text().notNull(),
  priority: text().notNull(),
  issue: text().notNull(),
  contact: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
})
