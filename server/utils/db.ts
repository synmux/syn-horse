import { drizzle } from "drizzle-orm/d1"
import type { H3Event } from "h3"

import * as schema from "~~/server/db/schema"

export const useDb = (event: H3Event) => drizzle(event.context.cloudflare.env.DB, { schema })
