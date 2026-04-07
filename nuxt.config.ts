// https://nuxt.com/docs/api/configuration/nuxt-config]
// trunk-ignore-all(trunk-toolbox/todo)

import tailwindcss from "@tailwindcss/vite"

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
  compatibilityDate: "2026-04-07",
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  eslint: {
    checker: true,
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
        name: "Sixtyfour Convergence",
        provider: "bunny",
      },
      {
        name: "Sono",
        provider: "bunny",
      },
      {
        name: "Victor Mono",
        provider: "bunny",
      },
    ],
  },
  future: {
    compatibilityVersion: 4,
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
  ],
  nitro: {
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    experimental: {
      wasm: true,
    },
    preset: "cloudflare_module", // routeRules: {
    //   "/": { prerender: true },
    //   "/gender": { isr: 3600 },
    //   "/api": { prerender: true },
    //   "/todo": { ssr: false }, // Client-only interactive page
    //   "/api/**": {
    //     cors: true,
    //     headers: {
    //       "Cache-Control": "no-cache, no-store, must-revalidate",
    //       "X-Content-Type-Options": "nosniff",
    //       "X-Frame-Options": "DENY",
    //       "X-XSS-Protection": "0",
    //     },
    //   },
    //   "/go/**": {
    //     headers: {
    //       "Cache-Control": "no-cache, no-store, must-revalidate",
    //     },
    //   },
    //   "/.well-known/nostr.json": {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   },
    // },
  },
  runtimeConfig: {
    anthropicApiKey: "",
    // overridden by environment variable
    ctrldApiKey: "",
    // overridden by environment variable
    ctrldAuthKey: "",
    // overridden by environment variable
    linearApiKey: "",
    // overridden by environment variable
    openRouterApiKey: "",
    // overridden by environment variable
    public: {
      apiBase: "/api",
      cloudflare: {
        accountId: "def50674a738cee409235f71819973cf",
      },
      siteUrl: "https://syn.horse",
      // turnstile: {
      //   siteKey: "0x4AAAAAABraTjA80I4Pmf1K"
      // }
    },
    turnstileSecretKey: "", // overridden by environment variable
  },
  security: {
    sri: true,
    ssg: {
      hashScripts: true,
      hashStyles: true,
      meta: true,
    },
  },
  // site: {
  //   indexable: true,
  //   name: "syn.horse",
  //   url: "https://syn.horse"
  // },
  sourcemap: {
    client: "hidden",
    server: true,
  },
  // turnstile: {
  //   siteKey: "0x4AAAAAABraTjA80I4Pmf1K",
  // },
  vite: {
    build: {
      minify: "esbuild",
    },
    plugins: [tailwindcss()],
  },
})
