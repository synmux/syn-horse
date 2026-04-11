---
name: nuxt-eslint-skilld
description: 'ALWAYS use when writing code importing "@nuxt/eslint". Consult for debugging, best practices, or modifying @nuxt/eslint, nuxt/eslint, nuxt eslint, eslint.'
metadata:
  version: 1.15.2
  generated_at: 2026-04-11
---

# nuxt/eslint `@nuxt/eslint@1.15.2`

**Tags:** next: 0.3.0-beta.10, latest: 1.15.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/eslint` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Best Practices

- Run `nuxt prepare` (or `nuxi prepare`) before linting -- `withNuxt()` imports from `.nuxt/eslint.config.mjs` which is only generated during the Nuxt build/prepare phase, not from the npm package directly [source](./.skilld/issues/issue-609.md)

- Set `config.standalone` to `false` in `nuxt.config.ts` when combining with external config presets like `@antfu/eslint-config` -- standalone mode (the default) bundles its own base configs (JS, TS, Vue, import plugins), which causes "Different instances of plugin" errors when another preset provides the same plugins [source](./.skilld/issues/issue-568.md)

- Use `nuxt/typescript/rules` as the override key for TypeScript rule customisation, not `nuxt/typescript` -- the actual named config containing the rules is `nuxt/typescript/rules`, while `nuxt/typescript` refers only to the plugin setup block [source](./.skilld/issues/issue-574.md)

- Enable type-aware linting by setting `typescript: { tsconfigPath: './tsconfig.json' }` in the module config rather than manually adding `parserOptions.project` -- this activates `projectService` and automatically includes `recommended-type-checked` and `strict-type-checked` rulesets [source](./.skilld/discussions/discussion-544.md)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      typescript: {
        strict: true,
        tsconfigPath: "./tsconfig.json"
      }
    }
  }
})
```

- Wrap third-party flat config objects in an array when passing to `withNuxt()` -- single config objects are not iterable, so spreading them with `...config` throws a `[Symbol.iterator]` error [source](./.skilld/discussions/discussion-409.md#accepted-answer)

- The built-in import config does not include `import/order` -- it only provides `import/first`, `import/no-duplicates`, `import/no-mutable-exports`, and `import/no-named-default`. Import sorting requires adding a separate plugin or rule configuration [source](./.skilld/discussions/discussion-593.md)

- When `formatters: true` is set, markdown formatting is disabled by default because many Nuxt projects use MDC syntax with `@nuxt/content`, which Prettier does not fully understand -- enable it explicitly with `formatters: { markdown: true }` only if not using MDC [source](./.skilld/pkg-eslint/dist/chunks/formatters.mjs:L30)

- Enabling `stylistic` automatically activates `nuxt/nuxt-config-keys-order` to enforce consistent key ordering in `nuxt.config.ts` -- this is controlled by `sortConfigKeys` which defaults to `true` when stylistic is on [source](./.skilld/pkg-eslint/dist/shared/eslint-config.Bw-e4MbC.mjs:L127)

- Use `vue/block-order` instead of `vue/component-tags-order` for SFC tag ordering -- the latter is removed from the bundled eslint-plugin-vue and will throw "Could not find" errors at runtime [source](./.skilld/discussions/discussion-618.md)

- Use `.remove()` instead of `.override()` to replace built-in config layers like gitignore -- for example, to lint git submodules, remove the auto-generated gitignore config and add a custom `eslint-config-flat-gitignore` instance with `filesGitModules: []` [source](./.skilld/discussions/discussion-600.md#accepted-answer)

- Use `.onResolved()` for bulk rule mutations across all configs -- for example, downgrading all `@typescript-eslint` and `@stylistic` errors to warnings in one pass rather than overriding each rule individually [source](./.skilld/discussions/discussion-588.md)

- When `stylistic` is not enabled, the module explicitly disables 10+ Vue template formatting rules (`html-indent`, `html-quotes`, `max-attributes-per-line`, `multiline-html-element-content-newline`, etc.) by setting them to `undefined` -- this prevents Vue's recommended config from enforcing formatting that conflicts with external formatters like Prettier [source](./.skilld/pkg-eslint/dist/chunks/vue.mjs:L136)

- Pass ignores as a standalone config object inside an array to `withNuxt()`, not as a property mixed into a rules config -- global ignores in flat config only work when the config object contains only `ignores` and no other keys like `rules` or `files` [source](./.skilld/discussions/discussion-413.md#accepted-answer)

- Use `// @ts-expect-error` or type casting when spreading `typescript-eslint` configs into `withNuxt()` -- the types from `typescript-eslint` are incompatible with ESLint's core `FlatConfig` types, which is an upstream issue acknowledged by the maintainer with no planned fix in `@nuxt/eslint` [source](./.skilld/issues/issue-497.md)
<!-- /skilld:best-practices -->
