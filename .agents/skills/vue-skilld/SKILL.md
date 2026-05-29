---
name: vue-skilld
description: "ALWAYS use when editing or working with *.vue files or code importing \"vue\". Consult for debugging, best practices, or modifying vue, core."
metadata:
  version: 3.5.35
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# vuejs/core `vue@3.5.35`
**Tags:** csp: 1.0.28-csp, v2-latest: 2.7.16, legacy: 2.7.16

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vue` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vue` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `Global JSX Namespace` — v3.4 removed global JSX namespace by default, requiring explicit `jsxImportSource` or `vue/jsx` import for TSX usage [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#global-jsx-namespace)
- BREAKING: `Reactivity Transform` — v3.4 removed this experimental feature, previously deprecated in v3.3 [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#other-removed-features)
- BREAKING: `app.config.unwrapInjectedRef` — v3.4 removed this config option, deprecated and enabled by default in v3.3 [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#other-removed-features)
- BREAKING: `@vnodeXXX` event listeners — v3.4 made these a compiler error; use `@vue:XXX` instead [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#other-removed-features)
- BREAKING: `v-is` directive — v3.4 removed this, deprecated in v3.3; use the `is` attribute with `vue:` prefix instead [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#other-removed-features)
- NEW: `Reactive Props Destructure` — v3.5 stabilized reactive destructuring from `defineProps`, making destructured variables reactive (experimental in v3.3) [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#reactive-props-destructure)
- NEW: `defineModel()` stable — v3.4 stabilized the `defineModel` macro for `v-model` implementation (experimental in v3.3) [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#definemodel-is-now-stable)
- NEW: `v-bind` Same-name Shorthand — v3.4 introduced shorthand syntax for `v-bind` (e.g., `:id`) [source](./.skilld/repos/vuejs/core/releases/blog-3.4.md#v-bind-same-name-shorthand)
- NEW: `useTemplateRef()` — v3.5 introduced a new API for obtaining Template Refs via runtime string IDs [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#usetemplateref)
- NEW: `onWatcherCleanup()` — v3.5 introduced for registering cleanup callbacks in watchers [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#onwatchercleanup)
- NEW: `useId()` — v3.5 introduced for generating unique, stable IDs across server/client renders [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#useid)
- NEW: `Teleport` `defer` prop — v3.5 added `defer` prop to `<Teleport>` for deferred mounting [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#deferred-teleport)
- NEW: `defineOptions` — v3.3 introduced macro to declare component options directly in `<script setup>` [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#defineoptions)
- NEW: `defineSlots` — v3.3 introduced macro for typed slots [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#typed-slots-with-defineslots)
- NEW: `Imported and Complex Types` in Macros — v3.3 enhanced `defineProps` and `defineEmits` to support imported and some complex types [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#imported-and-complex-types-support-in-macros)
- NEW: `Generic Components` — v3.3 enabled generic type parameters in `<script setup>` with `generic="T"` [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#generic-components)
- NEW: `More Ergonomic defineEmits` — v3.3 introduced a new array type syntax for `defineEmits` [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#more-ergonomic-defineemits)
- NEW: `toRef` enhanced / `toValue` — v3.3 enhanced `toRef` to support getters and introduced `toValue` [source](./.skilld/repos/vuejs/core/releases/blog-3.3.md#better-getter-support-with-toref-and-tovalue)
- NEW: `data-allow-mismatch` attribute — v3.5 introduced for suppressing hydration mismatch warnings [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#data-allow-mismatch)
- NEW: `Lazy Hydration` (experimental) — v3.5 allows async components to control hydration via `defineAsyncComponent` `hydrate` option [source](./.skilld/repos/vuejs/core/releases/blog-3.5.md#lazy-hydration)

**Also changed:** `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` compile-time flag v3.4 · `defineCustomElement()` improvements v3.5
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Consistent ordering of Component/instance options: Adhering to a standard order for component options improves readability and consistency across a project. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-recommended.md#component-instance-options-order)
- Consistent ordering of Element attributes: Maintaining a consistent order for attributes on elements (including components) enhances readability and makes it easier to locate specific attributes. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-recommended.md#element-attribute-order)
- Use empty lines between multi-line properties in component/instance options: Adding spacing between multi-line properties improves readability and makes components easier to skim, especially as they grow larger. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-recommended.md#empty-lines-in-component-instance-options)
- Consistent ordering of top-level elements in Single-File Components (`<script>`, `<template>`, `<style>`): Always placing `<style>` last in SFCs ensures a predictable structure and improves maintainability. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-recommended.md#single-file-component-top-level-element-order)
- Each component should be in its own file: Separating components into individual files significantly improves component discoverability and makes it easier to manage and review code. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#component-files)
- Filenames of Single-File Components should either be always PascalCase or always kebab-case: Choosing and consistently applying either PascalCase or kebab-case for SFC filenames prevents potential issues on case-insensitive file systems and aids autocompletion. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#single-file-component-filename-casing)
- Base components should begin with a specific prefix (e.g., `Base`, `App`, or `V`): Using a consistent prefix for foundational components helps identify them, groups them alphabetically in editors, and simplifies global registration. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#base-component-names)
- Child components tightly coupled with their parent should include the parent component name as a prefix: Naming child components with their parent's prefix clarifies their relationship and keeps related files together in alphabetical listings, improving context. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#tightly-coupled-component-names)
- Component names should start with the highest-level words and end with descriptive modifying words: This naming convention improves clarity and organization, especially when components are listed alphabetically, making relationships evident at a glance. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#order-of-words-in-component-names)
- Self-closing components with no content in SFCs, string templates, and JSX: Self-closing components explicitly communicate that they are not meant to contain content, leading to cleaner and more explicit code. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#self-closing-components)
- Component names should always be PascalCase in SFCs and string templates (but kebab-case in in-DOM templates): PascalCase in templates improves editor autocompletion and visual distinctiveness from HTML elements, while kebab-case is necessary for in-DOM templates due to HTML's case insensitivity. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#component-name-casing-in-templates)
- Prop names should always use camelCase during declaration: Declaring prop names in camelCase consistently aligns with JavaScript conventions, while usage in in-DOM templates requires kebab-casing. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#prop-name-casing)
- Complex expressions in templates should be refactored into computed properties or methods: Moving complex logic out of templates into computed properties or methods makes templates more declarative, readable, and enables reusability of the logic. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#simple-expressions-in-templates)
- Complex computed properties should be split into as many simpler properties as possible: Breaking down complex computed properties into smaller, well-named ones improves testability, readability, and makes the code more adaptable to evolving requirements. [source](./.skilld/references/vue@3.5.35/docs/style-guide/rules-strongly-recommended.md#simple-computed-properties)
<!-- /skilld:best-practices -->
