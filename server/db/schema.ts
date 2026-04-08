import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const redirects = sqliteTable("redirects", {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull(),
  destination: text().notNull().unique(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
})
