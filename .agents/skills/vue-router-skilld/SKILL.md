---
name: vue-router-skilld
description: "ALWAYS use when writing code importing \"vue-router\". Consult for debugging, best practices, or modifying vue-router, vue router, router."
metadata:
  version: 5.2.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# vuejs/router `vue-router@5.2.0`
**Tags:** next: 4.0.13, legacy: 3.6.5, edge: 4.4.0-alpha.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vue-router` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vue-router` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for Vue Router v5.x — prioritising recent major/minor releases.

**NEW:** `defineBasicLoader()` — new in v5.0.0 (experimental), defines data loaders for automatic data fetching during navigation. Exports a composable with `data`, `isLoading`, `error`, and `reload` properties [source](./.skilld/docs/data-loaders/index.md)

**NEW:** `defineColadaLoader()` — new in v5.0.0 (experimental), alternative loader using Pinia Colada. Import from `vue-router/experimental/pinia-colada` [source](./.skilld/docs/data-loaders/index.md)

**NEW:** `DataLoaderPlugin` — new in v5.0.0 (experimental), Vue plugin to enable data loaders across the application. Must be installed before the router [source](./.skilld/docs/data-loaders/index.md:L18)

**NEW:** `reroute()` — new in v5.0.0 (experimental), function to control navigation from within a data loader. Similar to returning a value in a navigation guard [source](./.skilld/docs/data-loaders/defining-loaders.md:L88:106)

**NEW:** File-based routing via `VueRouter` plugin — merged from unplugin-vue-router in v5.0.0. Import from `vue-router/vite` for Vite or `vue-router/unplugin` for other bundlers. Automatically generates typed routes [source](./.skilld/docs/file-based-routing/index.md)

**NEW:** `definePage()` — new in v5.0.0, used in page components to define route metadata (name, params, etc.) when using file-based routing [source](./.skilld/docs/guide/migration/v4-to-v5.md#2-update-imports)

**NEW:** Raw param parsers support — new in v5.1.0, allows string-based param parser definitions for convenience. Pass string names directly instead of objects [source](./.skilld/releases/v5.1.0.md:L18)

**NEW:** `RouteMap` type — new in v5.0.0, typed route definition available in generated `route-map.d.ts` file for full type safety with file-based routing [source](./.skilld/releases/v5.0.7.md:L26)

**DEPRECATED:** `next()` parameter in navigation guards — deprecated with warning in v5.0.3, should use Promise-based returns or data loaders instead. Warning: "next() is deprecated, use navigation guards with data loaders for data fetching" [source](./.skilld/issues/issue-2647.md)

**BREAKING:** IIFE build no longer includes `@vue/devtools-api` — changed in v5.0.0 because devtools-api v8 does not expose an IIFE build. Only affects projects using the IIFE-only build without separate devtools module [source](./.skilld/releases/v5.0.0.md)

**RENAMED:** Unplugin imports — v5.0.0 merged unplugin-vue-router into core with new import paths: `unplugin-vue-router/vite` → `vue-router/vite`; `unplugin-vue-router` → `vue-router/unplugin` [source](./.skilld/docs/guide/migration/v4-to-v5.md:L38:53)

**RENAMED:** Data loader imports — v5.0.0 moved to experimental exports: `unplugin-vue-router/data-loaders/basic` → `vue-router/experimental`; `unplugin-vue-router/data-loaders/pinia-colada` → `vue-router/experimental/pinia-colada` [source](./.skilld/docs/guide/migration/v4-to-v5.md:L55:64)

**RENAMED:** Volar plugin imports — v5.0.0 uses new paths: `unplugin-vue-router/volar/sfc-typed-router` → `vue-router/volar/sfc-typed-router`; `unplugin-vue-router/volar/sfc-route-blocks` → `vue-router/volar/sfc-route-blocks` [source](./.skilld/docs/guide/migration/v4-to-v5.md:L100:104)

**NEW:** Experimental query params optional by default — new in v5.0.0, query parameters are treated as optional without needing special syntax in typed routes [source](./.skilld/releases/v5.0.0.md:L14)

**NEW:** Override useRouter() type — new in v5.1.0, allows customisation of the global Router type via `TypesConfig` for better type safety [source](./.skilld/releases/v5.1.0.md:L17)

**IMPROVED:** Param parser validation — v5.0.7 enhances `defineParamParser()` with `include`/`exclude` options for filtering which params a parser applies to [source](./.skilld/releases/v5.0.7.md:L15)

**Also changed:** Query params filtering without route matching failure · Lazy loader syntax via `lazy` option · Data commit timing with `commit` option (immediate/after-load) · Server-side rendering optimisation with `server: false` · Automatic scroll behaviour improvements in v5.2.0 ignoring stale async results
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Avoid the third `next` callback parameter in navigation guards — the newer return-based API is clearer and prevents accidental double-calls. Return `false` to cancel navigation, a route location to redirect, or `undefined`/`true` to proceed. [source](./.skilld/docs/guide/advanced/navigation-guards.md#optional-third-argument-next)

- Use `router.beforeResolve()` instead of `router.beforeEach()` for data fetching and permission checks — it runs after all in-component guards and async components are resolved, ensuring the user won't see incomplete pages. [source](./.skilld/docs/guide/advanced/navigation-guards.md#global-resolve-guards)

- Always use dynamic imports for route components to enable automatic code splitting — this is not just a performance optimisation but becomes essential as applications scale. Replace static imports with `() => import('./component.vue')` in route configurations. [source](./.skilld/docs/guide/advanced/lazy-loading.md#lazy-loading-routes)

- Adopt the Data Loaders pattern for streamlined data fetching — extract async logic outside component setup using `defineBasicLoader()` or `defineColadaLoader()`, which automatically awaits data before rendering and prevents race conditions. Install `DataLoaderPlugin` before the router. [source](./.skilld/docs/data-loaders/index.md#installation)

- When using Data Loaders across multiple pages, extract them to separate `loaders/` files and re-export them from page components — this optimises chunk splitting whilst ensuring the router recognises and awaits the loaders during navigation. [source](./.skilld/docs/data-loaders/organization.md#loaders-organization)

- Specify expected errors in Data Loaders using the `errors` option to prevent unexpected errors from aborting navigation — distinguish between errors that should be displayed locally (`errors: true`) versus those that should abort navigation entirely. [source](./.skilld/docs/data-loaders/error-handling.md#defining-expected-errors)

- In Composition API components, watch specific route properties (`route.params.id`) rather than the entire route object — this avoids unnecessary reactivity and improves performance when query or hash parameters change. [source](./.skilld/docs/guide/advanced/composition-api.md#accessing-the-router-and-current-route-inside-setup)

- Use `onBeforeRouteUpdate()` in Composition API to detect parameter changes and avoid re-fetching when only query or hash changes — check `to.params.id !== from.params.id` to determine if the dynamic segment actually changed. [source](./.skilld/docs/guide/advanced/composition-api.md#navigation-guards)

- Leverage route meta fields with automatic parent-to-child merging for route-specific configuration — use `router.beforeEach()` to check `to.meta.requiresAuth` instead of looping through `to.matched`, as Vue Router automatically merges all ancestor meta values. [source](./.skilld/docs/guide/advanced/meta.md#route-meta-fields)

- Use `router-view` with a slot and dynamic transition names based on route depth (`to.meta.transition`) — this replaces static global transitions with context-aware animations that create natural forward/backward navigation feelings. [source](./.skilld/docs/guide/advanced/transitions.md#route-based-dynamic-transition)

- Return a Promise from `scrollBehavior()` when you need to delay scrolling until after transitions complete — this ensures smooth animations by waiting for route components to fully render before repositioning the viewport. [source](./.skilld/docs/guide/advanced/scroll-behavior.md#delaying-the-scroll)

- Prefer `createWebHistory()` over `createWebHashHistory()` for production applications — modern browsers handle the history API well, and clean URLs significantly improve SEO. Ensure your server falls back to serving `index.html` for unmatched routes. [source](./.skilld/docs/guide/essentials/history-mode.md#html5-mode)

- Await `router.push()` and detect navigation failures using `isNavigationFailure()` to distinguish between successful navigations and prevented ones — this is essential for UI state management (e.g. closing menus only after successful navigation). [source](./.skilld/docs/guide/advanced/navigation-failures.md#detecting-navigation-failures)

- Use file-based routing with the built-in plugin to automatically generate typed routes instead of manually configuring `RouteNamedMap` — this eliminates boilerplate and keeps types in sync with your file structure. [source](./.skilld/docs/guide/advanced/typed-routes.md#typed-routes)
<!-- /skilld:best-practices -->
