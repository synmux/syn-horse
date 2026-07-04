# Tech stack

Package manager: **bun**, pinned `bun@1.3.14` (package.json `packageManager`). Everything runs via `bun run …`. ESM only (`"type": "module"`). Pins below are major/minor that matter; see package.json for exact patch.

- **Framework:** Nuxt 4.4 (`srcDir: app/`), Vue 3.5, vue-router 5. Server = Nitro (nitropack 2.13).
- **Deploy:** Cloudflare Workers, `nitro.preset = "cloudflare_module"`, wrangler 4.93.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` + daisyUI 5, single `synhorse` theme, built-in themes disabled. No `tailwind.config` file — theme defined in `app/assets/css/main.css` (`@theme` + `@plugin "daisyui/theme"`).
- **DB:** Cloudflare D1 + drizzle-orm 0.45 / drizzle-kit 0.31. Local drizzle tooling: better-sqlite3 (@libsql/client also present).
- **Content:** @nuxt/content 3 — `blog` collection (see `mem:core` source map).
- **Validation:** zod 4 (v4 API: issue key is `error`, not `message`).
- **OG images:** @takumi-rs/core + @takumi-rs/wasm 1.3 — render `app/components/OgImage/*.takumi.vue`.
- **Nuxt modules:** @nuxt/fonts (VT323/Inter/Space Mono via Google), @nuxt/icon, @nuxt/image, @nuxt/scripts, @nuxtjs/seo, @nuxtjs/turnstile, nuxt-security (SRI + CSP — `security.sri: true`), nuxt-gtag, @nuxthub/core.
- **Tooling:** eslint 10 (@nuxt/eslint flat config) + prettier 3 + trunk (@trunkio/launcher); types via tsc/vue-tsc; ctx7 (Context7) + skilld dev deps.
- `openai` 6 and `uuid` 14 are dependencies; confirm call sites before assuming scope (IDs server-side use global `crypto.randomUUID()`, not the uuid pkg).

Invoke via `mem:suggested_commands`; verify gate in `mem:task_completion`.
