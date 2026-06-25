---
name: nuxt-eslint-skilld
description: "ALWAYS use when writing code importing \"@nuxt/eslint\". Consult for debugging, best practices, or modifying @nuxt/eslint, nuxt/eslint, nuxt eslint, eslint."
metadata:
  version: 1.16.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# nuxt/eslint `@nuxt/eslint@1.16.0`
**Tags:** next: 0.3.0-beta.10, latest: 1.16.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @nuxt/eslint v1.16.0.

- BREAKING: `@nuxtjs/eslint-module` functionality merged into `@nuxt/eslint` via `checker` option — replaces module with `@nuxt/eslint` and options under `eslint.checker` [source](./.skilld/docs/content/2.guide/1.migration.md)

- NEW: `eslint:config:addons` hook — register custom ESLint config integrations before config generation [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `features.tooling` option (experimental) — module authors can enable unicorn, regexp and jsdoc rules for library/module best practices [source](./.skilld/docs/content/1.packages/1.config.md)

- NEW: `features.typescript.tsconfigPath` option — enable type-aware ESLint rules for TypeScript and Vue files [source](./.skilld/docs/content/1.packages/1.config.md)

- NEW: `devtools` option in config — customize ESLint Config Inspector integration in Nuxt DevTools with `enabled` (bool/'lazy') and `port` settings [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `configType: 'eslintrc'` option in checker — run legacy `.eslintrc` config mode in dev server checker if needed [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `FlatConfigComposer` chainable API — returns extended API with `.prepend()`, `.override()`, and other composition methods [source](./.skilld/docs/content/1.packages/1.config.md)

- NEW: `config.autoInit` option — disable auto-generation of `eslint.config.mjs` on server start (default: `true`) [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `config.standalone: false` option — disable default JS/TS/Vue plugin setup to use custom config presets [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `config.stylistic` option — enable and customize ESLint Stylistic rules with indent, semi, and other settings [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `checker: true` option — enable optional dev server ESLint checker integration with `vite-plugin-eslint2` or `eslint-webpack-plugin` [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `checker.lintOnStart` option — lint files on dev server startup (default: `true`) [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `checker.fix` option — run `eslint --fix` during dev server checks (default: `false`) [source](./.skilld/docs/content/1.packages/0.module.md)

- NEW: `nuxt/prefer-import-meta` rule — enforces `import.meta.client`/`import.meta.server` over `process.client`/`process.server` [source](./.skilld/docs/content/1.packages/2.plugin.md)

- NEW: `createConfigForNuxt()` factory function — creates project-aware ESLint flat config for Nuxt with chainable composition [source](./.skilld/docs/content/1.packages/1.config.md)

**Also changed:** `defineFlatConfigs()` utility · `resolveOptions()` for config resolution · `.override()` method for rule customization · flat config format as default (ESLint 8.45.0+) · legacy `@nuxtjs/eslint-config` packages in maintenance mode
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Start new Nuxt projects with the `@nuxt/eslint` module using `npx nuxi module add eslint` — it auto-generates project-aware flat config and includes DevTools integration, making it significantly easier than manual setup [source](./.skilld/docs/content/1.packages/0.module.md#quick-setup)

- Always use ESLint flat config format (supported since v8.45.0) — legacy `.eslintrc` configuration is not supported by this module and you should migrate to ensure future-proof setup [source](./.skilld/docs/content/1.packages/0.module.md:L1-11)

- Install TypeScript as a dev dependency when using `@nuxt/eslint` with TypeScript — the module requires it for type inference and proper IDE support [source](./.skilld/docs/content/1.packages/0.module.md:L40-59)

- Pass external ESLint configs inside an array when composing with `withNuxt()` — non-iterable single config objects cause Symbol.iterator errors; wrap each external config like `withNuxt([unocss, { rules: {...} }])` [source](./.skilld/discussions/discussion-409.md#accepted-answer)

- Create ignores as a separate config object without a `name` property to ensure they work correctly — named ignores may not function in ESLint flat config composition [source](./.skilld/discussions/discussion-413.md#accepted-answer)

- Use `.prepend()` to add ignores before Nuxt rules when they need priority, ensuring patterns are evaluated before Nuxt's built-in configurations [source](./.skilld/discussions/discussion-413.md#accepted-answer)

- Enable stylistic rules via the `eslint.config.stylistic` option in `nuxt.config.ts` if you prefer ESLint over Prettier for formatting — this integrates ESLint Stylistic rules directly [source](./.skilld/docs/content/1.packages/0.module.md#eslint-stylistic)

- Set `config.standalone: false` when merging with other config presets like `@antfu/eslint-config` — this prevents duplicate plugin conflicts and allows your preset to handle base rules [source](./.skilld/docs/content/1.packages/0.module.md#custom-config-presets)

- Configure `languageOptions.parserOptions.project` to enable type-aware TypeScript rules like `@typescript-eslint/no-floating-promises` — without this, type-requiring rules fail with parser configuration errors [source](./.skilld/discussions/discussion-544.md#accepted-answer)

```js
// Use .prepend() for type-aware rule setup
export default withNuxt().prepend({
  languageOptions: {
    parserOptions: { project: './tsconfig.json' }
  },
  rules: { '@typescript-eslint/no-floating-promises': 'error' }
})
```

- Use the Nuxt DevTools ESLint Config Inspector to visually inspect and debug resolved flat config — this eliminates guesswork when composing complex configurations [source](./.skilld/docs/content/1.packages/0.module.md#config-inspector)

- In monorepo setups, export both `withNuxt` config (for Nuxt apps) and `createConfigForNuxt` config (for non-Nuxt packages) from a shared config package — this lets each package use the appropriate variant without re-implementation [source](./.skilld/discussions/discussion-420.md#accepted-answer)

- Disable auto-init only if you are managing `eslint.config.mjs` manually or in CI pipelines — set `config.autoInit: false` to prevent automatic generation on server start [source](./.skilld/docs/content/1.packages/0.module.md:L294-309)

- Chain FlatConfigComposer methods (`.prepend()`, `.override()`, `.append()`) to customize ESLint config — avoid rewriting the entire config; targeted mutations are safer and more maintainable [source](./.skilld/docs/content/1.packages/0.module.md#config-customizations)
<!-- /skilld:best-practices -->
