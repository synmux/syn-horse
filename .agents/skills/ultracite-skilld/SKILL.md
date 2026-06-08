---
name: ultracite-skilld
description: "ALWAYS use when writing code importing \"ultracite\". Consult for debugging, best practices, or modifying ultracite."
metadata:
  version: 7.8.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# haydenbleasel/ultracite `ultracite@7.8.2`
**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.8.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## ultracite API Changes

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `react` ESLint preset — TanStack Query rules moved from `react` to new `tanstack` preset in v7.8.0. Projects relying on Query rules must opt into `tanstack` instead. [source](./.skilld/releases/ultracite@7.8.0.md:L9:13)

- BREAKING: `remix` framework preset routing — TanStack Router projects now resolve to `tanstack` preset instead of `remix` in v7.8.0. Router consumers are automatically remapped. [source](./.skilld/releases/ultracite@7.8.0.md:L9:13)

- NEW: `tanstack` framework preset — v7.8.0 introduces dedicated TanStack framework support with Biome, ESLint, and Oxlint presets. Layers `@tanstack/eslint-plugin-query`, `@tanstack/eslint-plugin-router`, and `@tanstack/eslint-plugin-start`; framework detection maps `@tanstack/react-query`, `@tanstack/react-router`, and `@tanstack/react-start` to this preset. [source](./.skilld/releases/ultracite@7.8.0.md:L9:13)

- NEW: `nestjs` ESLint preset — v7.7.0 wires up the previously empty preset with 22 NestJS-specific rules from `@darraghor/eslint-plugin-nestjs-typed`, covering conventions, dependency injection, class-validator, and Swagger usage. [source](./.skilld/releases/ultracite@7.7.0.md:L9:14)

- BREAKING: Oxlint/Oxfmt config file format — v7.5.0 migrated configurations from JSON to TypeScript. CLI now generates `oxlint.config.ts` and `oxfmt.config.ts` instead of `.oxlintrc.json` and `.oxfmtrc.jsonc`. All internal framework presets converted to TypeScript. [source](./.skilld/releases/ultracite@7.5.0.md:L9:14)

- NEW: Biome config file discovery — v7.8.0 now recognizes `.biome.json` and `.biome.jsonc` as valid config files. `detectLinter`, `doctor` command, and Biome config resolver match dot-prefixed names alongside `biome.json`/`biome.jsonc`, following Biome's documented configuration resolution order. [source](./.skilld/releases/ultracite@7.8.0.md:L15:17)

- BREAKING: Oxlint `ignorePatterns` application — v7.8.0 adds `ignorePatterns` to generated oxlint config root level. Oxlint does not merge `ignorePatterns` through `extends`, so patterns set in core preset are now explicitly included. [source](./.skilld/releases/ultracite@7.8.0.md:L20:21)

- BREAKING: @typescript-eslint v8 rule overrides removed — v7.7.0 removed 22 stale overrides for rules no longer present in `@typescript-eslint/eslint-plugin` v8. Formatting rules moved to `@stylistic` (`brace-style`, `comma-dangle`, `indent`, etc.); two rules (`no-type-alias`, `sort-type-union-intersection-members`) removed upstream. No behavior change — all were dead no-ops. [source](./.skilld/releases/ultracite@7.7.0.md:L42:44)

- BREAKING: `typescript/return-await` mode — v7.6.4 sets `typescript/return-await` to `["error", "always"]` to resolve circular conflicts between `eslint/require-await`, `typescript/promise-function-async`, and `typescript/return-await`. Default `in-try-catch` mode caused autofixers to chase each other indefinitely. [source](./.skilld/releases/ultracite@7.6.4.md:L22:23)

**Also changed:** `nestjs` preset previously exported empty config, now enforces rules (v7.7.0) · new Oxlint rules in v7.8.0 (id-match, no-implicit-globals, prefer-arrow-callback, prefer-regex-literals, etc.) · new Oxlint/Stylelint rules enabled in v7.8.2 · ESLint presets aligned with oxlint configs (v7.7.0) · package-lock files excluded from Biome linting (v7.5.0) · symlinked config targets rejected before write (v7.8.0) · package-manager names validated during init (v7.8.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Layer framework presets with core preset for precise rule coverage — import `ultracite/{linter}/core` first, then add framework-specific presets like `ultracite/{linter}/react` to avoid irrelevant rules bloating base config [source](./.skilld/docs/configuration.mdx#framework-presets)

- Enable type-aware linting at init time with `--type-aware` for Biome (embeds rules in config) or pass `--type-aware` flag at runtime for Oxlint — enables rules like `noPrivateImports`, `noUnresolvedImports`, and `noImportCycles` that catch real bugs [source](./.skilld/docs/usage.mdx#type-aware-linting)

- Use `ultracite fix --unsafe` only for fixes that may change runtime behavior, such as rewriting `substr()` to `slice()` — safe fixes like removing unused imports apply automatically [source](./.skilld/docs/usage.mdx#fixing-code)

- Run `ultracite doctor` after setup to validate configuration and catch common integration issues early — ensures correct formatter, linter, and editor extension setup [source](./.skilld/docs/usage.mdx#validating-setup)

- Remove or disable conflicting linter configs and extensions when migrating to Ultracite — leftover `.eslintrc`, `.prettierrc`, or duplicate Biome configs cause VS Code to report double errors and confuse the setup [source](./.skilld/docs/troubleshooting.mdx#i-installed-ultracite-but-vs-code-still-uses-my-old-linter)

- Start with `npx ultracite init` which auto-detects frameworks from dependencies and selects matching presets — manual preset selection is error-prone and defeats the point of convenience [source](./.skilld/docs/setup.mdx#installation)

- Integrate Ultracite into git workflows with Husky, lefthook, or lint-staged using the pre-commit hook to run `npx ultracite fix` — ensures all committed code follows standards without manual intervention [source](./.skilld/docs/git-hooks.mdx#setup)

- Configure monorepos with a single root Biome config file that applies to all packages, avoiding per-package duplication — Biome and Oxlint are fast enough to lint the entire monorepo in one pass [source](./.skilld/docs/monorepos.mdx#configuration)

- For Oxfmt and Oxlint with TS configs, add `type: module` to `package.json` and use `defineConfig()` to extend presets — avoids type stripping errors under node_modules [source](./.skilld/issues/issue-467.md#top-comments)

- Configure `files.includes` with `"**"` as the first entry when using negated patterns to exclude generated or third-party files — omitting `"**"` results in zero matches and silently disables linting [source](./.skilld/docs/troubleshooting.mdx#ultracite-is-throwing-parse-errors-for-files-i-dont-want-it-to-check)

- Enable `strictNullChecks` or full `strict` mode in `tsconfig.json` before adopting Ultracite — Ultracite's lint rules assume strict TypeScript, and loose settings will produce confusing undefined-usage warnings [source](./.skilld/docs/troubleshooting.mdx#i-get-an-error-about-strictnullchecks-or-type-issues-after-enabling-ultracite)

- Use editor rules (`.claude/CLAUDE.md`, `.cursor/rules.md`, etc.) to guide AI assistants on code quality and best practices, not formatting — formatting decisions stay in the linter config so rules remain portable across projects [source](./.skilld/docs/rules.mdx#setup)

- Configure `codeActionsOnSave` and `formatOnPaste` in VS Code settings generated by Ultracite to apply all safe fixes and formatting automatically on save and paste — instant feedback eliminates manual style corrections [source](./.skilld/docs/usage.mdx#instant-formatting)

- Choose Biome for JS/TS/JSON/CSS projects needing a unified single-binary experience, ESLint + Prettier for maximum ecosystem plugin coverage, or Oxlint + Oxfmt for raw linting speed — each has different language and rule coverage tradeoffs [source](./.skilld/docs/languages.mdx#choosing-a-toolchain)

- Install the reusable Ultracite skill with `npx ultracite init --install-skill` for shared Ultracite guidance across repositories while keeping formatting rules project-local — avoids duplicating instructions in every repo's `AGENTS.md` [source](./.skilld/docs/skills.mdx#install-the-skill)
<!-- /skilld:best-practices -->

Related: zod-skilld
