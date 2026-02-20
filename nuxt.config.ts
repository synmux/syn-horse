// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
// import { defineConfig } from "vitest/config"
// import { defineVitestProject } from "@nuxt/test-utils/config"

// test config not added as it breaks startup
// was in vite.config.mts but nuxt complained
// TODO: Get Nuxt test-utils working
/*
test: {
  projects: [
    {
      test: {
        name: "unit",
        include: ["test/unit/*.{test,spec}.ts"],
        environment: "node"
      }
    },
    {
      test: {
        name: "e2e",
        include: ["test/e2e/*.{test,spec}.ts"],
        environment: "node"
      }
    },
    await defineVitestProject({
      test: {
        name: "nuxt",
        include: ["test/nuxt/*.{test,spec}.ts"],
        environment: "nuxt"
      }
    })
  ]
}
*/

export default defineNuxtConfig({
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
  compatibilityDate: "2025-07-15",
  claudeDevtools: {
    enabled: true,
    claude: {
      command: "claude", // Path to Claude CLI
      args: [], // Additional CLI arguments
    },
  },
  content: {
    experimental: {
      nativeSqlite: true,
    },
  },
  // Global CSS - Tailwind 4 is imported here
  css: ["./app/assets/css/tailwind.css"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
    vscode: {
      // brew install code-server to make this work
      // or https://coder.com/docs/code-server/install
      codeServer: "coder-code-server",
      host: "127.0.0.1",
      port: 3094,
    },
  },
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
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  gtag: {
    // TODO: is there a better detection for Cloudflare Workers prod vs. the dev server?
    enabled: process.env.NODE_ENV === "production",
    // id: "G-XXXXXXXXXX", // defined in env as NUXT_PUBLIC_GTAG_ID
    config: {
      page_title: "My Custom Page Title",
    },
    initCommands: [
      // Setup up consent mode
      [
        "consent",
        "default",
        {
          ad_user_data: "granted",
          ad_personalization: "granted",
          ad_storage: "granted",
          analytics_storage: "granted",
          wait_for_update: 500,
        },
      ],
    ],
  },
  htmlValidator: {
    usePrettier: true,
    logLevel: "verbose",
    failOnError: false,
    /** A list of routes to ignore (that is, not check validity for). */
    ignore: [/\.(xml|rss|json)$/],
    options: {
      extends: ["html-validate:document", "html-validate:recommended", "html-validate:standard"],
      rules: {
        "svg-focusable": "off",
        "no-unknown-elements": "error",
        // Conflicts or not needed as we use prettier formatting
        "void-style": "off",
        "no-trailing-whitespace": "off",
        // Conflict with Nuxt defaults
        "require-sri": "off",
        "attribute-boolean-style": "off",
        "doctype-style": "off",
        // Unreasonable rule
        "no-inline-style": "off",
      },
    },
  },
  hub: {
    // https://hub.nuxt.com/docs
    blob: true, // boolean | BlobConfig
    cache: true, // boolean | CacheConfig
    db: "sqlite", // 'postgresql' | 'sqlite' | 'mysql' | DatabaseConfig
    kv: true, // boolean | KVConfig
    dir: ".data", // dir for data used in dev
  },
  // i18n: {
  //   locales: [
  //     {
  //       code: "en",
  //       name: "English",
  //       file: "en.json",
  //     },
  //   ],
  //   // https://i18n.nuxtjs.org/docs
  // },
  image: {
    cloudflare: {
      baseURL: "https://syn.horse",
    },
    format: ["avif", "webp"],
    quality: 70,
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  linkChecker: {
    failOnError: true,
    // generate reports
    report: {
      html: true,
      markdown: true,
    },
    skipInspections: ["external-if-timeout", "missing-hash"],
    // exclude paths from checking
    excludeLinks: ["/api/**"],
  },
  modules: [
    "@formkit/auto-animate/nuxt",
    "@formkit/nuxt",
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils/module",
    "@nuxtjs/color-mode",
    "@nuxtjs/html-validator",
    // "@nuxtjs/i18n",
    "@nuxtjs/partytown",
    "@nuxtjs/seo",
    "@oro.ad/nuxt-claude-devtools",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "@solar-icons/nuxt",
    "@tresjs/nuxt",
    "@unlazy/nuxt",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "magic-regexp/nuxt",
    "nitro-cloudflare-dev",
    "nuxt-gtag",
    "nuxt-svgo",
    "reka-ui/nuxt",
    "shadcn-nuxt",
    "@nuxthub/core",
  ],
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
  ogImage: {
    // fonts: ["Inter:400", "Inter:700"],
    // runtimeBrowser: false, // prerender all images at build time
    defaults: {
      // component: "OgImageTemplate",
    },
  },
  partytown: {
    /**
     * When `true`, Partytown scripts are not minified. See https://partytown.builder.io/configuration
     * on how to enable more logging.
     *
     * @default true in development
     */
    debug: false,
  },
  robots: {
    disallow: ["/admin", "/private"],
    groups: [{ userAgent: ["GPTBot", "ChatGPT-User"], disallow: ["/"] }],
  },
  routeRules: {
    // "/blog/**": {
    //   seoMeta: {
    //     ogType: "article",
    //   },
    // },
    // "/products/**": {
    //   seoMeta: {
    //     ogType: "product",
    //   },
    // },
  },
  runtimeConfig: {
    public: {
      gtagId: "", // populated from NUXT_PUBLIC_GTAG_ID environment variable
    }, // NUXT_PUBLIC_* environment variables are automatically added here
    formkitProKey: "", // populated from NUXT_FORMKIT_PRO_KEY environment variable
  },
  schemaOrg: {
    identity: {
      type: "Person",
      name: "John Doe",
      image: "/avatar.jpg",
      url: "https://johndoe.com",
    },
  },
  seoUtils: {
    automaticBreadcrumbs: true, // adds Schema.org BreadcrumbList automatically
  },
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
  site: {
    url: "https://syn.horse",
    name: "syn dot horse",
    description: "it's syn and it's a horse.",
    defaultLocale: "en",
  },
  solarIcons: {
    // Prefix for auto-imported components (default: 'Solar')
    namePrefix: "Solar",
    // Auto-import all icons as components (default: true)
    autoImport: true,
    // Inject global provider automatically (default: true)
    provider: true,
    // Default icon properties
    color: "currentColor",
    size: 24,
    weight: "Linear",
    mirrored: false,
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
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
