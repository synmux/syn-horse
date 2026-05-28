---
name: vue-router-skilld
description: 'ALWAYS use when writing code importing "vue-router". Consult for debugging, best practices, or modifying vue-router, vue router, router.'
metadata:
  version: 5.1.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-28
---

# vuejs/router `vue-router@5.1.0`

**Tags:** next: 4.0.13, legacy: 3.6.5, edge: 4.4.0-alpha.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vue-router` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vue-router` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `iife` build no longer includes `@vue/devtools-api` v8, potentially causing silent breakage for specific build configurations. [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L5-8)

- BREAKING (experimental): `miss()` now throws internally and returns `never`. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L7)

- BREAKING (experimental): `selectNavigationResult` has been removed. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L9)

- NEW: File-based routing is now integrated into `vue-router` core, using `vue-router/vite` (Vite plugin) or `vue-router/unplugin` (other build tools). [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L22-30)

- NEW (experimental): Data loaders (`defineBasicLoader`, `DataLoaderPlugin`) are available via `vue-router/experimental`. [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L33-36)

- RENAMED: Unplugin utilities (e.g., `VueRouterAutoImports`) moved from `unplugin-vue-router` to `vue-router/unplugin`. [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L42-47)

- RENAMED: Volar plugins paths changed to `vue-router/volar/sfc-typed-router` and `vue-router/volar/sfc-route-blocks`. [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L55-60)

- NEW: Recommendation to move generated types file to `src/route-map.d.ts` and remove old `unplugin-vue-router/client` references. [source](./.skilld/references/vue-router@5.1.0/docs/guide/migration/v4-to-v5.md:L66-79)

- NEW (experimental): Query parameters are optional by default. [source](./.skilld/repos/vuejs/router/releases/v5.0.0.md:L16)

- NEW: `reroute()` function added as a replacement for `NavigationResult`. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L8)

- DEPRECATED: `next()` callback in navigation guards now has a deprecation warning. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L18)

- DEPRECATED: `new NavigationResult(to)` is deprecated in favor of `reroute(to)`. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L23)

- NEW (experimental): `_parent` support in nested folders, set as non-matchable by default, with conflict warnings. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L13-15)

- NEW (experimental): Aliases can now be handled in resolvers, generated from overrides, and non-absolute aliases trigger warnings. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L25-27)

- NEW: Warns on conflicting components for routes. [source](./.skilld/repos/vuejs/router/releases/v5.0.3.md:L16)

**Also changed:** Add Volar plugins integration (`v5.0.0.md:L17`) · Add route JSON schema (`v5.0.0.md:L19`) · Upgrade devtools-api to v7 (`v5.0.0.md:L20`) · Upgrade devtools to v8 (`v5.0.0.md:L21`) · Runtime error on missing param parsers (`v5.0.0.md:L22`) · Extract alias from `definePage` (`v5.0.3.md:L19`) · Display aliases in logs (`v5.0.3.md:L20`) · Use `type module` (`v5.0.3.md:L17`)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- **Avoid watching the entire `route` object**: The `route` object is reactive, but watching the entire object can be inefficient. Instead, watch specific properties that are expected to change. [source](./.skilld/docs/guide/advanced/composition-api.md:L33)

- **Do not use async components as route components**: While Vue has async components, route components themselves should be functions. Async components can be used _inside_ route components. [source](./.skilld/docs/guide/advanced/lazy-loading.md:L45)

- **Use `router.beforeResolve` for data fetching or operations that should prevent navigation if failed**: This guard is ideal for data fetching that you want to avoid doing if the user cannot enter a page. [source](./.skilld/docs/guide/advanced/navigation-guards.md:L111)

- **Handle dynamic route additions/removals within navigation guards by returning a new location**: Avoid calling `router.replace()` when dynamically adding or removing routes in a guard; instead, return the new location to trigger a redirection. [source](./.skilld/docs/guide/advanced/dynamic-routing.md:L43)

- **Display a progress bar or indicator during data fetching for incoming views**: When data is being fetched for a new view, the user remains on the previous view. Providing a visual cue improves UX. [source](./.skilld/docs/guide/advanced/data-fetching.md:L160)

- **HTML5 mode with `createWebHistory()` is the recommended history mode**: This mode avoids URL hacks and directly uses `history.pushState()`. [source](./.skilld/docs/guide/essentials/history-mode.md:L12)

- **Implement a catch-all fallback route on the server and a 404 route in Vue for HTML5 history mode**: This prevents server 404s for valid app routes and allows the app to display a proper 404 page for non-existent paths. [source](./.skilld/docs/guide/essentials/history-mode.md:L29)

- **Avoid slow regex patterns, especially `.*` with repeatable modifiers, in route matching**: Such patterns can lead to serious performance issues. [source](./.skilld/docs/guide/essentials/route-matching-syntax.md:L141)

- **Use named routes to avoid URL typos and simplify programmatic navigation**: Naming routes provides a more robust way to navigate, decoupling navigation from specific URL paths. [source](./.skilld/docs/guide/essentials/named-routes.md:L37)

- **Avoid side effects (e.g., `watch`, `ref`, `computed`) within loader functions**: Loaders should be pure functions focused on data fetching, not reactive state management. [source](./.skilld/docs/data-loaders/defining-loaders.md:L57)

- **Extract data loaders into separate files for optimal chunk splitting and reusability**: If a loader is used across multiple pages, defining it separately improves organization and reusability. Always export the loader in page components where it's used. [source](./.skilld/docs/data-loaders/organization.md#loaders-organization)

- **For `defineColadaLoader`, configure `staleTime` and leverage route tracking for efficient data fetching (experimental)**: `staleTime` controls refetching frequency, and route tracking ensures data refreshes only when _tracked_ `to` parameter properties change. [source](./.skilld/docs/data-loaders/colada/index.md:L91:L95)

- **Commit the generated `typed-router.d.ts` file and include it in `tsconfig.json` for file-based routing**: This ensures type safety and consistency across the project. [source](./.skilld/docs/file-based-routing/index.md:L73:L96)
<!-- /skilld:best-practices -->
