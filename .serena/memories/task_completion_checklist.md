# Task Completion Checklist

After completing any task, run these steps in order:

## 1. Lint & Type Check

```bash
bun run lint
```

This runs: eslint → trunk check → tsc --noEmit

## 2. Format

```bash
bun run format
```

This runs: prettier → trunk fmt

## 3. Test (if tests exist)

```bash
bun run test
```

## 4. Build Verification

```bash
bun run build
```

Ensures the Nuxt build succeeds and generates `.output/`

## 5. Commit

```bash
git add -A . && oco --fgm --yes
```

Uses OpenCommit to generate emoji-prefixed commit messages.

## Important Notes

- Never continue with errors — fix all lint/type/test failures before proceeding
- Run lint/typecheck/test before proceeding (per CLAUDE.md)
- Keep AGENTS.md, CLAUDE.md, README.md up to date
- If AGENTS.md doesn't exist yet, create it and symlink CLAUDE.md → AGENTS.md
