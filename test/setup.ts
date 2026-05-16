import { applyD1Migrations, env } from "cloudflare:test"

declare module "cloudflare:test" {
  interface ProvidedEnv {
    TEST_MIGRATIONS: D1Migration[]
  }
}

export async function migrate(): Promise<void> {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS)
}
