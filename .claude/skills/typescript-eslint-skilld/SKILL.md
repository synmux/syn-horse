---
name: typescript-eslint-skilld
description: 'ALWAYS use when writing code importing "typescript-eslint". Consult for debugging, best practices, or modifying typescript-eslint, typescript eslint.'
metadata:
  version: 8.60.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-27
---

# typescript-eslint/typescript-eslint `typescript-eslint@8.60.0`

**Tags:** rc-v8: 8.0.0-alpha.62, latest: 8.60.0, canary: 8.60.1-alpha.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p typescript-eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p typescript-eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `ban-types` rule replaced by `no-restricted-types`, `no-unsafe-function-type`, `no-wrapper-object-types` in `v8.0.0`. Old rule removed. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L438)

- BREAKING: `no-useless-template-literals` rule removed in `v8.0.0`. Previously deprecated in `v7.12.0`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L436)

- BREAKING: `no-throw-literal` rule removed in `v8.0.0`. Previously deprecated in `v7.4.0` and replaced with `only-throw-error`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L434)

- DEPRECATED: `tseslint.config()` was deprecated in `v8.42.0`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L186)

- NEW: Export of `util` types added in `v8.46.0`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L161)

- NEW: `config` function now allows infinitely deep array nesting in `v8.15.0`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L305)

- BREAKING: Minimum version requirements for ESLint, NodeJS, and TypeScript were bumped in `v7.0.0` (for `v8.x` migration). [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L632)

- BREAKING: Support for ESLint flat configs was added in `v7.0.0`. This implies significant configuration API changes for the `v7.x` to `v8.x` migration. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L634)

- RENAMED: `EXPERIMENTAL_useProjectService` in `typescript-estree` was stabilized and renamed to `projectService` in `v8.0.0`. [source](./.skilld/repos/typescript-eslint/typescript-eslint/releases/CHANGELOG.md:L432)

**Also changed:** `prefer-ts-expect-error` deprecated (v7.11.0) · `name` field to shared configs/flat config types (v7.6.0) · `ConfigWithExtends` type exported (v7.2.0)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- While `typescript-eslint` maintains existing stylistic rules, it generally aligns with ESLint's policy to avoid adding new stylistic or formatting rules. This approach focuses on error prevention and identifying better ways to write code, rather than enforcing subjective formatting preferences. [source](./.skilld/discussions/discussion-8091.md:L14)

- Enable `@typescript-eslint/no-unused-expressions` and `@typescript-eslint/no-unused-vars` in your configuration. These rules help identify dead code and potential logic errors, improving code quality and maintainability. `no-unused-expressions` is moving to `recommended` status. [source](./.skilld/discussions/discussion-8914.md#top-comments)

- Extend `eslint.configs.recommended` and `tseslint.configs.recommended` (or `recommendedTypeChecked`) within `tseslint.config`, and then override or add specific rules. This allows leveraging the opinionated recommended rule sets while tailoring them to project-specific needs without starting from scratch. [source](./.skilld/issues/issue-9993.md:L27)

- Wrap your ESLint configuration object with `defineConfig` from `eslint/config` and include `tseslint.configs.recommended` (or `recommendedTypeChecked`). `defineConfig` provides type-safety and autocompletion for your ESLint configuration, helping to prevent errors and improve developer experience. [source](./.skilld/issues/issue-10899.md:L38)

- Do not use both `consistent-type-imports` rule and TypeScript's `verbatimModuleSyntax` compiler option simultaneously. Choose one based on your project's needs. Using both can lead to conflicting errors; `consistent-type-imports` ensures type-only imports use `import type`, while `verbatimModuleSyntax` offers broader type/value import handling. [source](./.skilld/issues/issue-11681.md:L13)

- When possible, prefer importing `TSESLint` from the main `typescript-eslint` package rather than directly from `@typescript-eslint/utils`. This helps reduce the number of direct dependencies in your project, simplifying dependency management and potentially reducing build sizes. [source](./.skilld/discussions/discussion-9360.md:L16)

- For large monorepos with a significant number of TypeScript files, avoid using the default ESLint CLI directly for linting all files. Both ESLint and TypeScript scale linearly and synchronously, making direct CLI usage impractical and slow for massive codebases. Explore alternative scaling solutions. [source](./.skilld/discussions/discussion-8506.md#top-comments)

- When a native ESLint rule has become TypeScript-aware and duplicates functionality, prefer using the native ESLint rule over its `@typescript-eslint` extension counterpart. ESLint is actively making its core rules TypeScript-aware, simplifying configuration and reducing reliance on plugin-specific extensions. [source](./.skilld/issues/issue-11014.md:L17-L34)

- Use ESLint's `defineConfig()` function to define your configuration, as it is the recommended and future-proof approach for type-safe configuration. `defineConfig()` offers better integration with ESLint's core, provides type inference, and `tseslint.config()` is slated for feature-freeze and potential deprecation. [source](./.skilld/issues/issue-10935.md:L17-L20)

- Ensure your TypeScript configuration has `strictNullChecks: true` enabled when using `typescript-eslint`'s type-aware rules. Type-aware rules rely on strict null checking for accurate analysis, and `strictNullChecks: false` can lead to undefined behavior or missed issues. [source](./.skilld/issues/issue-11886.md:L17-L20)

- Do not blindly enable `parserOptions.projectService` for performance; instead, benchmark its performance against `parserOptions.project` in your specific project setup. While `projectService` was intended for performance, recent measurements show it can sometimes be slower than `project`, especially in larger codebases. [source](./.skilld/issues/issue-9571.md:L17-L28)

- When using `no-floating-promises` in a strict configuration, be aware that `ignoreVoid` is now respected, enforcing better handling of unhandled promises. This improves the robustness of `no-floating-promises` by correctly identifying unhandled promise rejections, even with `void` expressions. [source](./.skilld/releases/CHANGELOG.md:L1043-L1044)

- Enable the `use-unknown-in-catch-callback-variables` rule. This rule promotes safer error handling by ensuring that `catch` clause variables and callback parameters are typed as `unknown`, forcing explicit type checks. [source](./.skilld/releases/CHANGELOG.md:L1058-L1060)

- Enable the `no-unsafe-type-assertion` rule. This rule helps identify and prevent potentially unsafe type assertions that could lead to runtime errors or unexpected behavior. [source](./.skilld/releases/CHANGELOG.md:L491-L492)

- For files that are not part of a TypeScript project or where type information is not required for linting, set `parserOptions.project: false`. This can significantly improve linting performance by avoiding the overhead of TypeScript program creation for irrelevant files. [source](./.skilld/releases/CHANGELOG.md:L1424-L1425)

- If you were previously using `eslint-define-config` for type-safe configurations, migrate to ESLint's native `defineConfig()` function. `eslint-define-config` has been deprecated in favor of the official ESLint `defineConfig()` which provides canonical type-safe configuration. [source](./.skilld/discussions/discussion-8802.md#top-comments)

- When parsing untrusted JSON data (e.g., from `localStorage` or network requests), either use explicit type assertions (`as`) with an understanding of the reduced type safety, or preferably, use a validation library like Zod to ensure runtime type correctness. Directly asserting types on `JSON.parse` return values can lead to runtime errors if the data structure doesn't match the assumed type. [source](./.skilld/discussions/discussion-11060.md#top-comments)
<!-- /skilld:best-practices -->
