---
name: ultracite-skilld
description: "The AI-ready formatter that helps you write and generate code faster. ALWAYS use when writing code importing \"ultracite\". Consult for debugging, best practices, or modifying ultracite."
metadata:
  version: 7.8.0
  generated_by: cached
  generated_at: 2026-05-29
---

# haydenbleasel/ultracite `ultracite@7.8.0`
**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.8.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: TanStack Query rules moved from `react` preset to `tanstack` preset. Projects relying on Query rules must now opt into `tanstack`. [source](./ultracite@7.8.0.md#minor-changes)

- BREAKING: TanStack Router projects now resolve to `tanstack` preset instead of `remix`. [source](./ultracite@7.8.0.md#minor-changes)

- NEW: `tanstack` framework preset for Biome, ESLint, and Oxlint. [source](./ultracite@7.8.0.md#minor-changes)

- NEW: `.biome.json` and `.biome.jsonc` recognized as valid Biome config files. [source](./ultracite@7.8.0.md#patch-changes)

- BREAKING: `nestjs` ESLint preset now enforces rules using `@darraghor/eslint-plugin-nestjs-typed`. Users who previously imported the empty preset may see new violations. [source](./ultracite@7.7.0.md#minor-changes)

- BREAKING: ESLint presets aligned with Oxlint configs, tightening rules across core, next, remix, react, jest, vitest.
  - core: `complexity`, `no-unused-private-class-members`, `sort-keys`, `sort-vars`, `prefer-destructuring`, `no-confusing-void-expression`, `no-misused-promises`, `prefer-readonly`, `strict-boolean-expressions`, `return-await: ["error", "always"]`, `consistent-type-specifier-style: ["error", "prefer-top-level"]`.
  - next: `next-env.d.ts` override disables `import-x/no-unassigned-import`.
  - remix: `routeTree.gen.ts` override disables `unicorn/filename-case` and `unicorn/no-abusive-eslint-disable`.
  - react: Disabled `react/jsx-boolean-value`, `react/no-unknown-property`, `react/only-export-components`.
  - jest: Broadened test globs. Disabled `no-empty-function`, `promise/prefer-await-to-then`, `jest/require-hook`, `jest/no-conditional-in-test`, `jest/no-hooks`, `jest/prefer-expect-assertions`.
  - vitest: Broadened test globs. Disabled `no-empty-function`, `promise/prefer-await-to-then`. Removed `prefer-importing-vitest-globals`, `prefer-to-have-been-called-times` disables. Added `prefer-lowercase-title: off`, `valid-title: off`.
  [source](./ultracite@7.7.0.md#patch-changes)

- NEW Rules: Biome core config adds `suspicious/noDuplicateDependencies` (error) and `suspicious/useDeprecatedDate` (off). [source](./ultracite@7.7.0.md#patch-changes)

- BREAKING: Oxlint and Oxfmt configurations migrated from JSON (`.oxlintrc.json`, `.oxfmtrc.jsonc`) to TypeScript (`oxlint.config.ts`, `oxfmt.config.ts`) using `defineConfig`. [source](./ultracite@7.5.0.md#minor-changes)

**Also changed:**
ultracite@7.8.0: Oxlint rules added to core, React, Vitest presets (id-match, no-implicit-globals, etc.) [source](./ultracite@7.8.0.md#patch-changes) ·
ultracite@7.7.0: Removed redundant `react-hooks/exhaustive-deps: "error"` override [source](./ultracite@7.7.0.md#patch-changes) ·
ultracite@7.7.0: Cleaned up `config/eslint/core/rules/typescript.mjs` (removed 22 stale overrides) [source](./ultracite@7.7.0.md#patch-changes) ·
ultracite@7.6.0: New Biome rules [source](./ultracite@7.6.0.md#minor-changes) ·
ultracite@7.6.0: New oxlint 1.160.0 rules [source](./ultracite@7.6.0.md#minor-changes)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Remove ESLint/Prettier configs when using Ultracite to avoid conflicts and leverage Biome's unified functionality. [source](docs/faq.mdx#q-do-i-still-need-eslint-or-prettier-if-i-use-ultracite)

- Embrace Ultracite's stylistic conventions for project consistency, rather than extensively overriding default rules. [source](docs/faq.mdx#q-if-i-disagree-with-a-rule-ultracite-enforces-what-should-i-do)

- Always review Ultracite release notes before upgrading to anticipate new rules or changes that may introduce warnings. [source](docs/faq.mdx#q-how-often-is-ultracite-updated)

- Employ `ultracite fix --unsafe` cautiously for specific Biome rules (e.g., `noSubstr`) that provide behavioral-changing but often beneficial fixes. [source](docs/faq.mdx#q-can-ultracite-fix-all-issues-it-finds)

- To resolve corepack installation errors with `pnpm dlx ultracite init`, update corepack to v0.34.0+ or upgrade Node.js to v22+. [source](docs/faq.mdx#q-im-getting-a-corepack-error-during-installation--what-should-i-do)

- Utilize framework-specific presets (e.g., `ultracite/biome/react`) alongside the `core` configuration to apply targeted linting rules without unnecessary overhead. [source](docs/configuration.mdx#framework-presets)

- Rely on Ultracite's default TypeScript strictness to enforce robust typing, discourage `any` usage, and ensure proper `null`/`undefined` handling. [source](docs/configuration.mdx#default-configuration)

- Be aware that `ultracite fix` will safely auto-fix issues like `noUnusedImports`, `useBlockStatements`, and `useSortedClasses` without altering code behavior. [source](docs/configuration.mdx#safe-fixes)

- Generate editor-specific rule files via `npx ultracite init` to guide AI coding assistants in generating consistent, high-quality code. [source](docs/rules.mdx#setup)

- Recognize that Ultracite's editor rules for AI focus on code quality and implementation guidance, leaving formatting concerns to the project's configured formatter for portability. [source](docs/rules.mdx#rules)

- When available, leverage the global Ultracite skill for AI tools to establish consistent baseline coding guidance across repositories, deferring formatting to project-level configurations. [source](docs/rules.mdx#reusable-skills)

- Integrate Ultracite with your IDE (e.g., VS Code) to receive instant formatting and linting feedback on save, leveraging `codeActionsOnSave` and `formatOnPaste`. [source](docs/usage.mdx#ide-integration)

- Run `npx ultracite doctor` after installation to validate your setup and receive recommendations for correct configuration. [source](docs/usage.mdx#validating-setup)

- Enable type-aware linting (via `--type-aware` flag during `ultracite init` for Biome or at runtime for Oxlint) for deeper analysis and bug detection using TypeScript's type system. [source](docs/usage.mdx#type-aware-linting)
<!-- /skilld:best-practices -->

Related: zod-skilld
