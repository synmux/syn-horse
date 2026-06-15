---
name: vue-skilld
description: "ALWAYS use when editing or working with *.vue files or code importing \"vue\". Consult for debugging, best practices, or modifying vue, core."
metadata:
  version: 3.5.38
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# vuejs/core `vue@3.5.38`
**Tags:** csp: 1.0.28-csp, legacy: 2.7.16, v2-latest: 2.7.16

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vue` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vue` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

## BREAKING CHANGES (v3.4)

- BREAKING: Global `JSX` namespace removed — requires explicit configuration via `jsxImportSource: 'vue'` in `tsconfig.json` or `/* @jsxImportSource vue */` comment per file; alternatively reference `vue/jsx` to retain pre-3.4 global behavior [source](./.skilld/releases/blog-3.4.md#global-jsx-namespace)

- BREAKING: Reactivity Transform feature removed — was marked deprecated in v3.3; migrate to Vue Macros plugin if needed [source](./.skilld/releases/blog-3.4.md#removed-deprecated-features)

- BREAKING: `app.config.unwrapInjectedRef` removed — was deprecated and enabled by default in v3.3; behavior can no longer be disabled [source](./.skilld/releases/blog-3.4.md#other-removed-features)

- BREAKING: `@vnodeXXX` event listeners now a compiler error — use `@vue:XXX` listeners instead; previously only a deprecation warning [source](./.skilld/releases/blog-3.4.md#other-removed-features)

- BREAKING: `v-is` directive removed — was deprecated in v3.3; use `is` attribute with `vue:` prefix instead [source](./.skilld/releases/blog-3.4.md#other-removed-features)

## NEW APIs (v3.5)

- NEW: `useTemplateRef(key: string)` — runtime-based template ref API that supports dynamic ref bindings, replaces static ref + variable pattern; returns `Readonly<ShallowRef<T | null>>` [source](./.skilld/docs/api/composition-api-helpers.md#usetemplateref)

- NEW: `onWatcherCleanup(callback)` — registers cleanup callbacks within watchers for side-effect cleanup (e.g. aborting fetch requests); globally imported and can be called directly in watch callback [source](./.skilld/docs/api/reactivity-core.md#onwatchercleanup)

- NEW: `useId()` — generates unique-per-application IDs guaranteed stable across server and client renders; used for SSR-safe form element and accessibility attribute IDs without hydration mismatches [source](./.skilld/docs/api/composition-api-helpers.md#useid)

- NEW: Lazy Hydration — `defineAsyncComponent()` now accepts a `hydrate` option to control when async components hydrate; `hydrateOnVisible()` strategy hydrates components when they become visible [source](./.skilld/releases/blog-3.5.md#lazy-hydration)

- NEW: `<Teleport defer>` prop — defers teleport mount until after current render cycle, allowing teleportation to Vue-rendered target elements that don't yet exist [source](./.skilld/releases/blog-3.5.md#deferred-teleport)

- NEW: `data-allow-mismatch` attribute — suppresses SSR hydration mismatch warnings for intentional client/server value differences (e.g. date formatting); accepts optional value to limit mismatch types (`text`, `children`, `class`, `style`, `attribute`) [source](./.skilld/releases/blog-3.5.md#data-allow-mismatch)

- NEW: Custom Elements improvements — `useHost()` and `useShadowRoot()` composition helpers; `this.$host` options API property; `configureApp(app)` option for app configuration; `shadowRoot: false` option to render without shadow DOM; `nonce` option for style tag nonce attributes [source](./.skilld/docs/api/custom-elements.md#usehost)

## STABLE APIs (v3.5)

- FEATURE: Reactive Props Destructure stabilized — variables destructured from `defineProps` are now reactive by default; compiler automatically prepends `props.` when accessed; enables native JavaScript default value syntax for prop defaults [source](./.skilld/docs/api/sfc-script-setup.md#reactive-props-destructure)

## STABLE APIs (v3.4)

- FEATURE: `defineModel()` stabilized — was experimental in v3.3; declares two-way binding props for `v-model`; supports modifiers and transformers via `[modelValue, modelModifiers]` destructuring [source](./.skilld/releases/blog-3.4.md#definemodel-is-now-stable)

- FEATURE: `v-bind` same-name shorthand — shortened syntax `<img :id :src :alt>` expands to `<img :id="id" :src="src" :alt="alt">`; dynamic nature aligns with JavaScript property behavior [source](./.skilld/releases/blog-3.4.md#v-bind-same-name-shorthand)

## STABLE APIs (v3.3)

- FEATURE: `defineOptions()` — declares component options directly in `<script setup>` without separate `<script>` block; hoisted to module scope [source](./.skilld/docs/api/sfc-script-setup.md#defineoptions)

- FEATURE: `defineSlots()` — provides type hints for slot names and slot prop types; requires TypeScript; only type parameter, no runtime arguments [source](./.skilld/docs/api/sfc-script-setup.md#defineslots)

- FEATURE: Generic components — `<script setup lang="ts" generic="T">` syntax enables generic type parameters on components [source](./.skilld/releases/blog-3.3.md#generic-components)

- FEATURE: Ergonomic `defineEmits` — type-based declaration with simpler syntax `foo: [id: number]` instead of call signature `(e: 'foo', id: number): void` [source](./.skilld/releases/blog-3.3.md#more-ergonomic-defineemits)

**Performance:** Reactivity system refactored in v3.4 — computed properties only re-evaluate when results change; array methods (`shift`, `unshift`, `splice`) trigger effects once; v3.5 reactivity optimisations achieve -56% memory usage and 10x speedup for large arrays · Parser rewritten for 2x template compilation speed in v3.4 · Hydration mismatch errors improved with better wording, DOM node references, and dynamic attribute checks
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Always use `<script setup lang="ts">` as the recommended syntax for Single-File Components with Composition API — it is the most modern and ergonomic way to write Vue components with built-in support for TypeScript props type inference [source](./.skilld/docs/api/sfc-script-setup.md)

- Declare props with `defineProps()` using type-based syntax in TypeScript for automatic type inference and validation — this eliminates the need to separately declare both the prop type and its TypeScript type [source](./.skilld/docs/guide/components/props.md#reactive-props-destructure)

- Lazy load route and async components using `defineAsyncComponent()` with dynamic imports to split chunks and only load them when needed, significantly improving initial page load performance [source](./.skilld/docs/guide/best-practices/performance.md#code-splitting)

- Return plain objects of refs from composables instead of reactive objects to preserve reactivity when destructuring in components — destructuring a reactive object loses the reactivity connection [source](./.skilld/docs/guide/reusability/composables.md#return-values)

- Always register lifecycle hooks and composables synchronously within `<script setup>` or `setup()` to maintain proper component context binding — calling them asynchronously breaks the active instance tracking [source](./.skilld/docs/guide/essentials/lifecycle.md#registering-lifecycle-hooks)

- Use `toValue()` when accepting composable input arguments that may be refs, getters, or raw values to normalize all forms into usable values while preserving reactivity tracking [source](./.skilld/docs/guide/reusability/composables.md#input-arguments)

- Solve prop drilling by using provide/inject at the ancestor level to avoid passing props through intermediate components — use Symbols as injection keys for better type safety and avoiding collisions [source](./.skilld/docs/guide/components/provide-inject.md#prop-drilling)

- Use `shallowRef()` or `shallowReactive()` only for large immutable data structures where deep reactivity overhead is measurable and you accept treating nested objects as immutable [source](./.skilld/docs/guide/best-practices/performance.md#reduce-reactivity-overhead-for-large-immutable-structures)

- Minimize unnecessary component abstractions (renderless components, higher-order components) especially in large lists, as component instances are more expensive than plain DOM nodes [source](./.skilld/docs/guide/best-practices/performance.md#avoid-unnecessary-component-abstractions)

- Keep props passed to child components stable across updates — compute boolean flags in the parent before passing them rather than passing raw data and comparing in the child [source](./.skilld/docs/guide/best-practices/performance.md#props-stability)

- Always clean up side effects in `onUnmounted()` when registering DOM listeners or other resources in composables or components to prevent memory leaks [source](./.skilld/docs/guide/reusability/composables.md#side-effects)

- Never use non-trusted content (user-provided strings) as component templates — this bypasses Vue's security protections and allows arbitrary JavaScript execution [source](./.skilld/docs/guide/best-practices/security.md#rule-no-1-never-use-non-trusted-templates)

- Rely on Vue's automatic HTML escaping for interpolated content in templates rather than manually sanitizing; only use `v-html` when you absolutely control the content source [source](./.skilld/docs/guide/best-practices/security.md#html-content)

- Extract shared state into a singleton store using `reactive()` and import it into multiple components rather than prop drilling or using global variables for distributed state [source](./.skilld/docs/guide/scaling-up/state-management.md#simple-state-management-with-reactivity-api)
<!-- /skilld:best-practices -->
