---
name: ultracite-skilld
description: "The AI-ready formatter that helps you write and generate code faster. ALWAYS use when writing code importing \"ultracite\". Consult for debugging, best practices, or modifying ultracite."
metadata:
  version: 7.8.3
  generated_by: cached
  generated_at: 2026-06-25
---

# haydenbleasel/ultracite `ultracite@7.8.3`
**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.8.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## ultracite API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

## API Changes

- BREAKING: Preset import paths — v6 to v7 migration requires updating imports from `ultracite/core` to `ultracite/biome/core` (or `ultracite/eslint/core` / `ultracite/oxlint/core` depending on provider) [source](./.skilld/upgrade/v7.mdx:L20-L35)

- BREAKING: TanStack preset behaviour — v7.8.0 moved TanStack Query rules from the `react` preset into a dedicated `tanstack` preset; projects relying on Query rules must explicitly opt into `tanstack` [source](./.skilld/releases/ultracite@7.8.0.md#L10-L14)

- NEW: `tanstack` framework preset — v7.8.0 added a dedicated TanStack preset for Biome, ESLint, and Oxlint covering `@tanstack/react-query`, `@tanstack/react-router`, and `@tanstack/react-start` [source](./.skilld/releases/ultracite@7.8.0.md#L10-L14)

- BREAKING: TanStack Router routing — v7.8.0 changed TanStack Router projects to resolve to the `tanstack` preset instead of `remix` [source](./.skilld/releases/ultracite@7.8.0.md#L10-L14)

- BREAKING: NestJS ESLint preset now enforces rules — v7.7.0 fixed the preset (previously exported empty config); consumers may see new violations on first run [source](./.skilld/releases/ultracite@7.7.0.md#L10-L14)

- BREAKING: Oxlint configuration format — v7.5.0 migrated from `.oxlintrc.json` and `.oxfmtrc.jsonc` JSON files to TypeScript `oxlint.config.ts` and `oxfmt.config.ts` using `defineConfig` [source](./.skilld/releases/ultracite@7.5.0.md#L10-L14)

- NEW: Biome configuration file detection — v7.8.0 patch recognizes `.biome.json` and `.biome.jsonc` (dot-prefixed variants) alongside `biome.json`/`biome.jsonc` [source](./.skilld/releases/ultracite@7.8.0.md#L17-L18)

- BREAKING: ESLint rule additions in core preset — v7.7.0 added enforcement of `complexity`, `no-unused-private-class-members`, `sort-keys`, `sort-vars`, and full `prefer-destructuring` (object + array) [source](./.skilld/releases/ultracite@7.7.0.md#L24-L27)

- BREAKING: ESLint TypeScript rule changes — v7.7.0 added enforcement of `no-confusing-void-expression`, `no-misused-promises`, `prefer-readonly`, `strict-boolean-expressions`, and changed `return-await` to `["error", "always"]` [source](./.skilld/releases/ultracite@7.7.0.md#L24-L27)

- BREAKING: ESLint import rules — v7.7.0 now enforces `consistent-type-specifier-style: ["error", "prefer-top-level"]` [source](./.skilld/releases/ultracite@7.7.0.md#L24-L27)

- BREAKING: React ESLint rules disabled — v7.7.0 disabled `react/jsx-boolean-value`, `react/no-unknown-property`, and `react/only-export-components` to align with oxlint [source](./.skilld/releases/ultracite@7.7.0.md#L24-L34)

- BREAKING: Jest preset test globs expanded — v7.7.0 broadened to `**/*.{test,spec}.{ts,tsx,js,jsx}` + `**/__tests__/**/*.{ts,tsx,js,jsx}` (previously missed `*.spec.*` and `__tests__/` paths) [source](./.skilld/releases/ultracite@7.7.0.md#L24-L34)

- BREAKING: Vitest preset test globs expanded — v7.7.0 applied same glob broadening as Jest preset [source](./.skilld/releases/ultracite@7.7.0.md#L24-L36)

- NEW: Oxlint framework rules — v7.8.0 added 9 new Oxlint rules to core preset: `id-match`, `no-implicit-globals`, `no-implied-eval`, `prefer-arrow-callback`, `prefer-regex-literals`, `import/newline-after-import`, `jsdoc/require-throws-description`, `jsdoc/require-throws-type`, `jsdoc/require-yields-type` [source](./.skilld/releases/ultracite@7.8.0.md#L23-L28)

- NEW: React Oxlint rules — v7.8.0 added 6 rules: `jsx-a11y/control-has-associated-label`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`, `react/no-object-type-as-default-prop`, `react/no-unstable-nested-components` [source](./.skilld/releases/ultracite@7.8.0.md#L23-L28)

- BREAKING: Oxlint config `ignorePatterns` generation — v7.8.0 patch adds `ignorePatterns` at root level of generated oxlint config; Oxlint does not merge patterns through `extends` [source](./.skilld/releases/ultracite@7.8.0.md#L21-L22)

- BREAKING: Husky hook file restaging — v7.8.0 patch hardens generated Husky hook to use `git add -- "$file"` preventing option-shaped filenames from being interpreted as Git options [source](./.skilld/releases/ultracite@7.8.0.md#L19-L20)

**Also changed:** Biome rule additions `suspicious/noDuplicateDependencies` (v7.7.0) · Oxlint + Stylelint rules added in v7.8.2 · ESLint preset consolidation and stale rule removals (v7.7.0) · Next.js preset `next-env.d.ts` override (v7.7.0) · Remix preset `routeTree.gen.ts` overrides (v7.7.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Ultracite v7.8.3 Best Practices

## Best Practices

- Layer framework-specific presets after `core` in your linter config — import the base preset first, then add framework presets like `react`, `next`, or the new `tanstack` preset in the `extends` array. This ensures framework rules only apply where needed and keeps configuration focused [source](./.skilld/docs/configuration.mdx#framework-presets)

- Know which fixes are "safe" (auto-fixable without manual review) — `noUnusedImports`, `useBlockStatements`, and `useSortedClasses` are marked as safe and apply during `ultracite fix`. Other fixes either require `--unsafe` or manual intervention [source](./.skilld/docs/configuration.mdx#safe-fixes)

- For Biome, enable type-aware rules at init time via `--type-aware`; for Oxlint, pass the flag at runtime — Biome bakes type-aware rules into the config once, while Oxlint requires `--type-aware` or `--type-check` flags on each `check` or `fix` invocation [source](./.skilld/docs/usage.mdx#type-aware-linting)

- When excluding files with negated patterns in `files.includes`, always lead with `"**"` — Biome requires at least one positive glob to anchor matches; negated-only patterns like `["!public"]` result in zero files being matched [source](./.skilld/docs/troubleshooting.mdx)

- Use `--quiet` mode in CI and scripted environments for non-interactive setup — automatically enabled when `CI=true` or `CI=1`, suppresses prompts and spinners, uses sensible defaults (Biome if no linter specified), and exits cleanly [source](./.skilld/docs/setup.mdx#programmatic-usage)

- Run `ultracite fix --unsafe` intentionally only for behavior-changing fixes — Ultracite marks fixes unsafe when they may alter runtime semantics (e.g., rewriting `substring()` to `slice()`). Always review the result when using `--unsafe` [source](./.skilld/docs/usage.mdx#fixing-code)

- In monorepos, run single root scripts (`ultracite check` / `ultracite fix`) rather than per-package scripts — Biome and Oxlint are fast enough to lint the entire monorepo in one pass, eliminating coordination overhead [source](./.skilld/docs/monorepos.mdx)

- Choose Biome for pure JavaScript/TypeScript/JSON/CSS/GraphQL projects, Oxlint for raw speed on large codebases, or ESLint + Prettier + Stylelint for maximum language coverage — each toolchain trades speed, ecosystem depth, and language support differently [source](./.skilld/docs/languages.mdx#choosing-a-toolchain)

- During init, pass both `--agents` (for AI coding rules) and `--hooks` (for post-edit formatting hooks) separately — they serve different purposes: agents guide AI during generation, hooks auto-format after edits [source](./.skilld/docs/hooks.mdx#setup)

- Before switching linters, remove or disable your old config files (`.eslintrc`, `.prettierrc`, `biome.jsonc` from the previous tool) — leftover configs can be auto-discovered by VS Code extensions and cause duplicate diagnostics [source](./.skilld/docs/troubleshooting.mdx)

- In lefthook, always set `stage_fixed: true` for the Ultracite job — this restages formatted files after the hook runs, so the commit includes the fixed formatting [source](./.skilld/docs/git-hooks.mdx#lefthook)

- Run `ultracite doctor` immediately after `ultracite init` to validate setup — it checks linter detection, config file presence, and editor integration and provides actionable recommendations [source](./.skilld/docs/usage.mdx#validating-setup)

- In Biome, understand that Ultracite uses an opt-in configuration approach where every rule is explicitly specified — nothing is implicitly inherited, giving full visibility but requiring intentional choices when customizing [source](./.skilld/docs/provider/biome.mdx#configuration-approach)

- Enable TypeScript's strict mode (`"strict": true` in `tsconfig.json`) when using Ultracite — type-aware rules assume strictness; loose settings (missing `strictNullChecks`) may produce false positives around undefined handling [source](./.skilld/docs/troubleshooting.mdx)
<!-- /skilld:best-practices -->

Related: zod-skilld
