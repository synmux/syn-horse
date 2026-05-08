// https://nuxt.com/docs/api/configuration/nuxt-config]
// trunk-ignore-all(trunk-toolbox/todo)

import { existsSync, readFileSync, writeFileSync } from "node:fs"

import tailwindcss from "@tailwindcss/vite"

const compatibilityDate = "2026-04-15"

let buildTime = existsSync(".buildtime") ? readFileSync(".buildtime", "utf8").trim() : ""
if (buildTime.length === 0) {
  buildTime = new Date().toISOString()
  writeFileSync(".buildtime", buildTime)
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "synhorse",
      },
      link: [
        {
          href: "/images/icon.ico",
          rel: "icon",
          type: "image/vnd.microsoft.icon",
        },
        {
          href: "https://basilisk.gallery/@syn",
          rel: "me",
        },
      ],
    },
  },
  compatibilityDate,
  content: {
    database: {
      type: "d1",
      bindingName: "DB",
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  eslint: {
    checker: {
      eslintPath: "eslint",
    },
  },
  experimental: {
    componentIslands: true,
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
        name: "JetBrains Mono",
        provider: "google",
        styles: ["normal", "italic"],
        weights: ["100 800"],
      },
    ],
  },
  future: {
    compatibilityVersion: 4,
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
      driver: "cloudflare-kv-binding",
      namespaceId: "e8ba4689173e4710aaff726ce8ddb225",
    },
    // Cache KV namespace (binding defaults to 'CACHE')
    cache: {
      driver: "cloudflare-kv-binding",
      namespaceId: "6d108e06dbe144ff9752c63084e4bd85",
    },
    // R2 bucket (binding defaults to 'BLOB')
    blob: {
      driver: "cloudflare-r2",
      bucketName: "blob-syn-horse",
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
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
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
        // D1 binding for @nuxt/content. database_name must match the name registered in
        // Cloudflare (verify with `wrangler d1 list`); database_id is authoritative for routing.
        d1_databases: [
          {
            binding: "DB",
            database_name: "syn-horse",
            database_id: "2722c422-9352-45b5-9e7f-a4f6504e4f85",
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
          cpu_ms: 30000,
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
    experimental: {
      wasm: true,
    },
    preset: "cloudflare_module",
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
