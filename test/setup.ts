import { applyD1Migrations, env } from "cloudflare:test"
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

export async function migrate(): Promise<void> {
  const dir = "./migrations"
  const files = (await readdir(dir)).filter((name) => name.endsWith(".sql")).sort()
  const migrations = await Promise.all(
    files.map(async (name) => ({
      name,
      queries: [await readFile(join(dir, name), "utf8")],
    })),
  )
  await applyD1Migrations(env.DB, migrations)
}
