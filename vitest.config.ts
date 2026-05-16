import { defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config"

export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations("./migrations")
  return {
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
            bindings: { TEST_MIGRATIONS: migrations },
          },
        },
      },
    },
  }
})
