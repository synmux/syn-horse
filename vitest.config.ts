import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config"
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

type D1Migration = { name: string; queries: string[] }

async function loadMigrations(dir: string): Promise<D1Migration[]> {
  const names = (await readdir(dir)).filter((name) => name.endsWith(".sql")).sort()
  return Promise.all(
    names.map(async (name) => ({
      name,
      queries: [await readFile(join(dir, name), "utf8")],
    })),
  )
}

export default defineWorkersConfig(async () => {
  const migrations = await loadMigrations("./migrations")
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
