---
name: nuxt-skilld
description: "ALWAYS use when writing code importing \"nuxt\". Consult for debugging, best practices, or modifying nuxt."
metadata:
  version: 4.4.8
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# nuxt/nuxt `nuxt@4.4.8`
**Tags:** 1x: 1.4.5, 2x: 2.18.1, alpha: 4.0.0-alpha.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in Nuxt v4.4.8 — prioritizing recent major/minor releases where breaking changes and renamed APIs are most likely to differ from pre-trained knowledge.

## API Changes

- BREAKING: `statusCode` → `status`, `statusMessage` → `statusText` — Renamed in v4.3 for Web API naming conventions and Nitro v3 alignment [source](./.skilld/releases/v4.3.0.md#deprecations)

- NEW: `createUseFetch(options | function)` — Factory function to create custom instances of `useFetch` with default options, new in v4.4 [source](./.skilld/releases/v4.4.0.md#createusefetch-and-createuseasyncdata)

- NEW: `createUseAsyncData(options | function)` — Factory function for custom `useAsyncData` instances, new in v4.4 [source](./.skilld/releases/v4.4.0.md#createusefetch-and-createuseasyncdata)

- BREAKING: `app/` directory — Nuxt 4.0 changes default project structure from root-level directories to `app/` folder; existing structure still works but new projects use `app/components/`, `app/pages/`, etc. [source](./.skilld/releases/v4.0.0.md#new-project-structure)

- BREAKING: Separate TypeScript projects — Nuxt 4.0 now creates distinct TypeScript contexts for app code, server code, `shared/`, and builder code via separate `tsconfig.app.json`, `tsconfig.server.json`, etc.; only one root `tsconfig.json` needed [source](./.skilld/releases/v4.0.0.md#better-typescript-experience)

- NEW: `useAnnouncer()` composable — New in v4.4 for announcing dynamic in-page changes (form submissions, loading states) to screen readers via `polite()` and `assertive()` methods [source](./.skilld/releases/v4.4.0.md#useannouncer-composable)

- NEW: `<NuxtAnnouncer>` component — Renders ARIA live regions for screen reader announcements, paired with `useAnnouncer()`, new in v4.4 [source](./.skilld/releases/v4.4.0.md#useannouncer-composable)

- NEW: Layout props in `definePageMeta` — Nuxt 4.4 allows passing typed props directly to layouts via `definePageMeta({ layout: { name: 'panel', props: { sidebar: true } } })` [source](./.skilld/releases/v4.4.0.md#typed-layout-props-in-definepagemetamd)

- BREAKING: Multiple `useAsyncData` calls with same key now auto-share data — Nuxt 4.0 changed behaviour so components using the same `useAsyncData` key automatically share data; old code expecting independent data may break [source](./.skilld/releases/v4.0.0.md#smarter-data-fetching)

- NEW: AbortController signals in `useAsyncData` — Nuxt 4.2 adds `signal` parameter to handler for request cancellation control via `useAsyncData('key', (_nuxtApp, { signal }) => $fetch(url, { signal }))` [source](./.skilld/releases/v4.2.0.md#abort-control-for-data-fetching)

- NEW: `appLayout` in route rules — Nuxt 4.3 adds centralized layout management via `routeRules: { '/admin/**': { appLayout: 'admin' } }` [source](./.skilld/releases/v4.3.0.md#route-rule-layouts)

- NEW: ISR/SWR payload extraction — Nuxt 4.3 enables `_payload.json` generation for ISR/SWR routes, not just pre-rendered pages [source](./.skilld/releases/v4.3.0.md#isrswr-payload-extraction)

- NEW: `#server` alias — Nuxt 4.3 provides clean `#server/utils/helper` imports within server directory, with import protection [source](./.skilld/releases/v4.3.0.md#server-alias)

- NEW: `setPageLayout(name, props)` — Nuxt 4.3 allows updating layout and passing props at runtime from middleware: `setPageLayout('admin', { sidebar: true, theme: 'dark' })` [source](./.skilld/releases/v4.3.0.md#layout-props-with-setpagelayout)

- NEW: Module disabling with `false` — Nuxt 4.3 allows disabling inherited modules: `image: false` in config [source](./.skilld/releases/v4.3.0.md#disable-modules-from-layers)

- NEW: `route.meta.groups` — Nuxt 4.3 exposes route groups (parenthesized folder names) in page meta for middleware authorization [source](./.skilld/releases/v4.3.0.md#route-groups-in-page-meta)

- NEW: Vue Router v5 — Nuxt 4.4 upgrades to Vue Router v5, removing dependency on `unplugin-vue-router` [source](./.skilld/releases/v4.4.0.md#vue-router-v5)

- NEW: `refresh` option for `useCookie` — Nuxt 4.4 adds `refresh: true` to extend cookie expiration without changing value [source](./.skilld/releases/v4.4.0.md#refresh-option-for-usecookie)

- NEW: `clearNuxtState(key)` resets to default — Nuxt 4.4 changes behavior to reset `useState` to initial value instead of `undefined` [source](./.skilld/releases/v4.4.0.md#usestate-reset-to-default)

**Also changed:** Async plugin constructors via `addVitePlugin` in v4.3 · `payloadExtraction: 'client'` mode in v4.4 · Module `onInstall`/`onUpgrade` hooks in v4.1 · `moduleDependencies` for module interdependencies in v4.1 · `defineLazyHydrationComponent()` without auto-imports in v4.1 · `getLayerDirectories()` utility in v4.1 · Import maps for chunk stability (experimental `entryImportMap`) in v4.1 · `NuxtPage.rules` property in v4.1 · Better error pages with dev overlay in v4.2 · Async data handler extraction (experimental `extractAsyncDataHandlers`) in v4.2 · Component `declarationPath` option in v4.2 · Vite Environment API opt-in (experimental `viteEnvironmentApi`) in v4.2 · `resolveModule` extensions option in v4.2 · `setGlobalHead()` kit utility in v4.2 · Removed `#app/components/layout` import path in v4.0 · Removed `globalName` property in v4.0 · Removed public/assets aliases in v4.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `useFetch` or `useAsyncData` for initial component data instead of `$fetch` — prevents double-fetching on SSR and ensures data reaches the client in the payload, avoiding hydration mismatches [source](./.skilld/docs/1.getting-started/10.data-fetching.md:L7:22)

- Always use `useState` in composables instead of module-level `ref` exports — module-level state persists across requests on the server, causing memory leaks and cross-user state pollution [source](./.skilld/docs/1.getting-started/11.state-management.md:L23:30)

- Wrap browser-only code in `onMounted` or use `ClientOnly` component — accessing browser APIs like `localStorage` or `window` at setup time causes hydration mismatches [source](./.skilld/docs/3.guide/2.best-practices/hydration.md:L34:61)

- Use `<NuxtLink>` for internal navigation instead of `<a>` tags — automatically prefetches linked pages and intelligently switches between router links and plain anchors [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L13:45)

- Enable lazy hydration with `hydrate-on-visible` or `hydrate-on-idle` for below-the-fold components — defers hydration until the component enters viewport or browser is idle, improving time-to-interactive [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L98:112)

- Use the `Lazy` prefix for components to dynamically import them — splits code into chunks and delays loading until needed, reducing initial bundle size [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L76:96)

- For asynchronous plugins, always set `parallel: true` — allows multiple async plugins to load concurrently instead of sequentially blocking rendering [source](./.skilld/docs/3.guide/2.best-practices/plugins.md:L17:21)

- Never call Nuxt composables at module level (outside setup/plugins) — composables require access to the Nuxt context which is only available during component lifecycle or plugin execution [source](./.skilld/docs/3.guide/1.concepts/3.auto-imports.md:L54:66)

- Use `useHeadSafe` or `useSeoMeta` instead of `useHead` for user-generated content — restricts input to safe values and prevents XSS attacks [source](./.skilld/docs/4.api/2.composables/use-head-safe.md)

- Minimize plugin setup logic and defer expensive operations to hooks — plugins run during hydration phase; blocking operations degrade user experience and increase time-to-interactive [source](./.skilld/docs/3.guide/2.best-practices/plugins.md:L9:11)

- Use `<NuxtImg>` instead of `<img>` tags for images — automatically optimises, resizes, converts to modern formats (WebP/Avif), and supports lazy loading for improved Core Web Vitals [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L124:166)

- Define route rules for hybrid rendering to balance performance and freshness — use `prerender`, `swr`, `isr`, or `ssr: false` per route to optimise caching strategy without a single rendering mode [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L47:74)

- Use `$fetch` only for event-based client interactions; use `useFetch`/`useAsyncData` for page data — `$fetch` lacks de-duplication and prevents Suspense, causing potential double-requests and hydration issues [source](./.skilld/docs/1.getting-started/10.data-fetching.md:L82:85)

- Avoid conditional rendering based on client-only values in setup — use CSS media queries or handle logic in `onMounted` instead to ensure identical server and client output [source](./.skilld/docs/3.guide/2.best-practices/hydration.md:L85:106)
<!-- /skilld:best-practices -->

Related: vue-skilld, vue-router-skilld
