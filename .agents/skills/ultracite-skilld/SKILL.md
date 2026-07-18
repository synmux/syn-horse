---
name: ultracite-skilld
description: "ALWAYS use when writing code importing \"ultracite\". Consult for debugging, best practices, or modifying ultracite."
metadata:
  version: 7.9.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# haydenbleasel/ultracite `ultracite@7.9.3`
**Tags:** canary: 5.0.0--canary.162.3c1836f.0, latest: 7.9.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ultracite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ultracite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `tanstack` framework preset — new in v7.8.0. TanStack Query rules moved from `react` preset to new `tanstack` preset; projects relying on Query rules must opt into `tanstack` [source](./.skilld/releases/ultracite@7.8.0.md:L9:14)

- NEW: `tanstack` preset for Biome, ESLint, and Oxlint — v7.8.0 adds dedicated TanStack framework support. ESLint layers `@tanstack/eslint-plugin-query`, `@tanstack/eslint-plugin-router`, and `@tanstack/eslint-plugin-start`; Biome and Oxlint relax file-naming conventions for `routes/` and `routeTree.gen.ts` [source](./.skilld/releases/ultracite@7.8.0.md:L10:14)

- BREAKING: TanStack Router preset mapping — v7.8.0 resolves TanStack Router projects to `tanstack` preset instead of `remix` [source](./.skilld/releases/ultracite@7.8.0.md:L9:14)

- NEW: `.biome.json` and `.biome.jsonc` config file recognition — v7.8.0 adds support for dot-prefixed Biome config filenames alongside `biome.json`/`biome.jsonc`. `detectLinter`, `doctor` command, and Biome config resolver now match both forms [source](./.skilld/releases/ultracite@7.8.0.md:L16:18)

- BREAKING: NestJS ESLint preset now enforces rules — v7.7.0 fixed empty `ultracite/eslint/nestjs` preset. Now layers `@darraghor/eslint-plugin-nestjs-typed` (22 rules covering NestJS conventions, dependency injection, class-validator/Swagger). Existing consumers may see new violations [source](./.skilld/releases/ultracite@7.7.0.md:L10:14)

- BREAKING: `typescript/return-await` default changed — v7.6.4 sets `typescript/return-await` to `["error", "always"]` instead of `in-try-catch` to resolve circular conflicts between `eslint/require-await`, `typescript/promise-function-async`, and `typescript/return-await` [source](./.skilld/releases/ultracite@7.6.4.md:L23:24)

- BREAKING: `oxlint.config.ts` and `oxfmt.config.ts` format — v7.5.0 migrates oxlint and oxfmt configurations from JSON to TypeScript using `defineConfig()`. CLI now generates `.ts` files instead of `.json`/`.jsonc`, all framework presets converted to TypeScript [source](./.skilld/releases/ultracite@7.5.0.md:L11:12)

- BREAKING: Removed `import-x/enforce-node-protocol-usage` rule — v7.6.1 removes nonexistent rule from ESLint core config (caused ESLint 9 to throw "Could not find rule"). Node protocol enforcement covered by existing `unicorn/prefer-node-protocol` [source](./.skilld/releases/ultracite@7.6.1.md:L13:14)

- BREAKING: `ultracite check` and `ultracite fix` now run all linters — v7.6.3 fixed short-circuiting behavior where formatter failures prevented linter invocation. Now runs every step, accumulates failures, exits with first failing tool's status [source](./.skilld/releases/ultracite@7.6.3.md:L12:13)

- BREAKING: Generated `oxfmt.config.ts` template fixed — v7.6.3 corrected template using `extends: [ultracite]` (unrecognized by oxfmt) to spread preset syntax `...ultracite` so options like `sortImports` actually apply [source](./.skilld/releases/ultracite@7.6.3.md:L13:14)

- NEW: Oxlint rules in v7.8.2 — core preset adds `eslint/prefer-named-capture-group`, `jsdoc/require-yields-description`, `node/callback-return`, `typescript/method-signature-style`, and `unicorn/import-style`. Vue preset adds 15+ new rules. Stylelint adds `display-notation: short` [source](./.skilld/releases/ultracite@7.8.2.md:L11:26)

- NEW: Oxlint rules in v7.6.4 — adds `eslint/logical-assignment-operators` (prefer `||=`, `&&=`, `??=`), `eslint/require-unicode-regexp`, `unicorn/no-negated-condition`, and 8 additional Vue/Vitest rules [source](./.skilld/releases/ultracite@7.6.4.md:L11:22)

- NEW: Oxlint rules in v7.6.3 — adds `eslint/func-name-matching`, `typescript/explicit-member-accessibility`, new Jest/Vitest split rules (`vitest/max-expects`, `vitest/max-nested-describe`), and `react/forbid-component-props` parity [source](./.skilld/releases/ultracite@7.6.3.md:L14:24)

- BREAKING: Oxlint `ignorePatterns` now applied at root — v7.8.0 adds `ignorePatterns` to generated `oxlint.config.ts` at root level (Oxlint doesn't merge patterns through `extends`); prior versions silently ignored patterns from core preset [source](./.skilld/releases/ultracite@7.8.0.md:L21:22)

- NEW: Husky hook hardening — v7.8.0 generates standalone Husky hook using `git add -- "$file"` to prevent option-shaped filenames from being interpreted as Git options [source](./.skilld/releases/ultracite@7.8.0.md:L19:20)

- BREAKING: Symlinked config file rejection — v7.8.0 rejects symlinked generated config targets before writing project files to prevent unsafe mutations [source](./.skilld/releases/ultracite@7.8.0.md:L29:30)

- BREAKING: Package manager validation — v7.8.0 validates package-manager names before generating hooks and during `ultracite init`, preventing unsafe/malicious package manager selection [source](./.skilld/releases/ultracite@7.8.0.md:L31:34)

- NEW: Package lock file exclusion — v7.5.0 excludes `bun.lock`, `bun.lockb`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` from Biome linting and formatting [source](./.skilld/releases/ultracite@7.5.0.md:L15)

**Also changed:** ESLint core strict rule enforcement v7.7.0 · Oxlint 1.60+ rules integration v7.6.0 · Biome rule additions v7.7.0 · CLI build with bun + tsgo v7.8.1 · NyPM script helper integration v7.8.1 · File operand hyphen-prefix handling v7.8.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- **Extend framework presets for specialized rules** — Ultracite ships framework-specific presets (React, Next.js, Vue, etc.) that layer on top of the core configuration. Load them in addition to `core` rather than reinventing rules per framework, using the linter's native `extends` or import mechanism [source](./.skilld/docs/configuration.mdx#framework-presets)

- **Always include `"**"` first when negating glob patterns** — When you override `files.includes` in your Biome config to exclude directories (e.g., `!components/ui/**`, `!prisma/client`), you must lead with `"**"` to include everything first, then negate what you want to exclude. Omitting the positive glob results in zero files being matched [source](./.skilld/docs/provider/biome.mdx#excluding-files)

- **Enable TypeScript strict mode to unlock Ultracite's full power** — Ultracite assumes `strictNullChecks` and full `strict` mode are enabled in `tsconfig.json`. Without them, you'll see warnings about undefined usage that TypeScript isn't catching, defeating the purpose of Ultracite's type-aware rules [source](./.skilld/docs/troubleshooting.mdx#i-get-an-error-about-strictnullchecks-or-type-issues-after-enabling-ultracite)

- **Choose your toolchain based on language coverage, not just speed** — Biome gives the tightest all-in-one experience for JS/TS/JSON/CSS/GraphQL; Oxlint is 50-100x faster but handles only JavaScript/TypeScript; ESLint + Prettier covers the widest ecosystem with plugins. Pick based on what languages your project actually uses, not assumptions [source](./.skilld/docs/languages.mdx#choosing-a-toolchain)

- **Use `ultracite doctor` to validate setup before committing to a workflow** — After installing Ultracite, always run `npx ultracite doctor` to check for configuration issues and get recommendations. This catches mismatched formatter extensions, conflicting configs, or missing dependencies before they cause CI failures [source](./.skilld/docs/usage.mdx#validating-setup)

- **Lean on safe auto-fixes for consistency; reserve `--unsafe` for intentional refactors** — Ultracite marks fixes as safe (like removing unused imports, rewriting `!=` to `!==`) or unsafe (like transforming `substring()` to `slice()`). Only run `ultracite fix --unsafe` when you explicitly want behavior changes, never in pre-commit hooks [source](./.skilld/docs/configuration.mdx#safe-fixes)

- **Set up git hooks to catch formatting issues before they reach the repo** — Use Husky, lefthook, lint-staged, or pre-commit to run `ultracite fix` on staged files before each commit. This ensures no unformatted code enters history and prevents CI failures downstream [source](./.skilld/docs/git-hooks.mdx#how-it-works)

- **Run Ultracite at the monorepo root with a single shared config** — In a monorepo, place your linter config (biome.jsonc, oxlint.config.ts, etc.) at the root and add `check`/`fix` scripts to the root `package.json`. The underlying tools are fast enough to scan the entire repo in one pass, avoiding duplicate configs per workspace [source](./.skilld/docs/monorepos.mdx#configuration)

- **Enable IDE formatting on save and format-on-paste to minimize manual work** — Ultracite integrates with VS Code via `formatOnSave`, `codeActionsOnSave`, and `formatOnPaste`. Together these keep code continuously clean without you running commands manually — the tool should be invisible [source](./.skilld/docs/usage.mdx#instant-formatting)

- **Type-aware linting requires opt-in configuration or runtime flags depending on toolchain** — For Biome, add `ultracite/biome/type-aware` to your config's `extends` array at init time; for Oxlint, pass `--type-aware` at runtime when checking/fixing. These unlock project-graph rules like `noImportCycles` and `noPrivateImports` [source](./.skilld/docs/usage.mdx#type-aware-linting)

- **Use Oxlint's optional `js-plugins` preset to close the gap with ESLint without sacrificing speed** — If you need the extra coverage from GitHub, SonarJS, or React Doctor plugins but want Oxlint's speed, opt into the `js-plugins` preset at init or edit your config. This trades some performance for broader rule coverage [source](./.skilld/docs/provider/oxlint.mdx#eslint-parity-optional)

- **Override rules only when the team agrees on the exception, not to silence warnings** — It's tempting to disable strict rules, but Ultracite's goal is convention over configuration. Before overriding a rule, discuss *why* it's too strict for your team. If you're disabling most rules, Ultracite may not be the right preset [source](./.skilld/docs/faq.mdx#q-if-i-disagree-with-a-rule-ultracite-enforces-what-should-i-do)

- **Remove or disable conflicting legacy linter configs when switching to Ultracite** — Leftover `.eslintrc`, `.prettierrc`, or competing `biome.jsonc` files cause double diagnostics and extension confusion. When adopting Ultracite, fully remove old configs or disable their extensions so one toolchain takes over [source](./.skilld/docs/troubleshooting.mdx#i-installed-ultracite-but-vs-code-still-uses-my-old-linter)

- **Use `--quiet` mode in CI/CD to suppress output and enable programmatic tooling integration** — For CI pipelines or scaffolding tools, run `npx ultracite init --quiet` to skip interactive prompts and use sensible defaults. The flag is automatically enabled when `CI=true`, making it ideal for headless environments [source](./.skilld/docs/setup.mdx#programmatic-usage)
<!-- /skilld:best-practices -->

Related: zod-skilld
