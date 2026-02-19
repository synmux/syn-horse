# Code Style & Conventions

## General Rules (from CLAUDE.md)

- British English spelling and grammar
- No single-letter or meaningless variable names (even in inner loops)
- Descriptive names that convey purpose; clarity over brevity
- Finish all code or mark `TODO: [description]`; fail explicitly, never silently
- Ship breaking changes freely; no migration code unless asked
- Extract duplicated logic to shared utilities immediately with docs+tests+types
- **Never use React** — always prefer Vue/Nuxt alternatives

## TypeScript

- Strict TypeScript with `noEmit` type checking
- ES modules (`"type": "module"` in package.json)
- Worker types referenced via `worker-configuration.d.ts`
- Nuxt auto-imports enabled (Vue composables, components, etc.)

## Formatting

- **EditorConfig:** UTF-8, LF line endings, 2-space indent (4 for Python/Rust/Fish), max 120 chars
- **Prettier:** Primary formatter
- **Trunk.io:** Secondary formatter and linter orchestrator

## CSS / Styling

- Tailwind CSS v4 (imported via Vite plugin, not PostCSS)
- Custom OKLch-based colour system in `app/assets/css/tailwind.css`
- Class merging via `cn()` utility (clsx + tailwind-merge) in `app/lib/utils.ts`
- Shadcn-Vue components: New York style, zinc base colour, CSS variables enabled

## Component Conventions

- Shadcn-Vue components in `app/components/ui/`
- No component prefix (shadcn prefix is empty string)
- Lucide icons via `lucide-vue-next`
- VueUse composables via `@vueuse/core`

## Git Conventions

- Emoji-prefixed commit messages (🔐, 🔧, ✨, 🔥, etc.)
- Commit command: `git add -A . && oco --fgm --yes`
- CODEOWNERS: all files owned by @daveio

## Linting Stack

- ESLint (Nuxt config)
- Trunk.io: actionlint, checkov, eslint, markdownlint, oxipng, prettier, trufflehog, yamllint
- DevSkim security scanning in CI
