import { defineCollection, defineContentConfig } from "@nuxt/content"
import { z } from "zod"

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: "page",
      source: {
        include: "blog/**.md",
        prefix: "/blog",
      },
      schema: z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        title: z.string().min(2).max(100),
        slug: z.string().optional(),
        snippet: z.string().optional(),
        tags: z.array(z.string().min(2).max(30)).optional().default([]),
      }),
    }),
  },
})
