---
name: ultracite-skilld
description: "ALWAYS use when writing code importing \"ultracite\". Consult for debugging, best practices, or modifying ultracite."
metadata:
  version: 7.8.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# haydenbleasel/ultracite `ultracite@7.8.1`
**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.8.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Ultracite v7.8.1 API Changes

## API Changes

This section documents version-specific API changes in ultracite v7 — prioritizing recent major/minor releases.

- BREAKING: Preset paths changed from `ultracite/{framework}` to `ultracite/{linter}/{framework}` in v7 — e.g., `ultracite/core` → `ultracite/biome/core`, `ultracite/react` → `ultracite/biome/react` [source](./.skilld/docs/upgrade/v7.mdx#updated-preset-paths)

- NEW: Multi-provider support — v7 adds ESLint + Prettier + Stylelint and Oxlint + Oxfmt alongside Biome; you can now choose which toolchain to use [source](./.skilld/docs/upgrade/v7.mdx#multi-provider-support)

- NEW: `--linter` flag for `ultracite init` — specify which provider to use: `biome`, `eslint`, or `oxlint` [source](./.skilld/docs/upgrade/v7.mdx#new-cli-flag)

- NEW: `--type-aware` flag enables type-aware linting — for Biome it adds the `ultracite/biome/type-aware` preset; for Oxlint it installs `oxlint-tsgolint` dependency [source](./.skilld/docs/usage.mdx#type-aware-linting)

- NEW: `--type-check` flag (Oxlint only) enables TypeScript compiler diagnostics to catch type-based bugs like floating promises and misused promises [source](./.skilld/docs/usage.mdx#oxlint)

- NEW: Editor hooks via `--hooks` flag configure automatic `ultracite fix` after AI agent edits in Cursor, Windsurf, CodeBuddy, and Claude Code [source](./.skilld/docs/hooks.mdx#setup)

- NEW: `--agents` flag to configure AI agent files for Claude, Cursor, Gemini, and 40+ other agents; generates AGENTS.md, .claude/CLAUDE.md, and provider-specific files [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--editors` flag configures editor settings for VS Code, Cursor, Windsurf, Zed, and other VS Code-based editors, or `universal` for all [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--frameworks` flag adds framework-specific presets during init — supports `react`, `next`, `solid`, `vue`, `svelte`, `qwik`, `remix`, `tanstack`, `angular`, `astro`, `nestjs` [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--integrations` flag configures git hooks with Husky, lefthook, lint-staged, or pre-commit to auto-fix before commits [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--install-skill` flag installs the reusable Ultracite skill bundle so compatible AI tools can load it as a shared capability [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--pm` flag specifies package manager — choose from `pnpm`, `bun`, `yarn`, `npm` [source](./.skilld/docs/setup.mdx#flags)

- NEW: `--quiet` flag suppresses all interactive prompts and visual output; auto-enabled when `CI=true` — useful for CI/CD pipelines [source](./.skilld/docs/setup.mdx#programmatic-usage)

- NEW: `--skip-install` flag — configure files without installing dependencies [source](./.skilld/docs/setup.mdx#flags)

- NEW: `ultracite fix --unsafe` — applies unsafe auto-fixes that may change code behavior, e.g., rewriting `substring()` to `slice()` when `noSubstr` rule is enabled [source](./.skilld/docs/usage.mdx#fixing-code)

- NEW: Safe auto-fix rules in v7 — `noUnusedImports`, `useBlockStatements`, `useSortedClasses` automatically apply when running `ultracite fix` (no `--unsafe` needed) [source](./.skilld/docs/configuration.mdx#safe-fixes)

- NEW: `ultracite doctor` command validates setup and provides recommendations for common configuration issues [source](./.skilld/docs/usage.mdx#validating-setup)

- NEW: Hooks configuration for Cursor (`.cursor/hooks.json`), Windsurf (`.windsurf/hooks.json`), CodeBuddy (`.codebuddy/settings.json`), and Claude Code (`.claude/settings.json`) to auto-run `ultracite fix` after AI edits [source](./.skilld/docs/hooks.mdx#automatic-setup)

- NEW: Git hooks support — Ultracite can configure Husky, lefthook, lint-staged, and pre-commit to run `npx ultracite fix` before committing [source](./.skilld/docs/git-hooks.mdx#supported-tools)

- NEW: Type-aware preset `ultracite/biome/type-aware` for Biome enables project/scanner rules like `noPrivateImports`, `noUndeclaredDependencies`, `noUnresolvedImports`, `noImportCycles` [source](./.skilld/docs/usage.mdx#biome)

- NEW: ESLint configuration exports changed from `.extends` to `defineConfig()` with module imports; Ultracite generates `eslint.config.mjs`, `prettier.config.mjs`, `stylelint.config.mjs` [source](./.skilld/docs/provider/eslint.mdx#usage)

**Also changed:** Oxlint preset imports now use `defineConfig()` · Oxlint supports third-party plugins for extended rule coverage · Files exclusion pattern now requires `"**"` as first entry in Biome · Default line width is 80 characters (not 120) · Safe fixes configuration can be disabled per-rule · Agent skills separate from repo-local agent rules · `--quiet` mode uses sensible defaults when no flags specified
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- **Choose Biome as the default linter** — It combines single-binary simplicity with modern features and is the fastest option for most JavaScript/TypeScript projects. The performance benefits from Rust implementation enable formatting on every save without lag [source](./.skilld/docs/index.mdx#goals)

- **Always enable TypeScript strict mode in your project** — Ultracite's rules assume strict null checking; without it, you'll see warnings about potential undefined values that TypeScript isn't catching due to loose settings. Enable `strictNullChecks` in `tsconfig.json` to align with Ultracite's philosophy [source](./.skilld/docs/troubleshooting.mdx:L56:L60)

- **Extend the core preset first, then add framework-specific presets** — The framework presets are designed to layer on top of the core config without bloating your base configuration. Always include `ultracite/{linter}/core` first, then add framework-specific presets like `react`, `next`, or `vue` [source](./.skilld/docs/configuration.mdx:L8:L29)

- **Include `"**"` as the first entry when using negated glob patterns in file includes** — Biome matches zero files if you override `files.includes` with only negated patterns. Always lead with `"**"` to include everything, then negate what you want to exclude, especially for third-party code like `components/ui/**` [source](./.skilld/docs/troubleshooting.mdx:L28:L36)

- **Use `npx ultracite fix --unsafe` only for intentional behavior-changing rewrites** — The `--unsafe` flag applies fixes like rewriting `substring()` and `substr()` to `slice()`, which can change runtime behavior. Use this deliberately and review the changes carefully [source](./.skilld/docs/usage.mdx:L55:L64)

- **Enable `formatOnPaste` in your IDE settings** — Ultracite configures this automatically, ensuring code pasted from external sources is instantly reformatted to match your project style without manual intervention [source](./.skilld/docs/usage.mdx:L20)

- **Set up editor hooks to automatically format AI-generated code** — Configure hooks for Cursor, Windsurf, CodeBuddy, or Claude Code to run `npx ultracite fix` after AI edits, ensuring all generated code adheres to project standards before you review it [source](./.skilld/docs/hooks.mdx:L1:L10)

- **Use Git hooks or lint-staged for pre-commit formatting** — Running `npx ultracite fix` before every commit keeps your repository history clean and ensures consistency across contributors. Combine with Husky, lefthook, or lint-staged for automated enforcement [source](./.skilld/docs/git-hooks.mdx:L1:L10)

- **Pass `--quiet` and `CI=true` when running Ultracite in CI/CD pipelines** — These flags suppress interactive prompts and visual output, use sensible defaults, and exit cleanly for non-interactive environments. The `CI` variable is automatically detected for standard CI platforms [source](./.skilld/docs/setup.mdx:L32:L58)

- **Remove conflicting linter configs when switching to Ultracite** — If you have leftover `.eslintrc`, `.prettierrc`, or old `biome.jsonc` files, VS Code extensions may still pick them up and cause double diagnostics. Remove or explicitly disable the corresponding extensions to avoid confusion [source](./.skilld/docs/troubleshooting.mdx:L16:L21)

- **Enable type-aware linting for deeper static analysis** — For Biome, pass `--type-aware` during init to add rules like `noPrivateImports`, `noImportCycles`, and `noUndeclaredDependencies` that catch import structure bugs. For Oxlint, pass the flag at runtime [source](./.skilld/docs/usage.mdx:L66:L102)

- **Run `ultracite doctor` after setup to validate your configuration** — This command checks for common issues like missing extensions, conflicting formatters, and misconfigured settings, providing recommendations for each problem found [source](./.skilld/docs/usage.mdx:L110:L116)

- **Use a single root-level lint script in monorepos** — Because Rust-based tools like Biome are fast, a single `npx ultracite check` or `npx ultracite fix` at the root covers all packages efficiently without needing per-package scripts [source](./.skilld/docs/monorepos.mdx:L9:L27)

- **Install the global Ultracite skill alongside repo-local rules** — The skill provides a shared baseline across projects while keeping formatting decisions and project-specific rules in each repository's config. Separates portable guidance from repository-local configuration [source](./.skilld/docs/skills.mdx:L43:L76)
<!-- /skilld:best-practices -->

Related: zod-skilld
