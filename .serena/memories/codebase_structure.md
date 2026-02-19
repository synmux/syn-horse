# Codebase Structure

```
syn-horse/
├── app/                          # Main application source
│   ├── app.vue                   # Root Vue component (NuxtWelcome placeholder)
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css      # Tailwind v4 config with custom OKLch theme
│   ├── components/
│   │   └── ui/                   # Shadcn-Vue UI components (empty, install as needed)
│   ├── lib/
│   │   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│   └── plugins/
│       └── ssr-width.ts          # SSR width provider for VueUse
├── public/                       # Static assets
│   ├── images/                   # Brand images (logos, mockups) in AVIF
│   ├── *.png, favicon.ico        # Favicons and PWA icons
│   ├── robots.txt                # SEO robots file
│   └── site.webmanifest          # PWA manifest
├── .github/                      # GitHub config
│   ├── workflows/                # CI, Claude, DevSkim, Dependabot
│   └── CODEOWNERS
├── .agents/skills/               # AI agent skill definitions
├── .claude/                      # Claude Code config (symlinks to .agents)
├── .trunk/                       # Trunk.io linting config
├── .vscode/                      # VS Code workspace settings
├── nuxt.config.ts                # Nuxt configuration
├── wrangler.jsonc                # Cloudflare Worker configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # Shadcn-Vue component config
├── env.d.ts                      # H3/Cloudflare environment types
├── worker-configuration.d.ts     # Auto-generated Wrangler types (DO NOT EDIT)
├── package.json                  # Dependencies and scripts
└── .env.example                  # Environment variable template
```

## Key Directories NOT Yet Created

- `server/` — Nitro server routes, middleware, API endpoints
- `pages/` — Nuxt page components (file-based routing)
- `composables/` — Vue composables (auto-imported by Nuxt)
- `layouts/` — Nuxt layout components
- `middleware/` — Nuxt route middleware
- `tests/` — Test files (Vitest + Playwright)
