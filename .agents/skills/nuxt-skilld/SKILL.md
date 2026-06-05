---
name: nuxt-skilld
description: "ALWAYS use when writing code importing \"nuxt\". Consult for debugging, best practices, or modifying nuxt."
metadata:
  version: 4.4.7
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# nuxt/nuxt `nuxt@4.4.7`
**Tags:** 1x: 1.4.5, 2x: 2.18.1, alpha: 4.0.0-alpha.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes (v3 → v4 Migration)

- BREAKING: `window.__NUXT__` object removed — access via `useNuxtApp().payload` instead [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1148:L1165)

- BREAKING: Route metadata deduplicated — `route.meta.name` no longer available, use `route.name` instead (experimental.scanPageMeta now default true) [source](./.skilld/docs/1.getting-started/18.upgrade.md:L576:L599)

- BREAKING: `srcDir` now defaults to `app/` directory by default, with `serverDir`, `layers/`, `modules/`, `public/`, `content/` resolved from root [source](./.skilld/docs/1.getting-started/18.upgrade.md:L350:L442)

- BREAKING: Component names normalized to match route names instead of filenames — update `<KeepAlive>` include/exclude filters [source](./.skilld/docs/1.getting-started/18.upgrade.md:L603:L636)

- BREAKING: `data` and `error` now default to `undefined` instead of `null` in useAsyncData/useFetch [source](./.skilld/docs/1.getting-started/18.upgrade.md:L865:L883)

- BREAKING: `dedupe` option no longer accepts boolean values — use `'cancel'` or `'defer'` strings instead [source](./.skilld/docs/1.getting-started/18.upgrade.md:L885:L928)

- BREAKING: `data` from useAsyncData/useFetch is now shallowRef instead of ref — no deep reactivity by default [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1077:L1115)

- BREAKING: `builder:watch` hook now emits absolute paths instead of relative to srcDir [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1117:L1146)

- BREAKING: Unhead v2 upgrade — removed props `vmid`, `hid`, `children`, `body` from head tags [source](./.skilld/docs/1.getting-started/18.upgrade.md:L638:L699)

- BREAKING: Top-level `generate` config removed — migrate to `nitro.prerender` instead [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1428:L1464)

- BREAKING: SPA loading template now renders outside `#__nuxt__` div by default — update CSS/DOM selectors [source](./.skilld/docs/1.getting-started/18.upgrade.md:L701:L738)

- BREAKING: Global styles no longer inlined by default — only component styles inlined [source](./.skilld/docs/1.getting-started/18.upgrade.md:L763:L783)

### Breaking Changes (v4-specific)

- BREAKING: `getCachedData` function signature changed — now receives context object with `cause: 'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L489:L505)

- BREAKING: `pending` property alignment — `pending` is now `false` with `immediate: false` until request made, true only when `status === 'pending'` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L991:L1035)

- BREAKING: Module loading order corrected — layer modules load before project modules (was reversed in v3) [source](./.skilld/docs/1.getting-started/18.upgrade.md:L518:L574)

- BREAKING: Child folders in `app/middleware/` now scanned for `index` files (consistent with plugins behavior) [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1167:L1193)

- BREAKING: Template compilation — lodash/template removed, use `getContents()` function instead [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1195:L1257)

- BREAKING: TypeScript config split — separate `tsconfig.app.json`, `tsconfig.server.json`, `tsconfig.node.json`, `tsconfig.shared.json` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1293:L1401)

- BREAKING: `noUncheckedIndexedAccess` TypeScript compiler option now `true` by default [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1259:L1291)

### New Components (v4.x+)

- NEW: `<NuxtAnnouncer>` — accessibility component for announcing dynamic content changes to screen readers, new in v4.4.2 [source](./.skilld/docs/4.api/1.components/14.nuxt-announcer.md:L11:L27)

### New Composables (v4.x+)

- NEW: `useAnnouncer()` — composable for manual screen reader announcements with `polite()` and `assertive()` methods, new in v4.4.2 [source](./.skilld/docs/4.api/2.composables/use-announcer.md:L11:L50)

### Data Fetching Changes (v4.0+)

- BREAKING: Singleton data fetching layer — all `useAsyncData`/`useFetch` calls with same key must have consistent `deep`, `transform`, `pick`, `getCachedData`, `default` options [source](./.skilld/docs/1.getting-started/18.upgrade.md:L444:L516)

- BREAKING: Reactive key support — `useAsyncData`/`useFetch` now accept computed refs, plain refs, or getter functions as keys with automatic refetching [source](./.skilld/docs/1.getting-started/18.upgrade.md:L444:L516)

- BREAKING: Data cleanup on unmount — when last component using data from `useAsyncData` unmounts, Nuxt removes that data [source](./.skilld/docs/1.getting-started/18.upgrade.md:L444:L516)

- BREAKING: Key change behavior in non-immediate mode — `useFetch` and `useAsyncData` now only fetch on key change if data already fetched once [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1037:L1075)

### Features & Configuration Changes

- NEW: `features.devLogs` — enable/disable server logs streaming to client in development [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L9:L24)

- NEW: `features.inlineStyles` — control CSS inlining behavior, accepts boolean or function [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L26:L40)

- NEW: `features.noScripts` — disable JavaScript rendering, supports `true | 'production' | 'all' | false` [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L42:L56)

- NEW: `future.compatibilityVersion: 5` — opt-in to Nuxt 5 breaking changes for early testing [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L62:L78)

- NEW: `future.multiApp` — experimental multi-app support (issue #21635) [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L80:L90)

- NEW: `future.typescriptBundlerResolution` — enable TypeScript 'Bundler' module resolution mode [source](./.skilld/docs/3.guide/6.going-further/1.features.md:L92:L108)

### Removal of Deprecated Features (v4.0+)

- BREAKING: `experimental.treeshakeClientOnly` no longer configurable — always `true` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1404:L1426)

- BREAKING: `experimental.configSchema` no longer configurable — always `true` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1404:L1426)

- BREAKING: `experimental.polyfillVueUseHead` no longer configurable — always `false` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1404:L1426)

- BREAKING: `experimental.respectNoSSRHeader` no longer configurable — always `false` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1404:L1426)

- BREAKING: `vite.devBundler` no longer configurable — hardcoded to `vite-node` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1404:L1426)

### Optional Backward Compatibility Flags (v4.0+)

These experimental flags allow reverting v4 breaking changes where necessary:

- `experimental.granularCachedData: false` — disable singleton data fetching layer [source](./.skilld/docs/1.getting-started/18.upgrade.md:L507:L516)

- `experimental.purgeCachedData: false` — disable automatic data cleanup on unmount [source](./.skilld/docs/1.getting-started/18.upgrade.md:L507:L516)

- `experimental.normalizeComponentNames: false` — revert component names to filename-based [source](./.skilld/docs/1.getting-started/18.upgrade.md:L630:L636)

- `experimental.spaLoadingTemplateLocation: 'within'` — place SPA loading template inside `#__nuxt__` div [source](./.skilld/docs/1.getting-started/18.upgrade.md:L730:L738)

- `experimental.sharedPrerenderData: false` — disable shared prerender data caching [source](./.skilld/docs/1.getting-started/18.upgrade.md:L855:L863)

- `experimental.alwaysRunFetchOnKeyChange: true` — always refetch on key change regardless of immediate setting [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1066:L1075)

- `experimental.pendingWhenIdle: true` — revert pending behavior to be true on idle [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1027:L1035)

- `unhead.legacy: true` — revert to Unhead v1 behavior [source](./.skilld/docs/1.getting-started/18.upgrade.md:L691:L699)

- `features.inlineStyles: true` — inline global CSS as well as component CSS [source](./.skilld/docs/1.getting-started/18.upgrade.md:L775:L783)

- `experimental.scanPageMeta: true` — scan page metadata before pages:extend hook [source](./.skilld/docs/1.getting-started/18.upgrade.md:L814:L822)

**Also changed:** Vite Environment API migration · Relative prerender data · Parsed error.data support · Client-only comment placeholders · Non-async callHook (hookable v6) · pages:resolved hook addition · setResponseStatus usage · TypeScript project references support · refreshCookie utility · setPageLayout utility
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Nuxt Best Practices

## Best Practices

- Use `useFetch` or `useAsyncData` for data fetching in component setup functions — these ensure data fetched on the server is forwarded to the client in the payload, avoiding double-fetches and hydration issues [source](./.skilld/docs/1.getting-started/10.data-fetching.md:L17:23)

- Always provide an explicit key to `useAsyncData` to cache responses and enable data sharing between components — auto-generated keys can cause unwanted behavior in custom composables wrapping `useAsyncData` [source](./.skilld/docs/1.getting-started/10.data-fetching.md:L175:181)

- Define global state with `useState` wrapped in composables rather than as module-level `ref()` — module-level state causes cross-request pollution on the server and memory leaks [source](./.skilld/docs/1.getting-started/11.state-management.md:L23:30)

- Wrap client-only code in `onMounted` or use `<ClientOnly>` component — browser-only libraries with side effects imported at setup time cause hydration mismatches [source](./.skilld/docs/3.guide/2.best-practices/hydration.md:L108:130)

- Use `useCookie` instead of `localStorage` for persistent user preferences — `localStorage` doesn't exist during server rendering and causes hydration mismatches [source](./.skilld/docs/3.guide/2.best-practices/hydration.md:L34:61)

- Enable `parallel: true` for asynchronous plugins to allow concurrent loading — by default all plugins load synchronously, which blocks rendering during hydration [source](./.skilld/docs/3.guide/2.best-practices/plugins.md:L18:21)

- Call Nuxt composables only from within components, plugins, and route middleware — composables require the Nuxt instance context and will throw 'Nuxt instance is unavailable' if called outside the correct lifecycle [source](./.skilld/docs/3.guide/1.concepts/3.auto-imports.md:L54:76)

- Prefer composition patterns with composables over plugins for utilities and helpers — plugins run during hydration and can cause performance bottlenecks with expensive setup logic [source](./.skilld/docs/3.guide/2.best-practices/plugins.md:L9:15)

- Use lazy-loaded components with the `Lazy` prefix for non-critical UI — this delays loading component code until needed, optimizing initial JavaScript bundle size [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L76:96)

- Implement hybrid rendering with `routeRules` for different caching strategies per route — this allows pages to be generated at build time, cached, or rendered on-demand based on the route [source](./.skilld/docs/3.guide/2.best-practices/performance.md:L47:74)

- Prefix module exports (components, composables, routes) with the module name to avoid conflicts — for example, a `nuxt-foo` module should provide `<FooButton>` not `<Button>` [source](./.skilld/docs/3.guide/4.modules/7.best-practices.md:L18:32)

- Use lifecycle hooks (`onInstall`, `onUpgrade`) for module setup tasks instead of the main `setup` function — this prevents unnecessary work on every build and improves developer experience [source](./.skilld/docs/3.guide/4.modules/7.best-practices.md:L38:68)

- Return helper functions (not raw values) from middleware — use `navigateTo()` and `abortNavigation()` to control navigation flow instead of relying on Vue Router patterns [source](./.skilld/docs/2.directory-structure/1.app/1.middleware.md:L43:65)

- Use `$fetch` for client-side interactions and event-based requests — `useFetch` and `useAsyncData` are only needed for component initialization where SSR-safety and Suspense blocking matter [source](./.skilld/docs/1.getting-started/10.data-fetching.md:L65:89)
<!-- /skilld:best-practices -->

Related: vue-skilld, vue-router-skilld
