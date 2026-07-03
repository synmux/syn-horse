---
name: ultracite-skilld
description: 'ALWAYS use when writing code importing "ultracite". Consult for debugging, best practices, or modifying ultracite.'
metadata:
  version: 7.8.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# haydenbleasel/ultracite `ultracite@7.8.4`

**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.8.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- BREAKING: `tanstack` framework preset — TanStack Query/Router rules moved from `react` preset to new `tanstack` preset in v7.8.0. Projects relying on Query rules must explicitly opt into `tanstack` preset; TanStack Router projects now resolve to `tanstack` instead of `remix` [source](./.skilld/releases/ultracite@7.8.0.md:L11:L13)

- NEW: `.biome.json` and `.biome.jsonc` configuration files — v7.8.0 added support for dot-prefixed Biome config filenames. `detectLinter` and the `doctor` command now match `.biome.json`/`.biome.jsonc` alongside standard names, following Biome's documented configuration resolution order [source](./.skilld/releases/ultracite@7.8.0.md:L17)

- BREAKING: Oxlint configuration format — v7.5.0 migrated oxlint and oxfmt configurations from JSON to TypeScript using `defineConfig`. CLI now generates `oxlint.config.ts` and `oxfmt.config.ts` instead of `.oxlintrc.json` and `.oxfmtrc.jsonc` [source](./.skilld/releases/ultracite@7.5.0.md:L11:L12)

- NEW: `nestjs` ESLint preset enforcement — v7.7.0 wired up the `nestjs` preset to actually enforce rules. Previously exported an empty config; now layers `@darraghor/eslint-plugin-nestjs-typed` (22 rules covering NestJS conventions, dependency injection, and class-validator/Swagger usage). Consumers may see new violations on first run [source](./.skilld/releases/ultracite@7.7.0.md:L10:L14)

- FIXED: Oxlint `ignorePatterns` application — v7.8.0 fixed silent bug where `ignorePatterns` set in core preset were ignored because Oxlint does not merge them through `extends`. Generated config now sets `ignorePatterns` at root level for actual enforcement [source](./.skilld/releases/ultracite@7.8.0.md:L21:L22)

- FIXED: Oxlint TanStack preset filename conventions — v7.8.1 corrected route files under `routes/` and `app/routes/` to be exempt from `unicorn/filename-case`, matching v7.8.0 documentation [source](./.skilld/releases/ultracite@7.8.1.md:L12)

**Also changed:** Biome stable rules added in v7.7.0 · ESLint preset alignment with Oxlint configs in v7.7.0 · New Oxlint/Stylelint rules enabled in v7.8.2 · Package manager validation hardened in v7.8.0 · Generated `oxlint.config.ts` now pre-formatted in v7.8.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Extend framework-specific presets rather than using generic ones — each framework (TanStack, Next.js, Remix, Vue) has dedicated presets that layer framework-aware rules for naming conventions, generated files, and plugin integration [source](./.skilld/releases/ultracite@7.8.0.md#minor-changes)

- Use `defineConfig()` helper for Oxlint and Oxfmt configurations — migrating from JSON to TypeScript enables type inference and ensures consistency [source](./.skilld/releases/ultracite@7.5.0.md#minor-changes)

- Override specific rules in your project config rather than disabling entire presets — when a rule conflicts with your use case (e.g., `useAwait` in abstract base classes), override it at the project level instead of turning off the whole framework preset [source](./.skilld/discussions/discussion-243.md)

- Run `ultracite doctor` to verify setup before troubleshooting — the diagnostic command catches configuration issues early and provides actionable guidance [source](./.skilld/pkg/README.md#commands)

- Pass `ignorePatterns` at the root level of Oxlint configs — Oxlint does not merge patterns through `extends`, so they must be duplicated at the top level to actually apply [source](./.skilld/releases/ultracite@7.8.0.md#patch-changes)

- Exclude package-manager lock files from linting — lock files (`bun.lock`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) should be in `ignorePatterns` to avoid spurious violations [source](./.skilld/releases/ultracite@7.5.0.md#patch-changes)

- Use `--type-aware` flag during init for projects that need type-safe linting — enables additional TypeScript-aware rules across the codebase [source](./.skilld/pkg/README.md#common-init-flags)

- Align ESLint and Oxlint presets for cross-toolchain consistency — when using both linters, keep rule configurations synchronized since they share rule semantics [source](./.skilld/releases/ultracite@7.7.0.md#patch-changes)

- Leverage dynamic-enable pattern for plugin integration — framework presets dynamically enable all non-deprecated rules from framework plugins rather than hand-picking individual rules [source](./.skilld/releases/ultracite@7.7.0.md#patch-changes)

- Use `ultracite init --quiet` in CI environments to suppress interactive prompts — prevents blocking automation workflows when running setup in non-interactive contexts [source](./.skilld/pkg/README.md#common-init-flags)

- Test rule changes against your codebase before committing config updates — when Ultracite enables new rules in a patch release, review violations in context before merging changes [source](./.skilld/discussions/discussion-584.md)

- Avoid relying on framework auto-detection alone for monorepo projects — explicitly specify `--frameworks` during init to ensure all packages get the correct framework presets [source](./.skilld/pkg/README.md#common-init-flags)

- Keep Biome's default formatter settings unless overriding for a specific reason — Ultracite aligns with Biome's defaults (e.g., `formatter.quoteStyle: "double"`) to simplify migration and reduce cognitive overhead [source](./.skilld/discussions/discussion-168.md)

- Monitor the Ultracite `/updates` page for rule change explanations — rule enablement/disablement decisions are documented with reasoning to help teams understand configuration drift [source](./.skilld/discussions/discussion-584.md)

<!-- /skilld:best-practices -->

Related: zod-skilld
