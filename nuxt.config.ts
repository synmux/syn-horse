// https://nuxt.com/docs/api/configuration/nuxt-config]
// trunk-ignore-all(trunk-toolbox/todo)

const compatibilityDate = "2026-04-15"

export default defineNuxtConfig({
  app: {
    head: {
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
    payloadExtraction: true,
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
    // D1 database
    // db: {
    //   dialect: "sqlite",
    //   driver: "d1",
    //   connection: { databaseId: "2722c422-9352-45b5-9e7f-a4f6504e4f85" },
    // },
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
  modules: [
    "nitro-cloudflare-dev",
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
          {
            custom_domain: true,
            pattern: "syn.as",
          },
          {
            custom_domain: true,
            pattern: "www.syn.as",
          },
          {
            custom_domain: true,
            pattern: "syn.haus",
          },
          {
            custom_domain: true,
            pattern: "www.syn.haus",
          },
          {
            custom_domain: true,
            pattern: "syn.pink",
          },
          {
            custom_domain: true,
            pattern: "www.syn.pink",
          },
          {
            custom_domain: true,
            pattern: "dcw.soy",
          },
          {
            custom_domain: true,
            pattern: "www.dcw.soy",
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
      cloudflare: {
        accountId: "def50674a738cee409235f71819973cf",
      },
      siteUrl: "https://syn.horse",
      turnstile: {
        siteKey: "", // overridden by environment variable
      },
    },
    turnstile: {
      secretKey: "", // overridden by environment variable
    },
  },
  security: {
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
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
})
