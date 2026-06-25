---
name: prettier-skilld
description: "ALWAYS use when writing code importing \"prettier\". Consult for debugging, best practices, or modifying prettier."
metadata:
  version: 3.8.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# prettier/prettier `prettier@3.8.4`
**Tags:** next: 4.0.0-alpha.13, latest: 3.8.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p prettier` instead of grepping `.skilld/` directories. Run `skilld search --guide -p prettier` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Custom Parser API — removed in v3.0.0, superseded by the Plugin API [source](./.skilld/docs/api.md:L141:L195)

- NEW: Plugin printer property `printPrettierIgnored` — new in v3.7.0, allows plugins to handle prettier-ignore'd nodes [source](./.skilld/docs/plugins.md:L411:L417)

- NEW: Async `preprocess` support in parsers — first added in v3.7.0, preprocess functions can now return `Promise<string>` [source](./.skilld/docs/plugins.md:L151:L157)

- NEW: `canAttachComment` second parameter `ancestors` — added in v3.7.0, provides access to parent nodes [source](./.skilld/docs/plugins.md:L451:L451)

- NEW: `printers` type declarations in plugin exports — v3.8.1 includes available `printers` in plugin type definitions [source](./.skilld/releases/CHANGELOG.md:L107:L121)

**Also changed:** Angular v21.1/v21.2 support · SCSS `if()` function trailing comma fix · Markdown list blank lines preservation
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `prettier.resolveConfig()` to automatically discover and resolve configuration files when running Prettier programmatically — it handles directory traversal and file parsing, replacing manual config lookup logic [source](./.skilld/docs/api.md#prettierresolveconfigfilepathorfurl-options)

- Never place the `parser` option at the top level of your configuration — only use it inside `overrides` blocks, otherwise parser inference is disabled for all file types [source](./.skilld/docs/configuration.md#setting-the-parser-option)

- Define formatting options in configuration files rather than CLI flags — this allows your editor integration, Prettier CLI, and other tooling to share the same configuration [source](./.skilld/docs/cli.md#file-patterns)

- Avoid `eslint-plugin-prettier` and `stylelint-prettier` in favour of running Prettier directly — these plugins are slower, produce editor warnings on every format, and add unnecessary indirection [source](./.skilld/docs/integrating-with-linters.md#notes)

- Use `lint-staged` with Husky for pre-commit hooks when combining Prettier with other code quality tools like ESLint or Stylelint — it handles partially staged files and tool orchestration [source](./.skilld/docs/precommit.md#option-1-lint-staged)

- Create and maintain a `.prettierignore` file to explicitly control which files Prettier formats — this prevents mangling of generated files and allows you to safely run `prettier --write .` [source](./.skilld/docs/ignore.md#ignoring-files-prettierignore)

- Run `prettier --check` in CI pipelines to verify formatting without modifying files — it provides human-friendly output and exits with code 1 if formatting issues are found [source](./.skilld/docs/cli.md#--check)

- Enable `--cache` to speed up repeated Prettier runs in development, but remember to delete the cache when updating plugins since plugin versions are not included in cache keys [source](./.skilld/docs/cli.md#--cache)

- Pass `filepath` instead of `parser` to Prettier's API to let it automatically infer the parser from file extension — this is more maintainable than hardcoding parsers [source](./.skilld/docs/api.md#prettierformatsource-options)

- When using `prettier/standalone` in the browser, explicitly import plugins and pass them to the `plugins` array — the standalone API does not auto-load plugins from node_modules [source](./.skilld/docs/browser.md#prettierformatcode-options)

- Leverage `prettier-ignore` comments to preserve specific formatting only when necessary — most code should follow Prettier's conventions automatically [source](./.skilld/docs/ignore.md#ignoring-code-prettier-ignore-comments)

- Use TypeScript configuration files with JSDoc type annotations to get autocomplete and type checking for Prettier options — install `prettier` as a dev dependency to enable the annotation [source](./.skilld/docs/sharing-configurations.md#using-type-annotation-in-the-shared-config)

- Define the `preprocess` function in Prettier plugins to transform AST before printing when performance or special formatting logic is needed — it's called once per file, making it efficient for complex transformations [source](./.skilld/docs/plugins.md#optional-preprocess)

- When publishing shared Prettier configurations that include plugins, declare those plugins as `dependencies` (not `peerDependencies`) in `package.json` to ensure they are available when the config is used [source](./.skilld/docs/sharing-configurations.md#include-plugins-in-shareable-configurations)
<!-- /skilld:best-practices -->
