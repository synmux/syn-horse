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
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          href: "/images/favicon.avif",
          rel: "icon",
          type: "image/avif",
        },
      ],
      meta: [
        {
          charset: "utf-8",
        },
        {
          content: "width=device-width, initial-scale=1",
          name: "viewport",
        },
        {
          content: "NEIGH",
          name: "description",
        },
        {
          content: "#24273a",
          name: "theme-color",
        },
      ],
      title: "syn dot horse",
    },
  },
  claudeDevtools: {
    claude: {
      // Path to Claude CLI
      args: [], // Additional CLI arguments
      command: "claude",
    },
    enabled: true,
  },
  colorMode: {
    fallback: "dark",
    preference: "dark",
    storageKey: "color-mode",
  },
  compatibilityDate: "2025-07-15",
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
  eslint: {
    checker: true,
  },
  experimental: {
    browserDevtoolsTiming: true,
    buildCache: true,
    chromeDevtoolsProjectSettings: true,
    clientFallback: true,
    clientNodeCompat: true,
    componentIslands: true,
    crossOriginPrefetch: true,
    decorators: true,
    emitRouteChunkError: "automatic",
    headNext: true,
    inlineRouteRules: true,
    lazyHydration: true,
    localLayerAliases: true,
    payloadExtraction: true,
    typedPages: true,
    viewTransition: true,
    viteEnvironmentApi: true,
    watcher: "parcel",
    writeEarlyHints: true,
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
  formkit: {
    // Experimental support for autoloading (see note):
    autoImport: true,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  gtag: {
    // id: "G-XXXXXXXXXX", // defined in env as NUXT_PUBLIC_GTAG_ID
    config: {
      page_title: "My Custom Page Title",
    },
    // TODO: is there a better detection for Cloudflare Workers prod vs. the dev server?
    enabled: process.env.NODE_ENV === "production",
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
    failOnError: false,

    /** A list of routes to ignore (that is, not check validity for). */
    ignore: [/\.(xml|rss|json)$/],
    logLevel: "verbose",
    options: {
      extends: ["html-validate:document", "html-validate:recommended", "html-validate:standard"],
      rules: {
        "attribute-boolean-style": "off",
        "doctype-style": "off",
        // Unreasonable rule
        "no-inline-style": "off",
        "no-trailing-whitespace": "off",
        "no-unknown-elements": "error",
        // Conflict with Nuxt defaults
        "require-sri": "off",
        "svg-focusable": "off",
        // Conflicts or not needed as we use prettier formatting
        "void-style": "off",
      },
    },
    usePrettier: true,
  },
  hub: {
    // https://hub.nuxt.com/docs
    blob: true,
    // boolean | BlobConfig
    cache: true,
    // boolean | CacheConfig
    db: "sqlite",
    // boolean | KVConfig
    dir: ".data", // dir for data used in dev
    // 'postgresql' | 'sqlite' | 'mysql' | DatabaseConfig
    kv: true,
  },
  icon: {
    cssLayer: "base",
    mode: "css",
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
  linkChecker: {
    // exclude paths from checking
    excludeLinks: ["/api/**"],
    failOnError: true,
    // generate reports
    report: {
      html: true,
      markdown: true,
    },
    skipInspections: ["external-if-timeout", "missing-hash"],
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
    "@nuxtjs/html-validator", // "@nuxtjs/i18n",
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
    "nuxt-security",
  ],
  nitro: {
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    preset: "cloudflare_module",
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
    groups: [
      {
        disallow: ["/"],
        userAgent: ["GPTBot", "ChatGPT-User"],
      },
    ],
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
    // NUXT_PUBLIC_* environment variables are automatically added here
    formkitProKey: "", // populated from NUXT_FORMKIT_PRO_KEY environment variable
    public: {
      gtagId: "", // populated from NUXT_PUBLIC_GTAG_ID environment variable
    },
  },
  schemaOrg: {
    identity: {
      image: "/avatar.jpg",
      name: "John Doe",
      type: "Person",
      url: "https://johndoe.com",
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
  shadcn: {
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "@/components/ui",

    /**
     * Prefix for all the imported component
     */
    prefix: "",
  },
  site: {
    defaultLocale: "en",
    description: "it's syn and it's a horse.",
    indexable: true,
    name: "syn dot horse",
    url: "https://syn.horse",
  },
  solarIcons: {
    // Auto-import all icons as components (default: true)
    autoImport: true,
    // Default icon properties
    color: "currentColor",
    mirrored: false,
    // Prefix for auto-imported components (default: 'Solar')
    namePrefix: "Solar",
    // Inject global provider automatically (default: true)
    provider: true,
    size: 24,
    weight: "Linear",
  },
  sourcemap: {
    client: true,
    // consider "hidden"
    server: true,
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      ErrorMessage: "VeeErrorMessage",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      Form: "VeeForm",
    },
  },
  // Vite configuration with Tailwind CSS 4
  vite: {
    build: {
      manifest: true,
      minify: "esbuild",
      sourcemap: true,
    },
    optimizeDeps: {
      include: ["three"],
    },
    plugins: [tailwindcss() as never],
    ssr: {
      noExternal: ["three"],
    },
  },
})
