// https://nuxt.com/docs/api/configuration/nuxt-config]
// trunk-ignore-all(trunk-toolbox/todo)

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"

import tailwindcss from "@tailwindcss/vite"

const compatibilityDate = "2026-04-15"

let buildTime = existsSync(".buildtime") ? readFileSync(".buildtime", "utf8").trim() : ""
if (buildTime.length === 0) {
  buildTime = new Date().toISOString()
  writeFileSync(".buildtime", buildTime)
}

let commitHash = existsSync(".commithash") ? readFileSync(".commithash", "utf8").trim() : ""
if (commitHash.length === 0) {
  try {
    commitHash = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      encoding: "utf8",
    }).trim()
  } catch {
    commitHash = "unknown"
  }
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "synhorse",
      },
      link: [
        {
          href: "/favicon-96x96.png?v=20260816",
          rel: "icon",
          sizes: "96x96",
          type: "image/png",
        },
        {
          href: "/favicon.ico",
          rel: "icon",
          type: "image/vnd.microsoft.icon",
        },
        {
          href: "https://basilisk.gallery/@syn",
          rel: "me",
        },
        {
          href: "/favicon.svg?v=20260816",
          rel: "icon",
          type: "image/svg+xml",
        },
        {
          href: "/favicon.ico?v=20260816",
          rel: "shortcut icon",
        },
        {
          href: "/apple-touch-icon.png?v=20260816",
          rel: "apple-touch-icon",
          sizes: "180x180",
        },
        {
          href: "/site.webmanifest?v=20260816",
          rel: "manifest",
        },
      ],
      meta: [
        {
          content: "syn.horse",
          name: "apple-mobile-web-app-title",
        },
      ],
    },
  },
  compatibilityDate,
  content: {
    database: {
      type: "d1",
      bindingName: "DB_CONTENT",
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  experimental: {
    componentIslands: true,
    defaults: {
      nuxtLink: {
        trailingSlash: "remove", // or 'append'
      },
    },
    inlineRouteRules: true,
    lazyHydration: true,
    // payloadExtraction is for `nuxt generate` (static prerender); with dynamic SSR
    // it makes client-side navigation fetch `/<route>/_payload.json`, which gets
    // caught by `pages/blog/[slug].vue` as `slug = "_payload.json"` and 404s.
    payloadExtraction: false,
    viewTransition: true,
  },
  fonts: {
    assets: {
      prefix: "/_fonts/",
    },
    defaults: {
      styles: ["normal", "italic"],
      subsets: ["latin-ext", "latin"],
      weights: [400],
    },
    families: [
      {
        name: "VT323",
        provider: "google",
        styles: ["normal"],
        weights: ["400"],
      },
      {
        name: "Inter",
        provider: "google",
        styles: ["normal", "italic"],
        weights: ["100 900"],
      },
      {
        name: "Space Mono",
        provider: "google",
        styles: ["normal", "italic"],
        weights: ["100 800"],
      },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  hooks: {
    // @nuxt/content's built-in D1 importer skips statements that fail, treats a failed checksum
    // read as an empty database (and drops the table), then marks the import complete anyway.
    // That left production serving 5 of 15 posts. `server/middleware/content-sync.ts` replaces
    // it with an atomic, self-healing sync, so the built-in one must not also write to D1. Dev
    // is left alone: it reads a local SQLite database that @nuxt/content maintains itself.
    "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }
      const contentRuntimeConfig = nitroConfig.runtimeConfig?.content
      if (!contentRuntimeConfig) {
        throw new Error("@nuxt/content runtime config is missing, so its D1 integrity check cannot be disabled")
      }
      contentRuntimeConfig.integrityCheck = false
    },
  },
  hub: {
    // D1 database (binding defaults to 'DB')
    db: {
      dialect: "sqlite",
      driver: "d1",
      connection: { databaseId: "2722c422-9352-45b5-9e7f-a4f6504e4f85" },
    },
    // KV namespace (binding defaults to 'KV')
    kv: {
      binding: "KV",
      driver: "cloudflare-kv-binding",
      namespaceId: "3fa198f1477f456c8d27eb9a72562a4b",
    },
    // Cache KV namespace (binding defaults to 'CACHE')
    cache: {
      binding: "CACHE",
      driver: "cloudflare-kv-binding",
      namespaceId: "d7a8a6c935354a17a4c2d26bc1056710",
    },
    // R2 bucket (binding defaults to 'BLOB')
    blob: {
      driver: "cloudflare-r2",
      bucketName: "private-syn-horse",
      binding: "BLOB",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-GB",
      },
    ],
  },
  modules: [
    // nitropack's built-in cloudflare-dev preset already provides the dev-time
    // Miniflare proxy (configured via `nitro.cloudflareDev.configPath` below).
    // Listing the legacy `nitro-cloudflare-dev` module here too produced two
    // racing `getPlatformProxy()` plugins; the legacy one assigns
    // `globalThis.__env__ = Promise<env>` initially, so NuxtHub's migrations
    // plugin would observe `__env__` before it resolved and fail with
    // "DB binding not found".
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/scripts",
    "nuxt-security",
    "nuxt-gtag",
    "@nuxt/content",
    "@nuxthub/core",
    "@nuxtjs/turnstile",
    "@nuxtjs/seo",
  ],
  nitro: {
    // `nitro-cloudflare-dev` reads this file (via `wrangler.getPlatformProxy()`)
    // to expose Cloudflare bindings to the dev server. The filename intentionally
    // avoids `wrangler.{json,jsonc,toml}` so nitropack's cloudflare preset (and
    // the wrangler CLI) won't auto-discover and merge it into the generated deploy
    // config in `.output/server/wrangler.json`. Without this, `globalThis.__env__.DB`
    // is empty in dev and NuxtHub's migration runner fails with "DB binding not found".
    cloudflareDev: {
      configPath: "wrangler.dev.jsonc",
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        account_id: "def50674a738cee409235f71819973cf",
        ai: {
          binding: "AI",
        },
        analytics_engine_datasets: [
          {
            binding: "ANALYTICS",
            dataset: "syn-horse",
          },
        ],
        assets: {
          binding: "ASSETS",
          directory: "./.output/public/",
        },
        browser: {
          binding: "BROWSER",
        },
        compatibility_date: compatibilityDate,
        compatibility_flags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
        d1_databases: [
          {
            binding: "DB_CONTENT", // D1 binding for @nuxt/content
            database_name: "content-syn-horse",
            database_id: "32a0099e-1ecf-4ff5-8abc-0fd52f90b482",
            migrations_dir: "server/db/migrations/sqlite",
            preview_database_id: "deab36c7-6839-4025-a9c2-16f61327abd7",
          },
        ],
        dev: {
          host: "dave-mbp.manticore-minor.ts.net",
          inspector_port: 9229,
          port: 443,
        },
        images: {
          binding: "IMAGES",
        },
        keep_names: true,
        limits: {
          cpu_ms: 30_000,
        },
        logpush: false,
        main: "./.output/server/index.mjs",
        minify: true,
        name: "syn-horse",
        observability: {
          enabled: true,
          logs: {
            enabled: true,
            head_sampling_rate: 1,
            invocation_logs: true,
          },
          // @ts-expect-error: types are lagging reality
          traces: {
            enabled: true,
          },
        },
        placement: {
          mode: "smart",
        },
        preview_urls: true,
        queues: {
          producers: [
            {
              binding: "NOTIFICATIONS",
              queue: "syn-horse-notifications",
            },
          ],
        },
        routes: [
          {
            custom_domain: true,
            pattern: "syn.horse",
          },
          {
            custom_domain: true,
            pattern: "www.syn.horse",
          },
        ],
        send_metrics: true,
        upload_source_maps: true,
        vars: {
          NUXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAC2QY6ZikvZ4TAQq",
        },
        version_metadata: {
          binding: "CF_VERSION_METADATA",
        },
        workers_dev: true,
      },
    },
    eslint: {
      checker: {
        eslintPath: "eslint",
      },
    },
    experimental: {
      wasm: true,
    },
    preset: "cloudflare_module",
    image: {
      cloudflare: {
        baseURL: "https://syn.horse",
      },
    },
    // unwasm can't lift shiki's onig.wasm `env` host-imports into ES imports
    // (Emscripten output isn't lift-able), so it falls back to shiki's inlined
    // `wasm.mjs` glue - the canonical path. Silence the noisy fallback warning.
    wasm: {
      silent: true,
    },
    routeRules: {
      "/api/**": {
        cors: true,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "0",
        },
      },
      "/ssh/config": {
        redirect: {
          to: "https://public.syn.horse/ssh/config",
          statusCode: 301,
        },
      },
      "/ssh/config/": {
        redirect: {
          to: "https://public.syn.horse/ssh/config",
          statusCode: 301,
        },
      },
      "/ssh/keys": {
        redirect: {
          to: "https://public.syn.horse/ssh/keys",
          statusCode: 301,
        },
      },
      "/ssh/keys/": {
        redirect: {
          to: "https://public.syn.horse/ssh/keys",
          statusCode: 301,
        },
      },
      "/gpg/agent": {
        redirect: {
          to: "https://public.syn.horse/gpg/agent",
          statusCode: 301,
        },
      },
      "/gpg/agent/": {
        redirect: {
          to: "https://public.syn.horse/gpg/agent",
          statusCode: 301,
        },
      },
      "/gpg/config": {
        redirect: {
          to: "https://public.syn.horse/gpg/config",
          statusCode: 301,
        },
      },
      "/gpg/config/": {
        redirect: {
          to: "https://public.syn.horse/gpg/config",
          statusCode: 301,
        },
      },
      "/gpg/keys": {
        redirect: {
          to: "https://public.syn.horse/gpg/keys",
          statusCode: 301,
        },
      },
      "/gpg/keys/": {
        redirect: {
          to: "https://public.syn.horse/gpg/keys",
          statusCode: 301,
        },
      },
      "/git": {
        redirect: {
          to: "https://public.syn.horse/git",
          statusCode: 301,
        },
      },
      "/git/": {
        redirect: {
          to: "https://public.syn.horse/git",
          statusCode: 301,
        },
      },
      "/sudo": {
        redirect: {
          to: "https://public.syn.horse/sudo",
          statusCode: 301,
        },
      },
      "/sudo/": {
        redirect: {
          to: "https://public.syn.horse/sudo",
          statusCode: 301,
        },
      },
      // "/gender":s { isr: 3600 },
      // "/api": { prerender: true },
      // "/todo": { ssr: false }, // Client-only interactive page
      // "/go/**": {
      //   headers: {
      //     "Cache-Control": "no-cache, no-store, must-revalidate",
      //   },
      // },
      // "/.well-known/nostr.json": {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // },
    },
  },
  router: {
    options: {
      strict: false, // default — /foo and /foo/ both match the same route
    },
  },
  runtimeConfig: {
    cloudflare: {
      d1Token: "", // overridden by environment variable
    },
    public: {
      apiBase: "/api",
      buildTime,
      cloudflare: {
        accountId: "def50674a738cee409235f71819973cf",
      },
      commitHash,
      siteUrl: "https://syn.horse",
      turnstile: {
        siteKey: "0x4AAAAAAC2QY6ZikvZ4TAQq",
      },
    },
    turnstile: {
      secretKey: "", // overridden by environment variable
    },
  },
  security: {
    headers: {
      // @nuxt/content v3 ships an in-browser SQLite WASM module to run client-side
      // queries during navigation. The default Strict CSP blocks WebAssembly compilation;
      // adding 'wasm-unsafe-eval' allows just the WASM portion without re-enabling 'unsafe-eval'.
      contentSecurityPolicy: {
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "'wasm-unsafe-eval'",
        ],
      },
    },
    sri: true,
    ssg: {
      hashScripts: true,
      hashStyles: true,
      meta: true,
    },
  },
  site: {
    indexable: true,
    name: "syn.horse",
    url: "https://syn.horse",
  },
  sourcemap: {
    client: "hidden",
    server: true,
  },
  turnstile: {
    siteKey: "0x4AAAAAAC2QY6ZikvZ4TAQq",
  },
  vite: {
    build: {
      minify: "esbuild",
    },
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit", "@vueuse/core", "@unhead/schema-org/vue"],
    },
    plugins: [tailwindcss()],
  },
})
