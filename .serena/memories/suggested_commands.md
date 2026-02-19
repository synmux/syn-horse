# Suggested Commands

## Development

```bash
bun run dev          # Start Nuxt dev server on http://localhost:3000
bun run preview      # Build + run Wrangler local preview
```

## Build & Deploy

```bash
bun run build                # Build for production (Nuxt → .output/)
bun run deploy               # Build + wrangler deploy (production)
bun run deploy:nonprod       # Build + wrangler versions upload (staging)
```

## Linting & Formatting

```bash
bun run lint                 # Run all linters: eslint + trunk + typecheck
bun run lint:eslint          # ESLint only
bun run lint:trunk           # Trunk.io check only
bun run lint:types           # TypeScript type check (tsc --noEmit)
bun run lint:fix             # Auto-fix eslint + trunk issues
bun run format               # Run all formatters: prettier + trunk fmt
bun run format:prettier      # Prettier only
bun run format:trunk         # Trunk format only
```

## Testing

```bash
bun run test                 # Run Vitest
bun run test:watch           # Vitest in watch mode
bun run test:coverage        # Vitest with coverage
bun run test:unit            # Vitest unit project only
bun run test:nuxt            # Vitest Nuxt project only
bun run test:e2e             # Playwright E2E tests
bun run test:e2e:ui          # Playwright E2E with UI
```

## Types & Tooling

```bash
bun run types                # Regenerate worker-configuration.d.ts via wrangler types
bun run nuxt prepare         # Regenerate .nuxt/ types and config
```

## Git Workflow

```bash
git add -A . && oco --fgm --yes   # Commit with AI-generated message (per CLAUDE.md)
```

## System Utilities (macOS/Darwin)

```bash
git, bun, wrangler           # Primary CLI tools
trunk check -a               # Trunk.io linting
trunk fmt -a                 # Trunk.io formatting
```
