import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        include: "blog/**.md",
        prefix: "/blog",
      },
      schema: z.object({
        path: z.string().regex(/^\/blog\/[a-z0-9-]+$/),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        title: z.string().min(2).max(100),
        description: z.string().min(10).max(280),
        tags: z.array(z.string().min(2).max(30)).default([]),
        read: z.string().regex(/^\d+ min$/),
        future: z.boolean().default(false),
      }),
    }),
  },
});
