// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    "nitro-cloudflare-dev",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/seo",
    "@nuxt/devtools",
    "@nuxt/hints",
    "@nuxt/scripts",
    "@nuxt/test-utils/module",
    "@formkit/auto-animate/nuxt",
    "reka-ui/nuxt",
    "@nuxt/a11y",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "@/components/ui",
  },
  // Global CSS - Tailwind 4 is imported here
  css: ["./app/assets/css/tailwind.css"],

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
      },
    ],
    defaults: {
      weights: [400],
      styles: ["normal"],
    },
  },

  app: {
    head: {
      title: "syn dot horse",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "NEIGH" },
        { name: "theme-color", content: "#24273a" },
      ],
      link: [{ rel: "icon", type: "image/avif", href: "/images/favicon.avif" }],
    },
  },
  site: {
    url: "https://syn.horse",
    name: "syn dot horse",
  },
  nitro: {
    preset: "cloudflare_module",
    prerender: {
      failOnError: false,
      crawlLinks: true,
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  // Vite configuration with Tailwind CSS 4
  vite: {
    plugins: [tailwindcss() as never],
    optimizeDeps: {
      include: ["three"],
    },
    ssr: {
      noExternal: ["three"],
    },
  },
})
