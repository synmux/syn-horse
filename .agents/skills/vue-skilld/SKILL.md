---
name: vue-skilld
description: "ALWAYS use when editing or working with *.vue files or code importing \"vue\". Consult for debugging, best practices, or modifying vue, core."
metadata:
  version: 3.5.40
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# vuejs/core `vue@3.5.40`
**Tags:** csp: 1.0.28-csp, v2-latest: 2.7.16, legacy: 2.7.16

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vue` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vue` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Vue 3.5 API Changes

This document tracks version-specific API changes in Vue 3.5 that are critical for using the framework correctly.

## API Changes

**NEW: `useTemplateRef()`** — New in v3.5, replaces the previous pattern of matching variable names to static `ref` attributes. Supports dynamic ref bindings and provides better TypeScript support. [source](./.skilld/releases/blog-3.5.md#usetemplateref)

```ts
import { useTemplateRef } from 'vue'

const inputRef = useTemplateRef('input')
```

**NEW: `useId()`** — New in v3.5, generates unique, stable IDs across server and client renders. Essential for form labels and accessibility attributes in SSR applications without hydration mismatches. [source](./.skilld/releases/blog-3.5.md#useid)

```ts
import { useId } from 'vue'

const id = useId()
```

**NEW: `onWatcherCleanup()`** — New in v3.5, API for registering cleanup callbacks inside watch handlers. Useful for aborting requests or clearing timers when a watched value changes. [source](./.skilld/releases/blog-3.5.md#onwatchercleanup)

```ts
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()
  fetch(`/api/${newId}`, { signal: controller.signal })

  onWatcherCleanup(() => {
    controller.abort()
  })
})
```

**NEW: `hydrateOnVisible()`** — New in v3.5, lazy hydration strategy for async components. Defers hydration until the component becomes visible in the viewport. [source](./.skilld/releases/blog-3.5.md#lazy-hydration)

```ts
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible()
})
```

**NEW: `useHost()` and `useShadowRoot()`** — New in v3.5, custom element helpers for accessing the host element and shadow root from within a custom element component. Stabilized in 3.5. [source](./.skilld/releases/blog-3.5.md#custom-elements-improvements)

```ts
import { useHost, useShadowRoot } from 'vue'

const host = useHost()
const root = useShadowRoot()
```

**NEW: `app.onUnmount()`** — New in v3.5, API for registering cleanup functions at the app instance level. Complements component lifecycle cleanup. [source](./.skilld/releases/CHANGELOG.md:L723)

```ts
app.onUnmount(() => {
  // cleanup logic
})
```

**Stabilized: Reactive Props Destructure** — Default-enabled in v3.5. Props destructured in `<script setup>` are now reactive by default, supporting native JavaScript default value syntax. Variables destructured from `defineProps` must be wrapped in a getter when passed to `watch` or composables. [source](./.skilld/releases/blog-3.5.md#reactive-props-destructure)

```ts
const { count = 0, msg = 'hello' } = defineProps<{
  count?: number
  msg?: string
}>()

// Must wrap in getter when watching
watch(() => count)
```

**NEW: `data-allow-mismatch` attribute** — New in v3.5, suppresses hydration mismatch warnings for elements with unavoidable differences between server and client (e.g. dates, timestamps). Can accept optional values: `text`, `children`, `class`, `style`, `attribute`. [source](./.skilld/releases/blog-3.5.md#data-allow-mismatch)

```vue
<span data-allow-mismatch>{{ data.toLocaleString() }}</span>
<span data-allow-mismatch="text">{{ timestamp }}</span>
```

**NEW: `Teleport defer` prop** — New in v3.5, defers teleport mounting until after the current render cycle. Allows teleporting to target elements rendered after the teleport component. [source](./.skilld/releases/blog-3.5.md#deferred-teleport)

```vue
<Teleport defer target="#container">...</Teleport>
<div id="container"></div>
```

**NEW: Custom element `defineCustomElement` options** — New in v3.5, `defineCustomElement` accepts a second argument with configuration options including `shadowRoot: false`, `nonce`, `configureApp`, and others. [source](./.skilld/releases/blog-3.5.md#custom-elements-improvements)

```ts
defineCustomElement(MyElement, {
  shadowRoot: false,
  nonce: 'xxx',
  configureApp(app) {
    app.config.errorHandler = ...
  }
})
```

**NEW: `app.config.throwUnhandledErrorInProduction`** — New in v3.5, configuration option to control error throwing behaviour in production builds. [source](./.skilld/releases/CHANGELOG.md:L724)

```ts
app.config.throwUnhandledErrorInProduction = true
```

**NEW: `app.config.idPrefix`** — New in v3.5, prefix for IDs generated by `useId()` to avoid collisions in applications with multiple Vue instances. [source](./.skilld/releases/CHANGELOG.md:L697)

```ts
app.config.idPrefix = 'app1_'
```

**NEW: `onEffectCleanup()` API** — New in v3.5, cleanup API for effect scopes. Provides cleanup callbacks similar to `onWatcherCleanup()` but for computed properties and effects. [source](./.skilld/releases/CHANGELOG.md:L687)

```ts
import { computed, onEffectCleanup } from 'vue'

const value = computed(() => {
  const resource = acquireResource()
  onEffectCleanup(() => resource.release())
  return process(resource)
})
```

**NEW: `getCurrentWatcher()`** — New in v3.5, returns the currently executing watcher for use in composables and cleanup handlers. Allows registering context-aware cleanups. [source](./.skilld/releases/CHANGELOG.md:L689)

**NEW: `pause()` and `resume()` for effects** — New in v3.5, control execution of ReactiveEffect, EffectScope, and WatchHandle. Allows temporarily suspending and resuming reactive tracking and watchers. [source](./.skilld/releases/CHANGELOG.md:L690)

```ts
const effect = watch(...)
effect.pause()
effect.resume()
```

**NEW: Deep watch depth control** — New in v3.5, `watch` `deep` option now accepts a number to control tracking depth instead of just boolean. Allows fine-grained control over reactivity tracking. [source](./.skilld/releases/CHANGELOG.md:L691)

```ts
watch(data, callback, { deep: 2 }) // track nested objects up to 2 levels
```

**NEW: `$host` in Options API** — New in v3.5, Options API now supports `this.$host` to access the custom element host, matching the Composition API `useHost()` helper. [source](./.skilld/releases/CHANGELOG.md:L705)

**NEW: Reactivity optimizations** — New in v3.5, refactored reactivity system using version counting and doubly-linked list tracking. Improves computed property efficiency and array tracking performance (up to 10x faster for large reactive arrays). Backwards compatible; no API changes required. [source](./.skilld/releases/CHANGELOG.md:L684)

**Also changed:** `MultiWatchSources` type export · emit options support in custom elements · Symbol global in templates · Trusted Types compatibility · nested slot scoping improvements
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `<script setup>` for composable components — the recommended Composition API syntax with less boilerplate, better IDE performance, and better runtime performance as templates compile into the same scope [source](./.skilld/docs/api/sfc-script-setup.md#basic-syntax)

- Use `ref()` as the primary API for reactive state in Composition API — it's more flexible than `reactive()` since it works with primitive values, supports destructuring, and avoids reference mutation issues [source](./.skilld/docs/guide/essentials/reactivity-fundamentals.md#ref)

- Extract complex template logic into computed properties rather than methods — computed properties cache results based on dependencies and only recompute when dependencies change, reducing unnecessary recalculations [source](./.skilld/docs/guide/essentials/computed.md#computed-caching-vs-methods)

- Ensure all `v-for` elements have unique keys, especially on components — keys maintain internal component state and correct DOM element identity during list updates, reordering, and animations [source](./.skilld/docs/style-guide/rules-essential.md#use-keyed-v-for)

- Define props with detailed type specifications and validation — comprehensive prop definitions document your component API, enable compile-time type checking, and help catch misuse in development [source](./.skilld/docs/style-guide/rules-essential.md#use-detailed-prop-definitions)

- Use composables to encapsulate and reuse stateful logic — composables avoid the component instance overhead of renderless component patterns while enabling flexible composition of shared logic [source](./.skilld/docs/guide/reusability/composables.md#what-is-a-composable)

- Name composable functions with the `use` prefix by convention — this signals to other developers that a function manages state and uses Vue lifecycle hooks [source](./.skilld/docs/guide/reusability/composables.md#naming)

- Return plain objects containing refs from composables, not reactive objects — refs can be safely destructured while maintaining reactivity; reactive objects lose reactivity when destructured [source](./.skilld/docs/guide/reusability/composables.md#return-values)

- Lazy-load route components and non-critical components with `defineAsyncComponent()` — code splitting defers loading of unused code to improve initial page load performance [source](./.skilld/docs/guide/components/async.md#basic-usage)

- Keep props stable to minimize re-renders of child components — when props change frequently, downstream components update unnecessarily; compute props in the parent to keep child props constant [source](./.skilld/docs/guide/best-practices/performance.md#props-stability)

- Use `shallowRef()` for large immutable data structures to avoid deep reactivity overhead — shallow refs bypass the cost of proxy traps on large nested objects when mutation always replaces the entire value [source](./.skilld/docs/guide/best-practices/performance.md#reduce-reactivity-overhead-for-large-immutable-structures)

- Avoid excessive component abstractions in large lists — component instances are expensive compared to DOM nodes; remove unnecessary wrapper layers in frequently-rendered lists to reduce instance count [source](./.skilld/docs/guide/best-practices/performance.md#avoid-unnecessary-component-abstractions)

- Perform DOM operations and subscriptions in `onMounted()` rather than the setup function — this ensures code only runs in the browser during SSR and prevents double-subscriptions [source](./.skilld/docs/guide/reusability/composables.md#side-effects)

- Use getter functions with `watch()` to track reactive object properties instead of accessing properties directly — getters preserve reactivity when watching nested properties or destructured props [source](./.skilld/docs/guide/essentials/watchers.md#watch-source-types)
<!-- /skilld:best-practices -->
