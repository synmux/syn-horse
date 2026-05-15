import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config"

export default defineWorkersConfig({
  test: {
    include: ["test/**/*.test.ts"],
    poolOptions: {
      workers: {
        isolatedStorage: true,
        miniflare: {
          compatibilityDate: "2025-10-11",
          compatibilityFlags: ["nodejs_compat_v2"],
          d1Databases: ["DB"],
          kvNamespaces: ["KV"],
        },
      },
    },
  },
})
