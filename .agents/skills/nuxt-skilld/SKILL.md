---
name: nuxt-skilld
description: "Nuxt is a free and open-source framework with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js. ALWAYS use when writing code importing \"nuxt\". Consult for debugging, best practices, or modifying nuxt."
metadata:
  version: 4.4.6
  generated_by: cached
  generated_at: 2026-05-29
---

# nuxt/nuxt `nuxt@4.4.6`
**Tags:** 1x: 1.4.5, 2x: 2.18.1, alpha: 4.0.0-alpha.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes — Nuxt v4.4.6

This section documents significant version-specific API changes introduced in Nuxt v4.x. Focus on recent MINOR releases (v4.4, v4.3, v4.2, v4.1) and the v4.0 MAJOR release.

## Breaking Changes & Deprecations

- BREAKING: `statusCode` → `status`, `statusMessage` → `statusText` — Web API alignment for error responses; old properties still work but deprecated in v4.3.0, will remove in v5 [source](./.skilld/releases/v4.3.0.md:L197:204)

- BREAKING: `#app/components/layout` → `#app/components/nuxt-layout` — Alias renamed in v4.0 for clarity [source](./.skilld/releases/v4.0.0.md:L218)

- BREAKING: Removed `public` and `assets` aliases — Use explicit paths instead; removed in v4.0 [source](./.skilld/releases/v4.0.0.md:L200)

- BREAKING: Removed top-level `generate` option — Migrate route rules and prerendering config to `nuxt.config.ts`; removed in v4.0 [source](./.skilld/releases/v4.0.0.md:L202)

- BREAKING: `useAsyncData` no longer reruns if data already cached — Previous behavior silently ignored cached state; v4.0 avoids double renders [source](./.skilld/releases/v4.0.0.md:L197)

- BREAKING: Dropped Nuxt 2 support from `@nuxt/kit` — Module authors must target Nuxt 3+; affects `resolveModule`, require utilities, and template compilation [source](./.skilld/releases/v4.0.0.md:L166)

## New Features (v4.4 → v4.1)

- NEW: `createUseFetch()` and `createUseAsyncData()` — Factory functions for custom data-fetching composables with merged defaults; replaces manual wrapping patterns [source](./.skilld/releases/v4.4.0.md:L14:51)

- NEW: `useAnnouncer()` composable and `<NuxtAnnouncer>` component — Announce dynamic in-page changes to screen readers (form submissions, loading states, search results); complements `useRouteAnnouncer()` [source](./.skilld/releases/v4.4.0.md:L94:128)

- NEW: Typed layout props in `definePageMeta()` — Pass props directly to layouts via `layout: { name: 'panel', props: { sidebar: true } }`; fully typed if layout defines props [source](./.skilld/releases/v4.4.0.md:L63:80)

- NEW: `appLayout` in route rules — Set layouts per route pattern without touching individual pages: `routeRules: { '/admin/**': { appLayout: 'admin' } }` [source](./.skilld/releases/v4.3.0.md:L33:46)

- NEW: Route groups in page meta — Access route groups in `useRoute().meta.groups`; enables convention-based auth without per-page meta [source](./.skilld/releases/v4.3.0.md:L96:114)

- NEW: `setPageLayout()` now accepts props — Update layout and pass props at runtime: `setPageLayout('admin', { sidebar: true })` [source](./.skilld/releases/v4.3.0.md:L116:137)

- NEW: `#server` alias — Clean server-side imports: `import { helper } from '#server/utils/helper'`; includes import protection [source](./.skilld/releases/v4.3.0.md:L138:151)

- NEW: `AbortController` signal in `useAsyncData` — Cancel requests with `useAsyncData('key', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }))` [source](./.skilld/releases/v4.2.0.md:L15:35)

- NEW: `onInstall` and `onUpgrade` module hooks — Execute setup wizards when module first installed or upgraded; requires `name` and `version` in module metadata [source](./.skilld/releases/v4.1.0.md:L164:186)

- NEW: `moduleDependencies` for modules — Declare and configure dependent modules with version constraints: `moduleDependencies: { 'some-module': { version: '>=2' } }` [source](./.skilld/releases/v4.1.0.md:L135:165)

- NEW: `getLayerDirectories()` utility — Access layer directories without private APIs: `getLayerDirectories(nuxt)` returns `{ app, appPages, server, public }` [source](./.skilld/releases/v4.1.0.md:L205:218)

- NEW: `<NuxtTime>` component — Render relative timestamps: `<NuxtTime :time="date" />` renders "2 minutes ago" [source](./.skilld/releases/v4.0.0.md:L152)

- NEW: `onWatcherCleanup` lifecycle hook — Register cleanup logic when file watchers reset; auto-imported [source](./.skilld/releases/v4.0.0.md:L149)

- EXPERIMENTAL (v4.4): `normalizeComponentNames` — Match page component names to route names in devtools; enable via `experimental: { normalizeComponentNames: true }` [source](./.skilld/releases/v4.4.0.md:L210:223)

- EXPERIMENTAL (v4.4): `payloadExtraction: 'client'` — Inline full payload in initial HTML for cached routes; reduces `_payload.json` requests [source](./.skilld/releases/v4.4.0.md:L136:156)

- EXPERIMENTAL (v4.2): `extractAsyncDataHandlers` — Extract `useAsyncData` handlers into separate chunks; reduced bundle by 39% in testing [source](./.skilld/releases/v4.2.0.md:L107:145)

- EXPERIMENTAL (v4.2): TypeScript plugin support — Enable via `experimental: { typescriptPlugin: true }` for smart component renaming, go-to-definition for globs, and enhanced auto-imports [source](./.skilld/releases/v4.2.0.md:L147:172)

- EXPERIMENTAL (v4.2): `viteEnvironmentApi` — Opt-in Vite 6 Environment API: `experimental: { viteEnvironmentApi: true }`; closes dev/prod gap [source](./.skilld/releases/v4.2.0.md:L58:74)

- EXPERIMENTAL (v4.1): `rolldown-vite` support — Rust-powered bundling via package.json override; auto-detected by Nuxt [source](./.skilld/releases/v4.1.0.md:L45:90)

- EXPERIMENTAL (v4.1): `entryImportMap` — Use import maps for chunk stability; enabled by default, disable with `experimental: { entryImportMap: false }` [source](./.skilld/releases/v4.1.0.md:L12:43)

## Enhanced Behavior

- ENHANCED: `useCookie` now has `refresh` option — Extend expiration without changing value: `useCookie('id', { maxAge: 60*60, refresh: true })` [source](./.skilld/releases/v4.4.0.md:L158:172)

- ENHANCED: `useState` and `clearNuxtState` reset to initial value — No longer reset to `undefined`; aligns with `useAsyncData` behavior [source](./.skilld/releases/v4.4.0.md:L174:186)

- ENHANCED: Import protection now shows traces and suggestions — Debugger displays import chain, exact line, and fix options [source](./.skilld/releases/v4.4.0.md:L188:197)

- ENHANCED: `defineLazyHydrationComponent` works without auto-imports — Explicitly import the macro without relying on auto-discovery [source](./.skilld/releases/v4.1.0.md:L97:109)

- ENHANCED: Module disabling by setting options to `false` — Disable layer modules: `image: false` [source](./.skilld/releases/v4.3.0.md:L85:92)

- ENHANCED: Draggable error overlay in dev — Minimize to pill, snap to edges, position persists across reloads [source](./.skilld/releases/v4.3.0.md:L152:160)

- ENHANCED: ISR/SWR payload extraction — Cached pages now generate `_payload.json` for client-side navigation without additional API calls [source](./.skilld/releases/v4.3.0.md:L57:73)

- ENHANCED: Better error pages in development — Show both custom error page and technical overlay simultaneously [source](./.skilld/releases/v4.2.0.md:L50:56)

- ENHANCED: Async plugin constructors — Build plugins now support lazy loading: `addVitePlugin(() => import('plugin').then(r => r.default()))` [source](./.skilld/releases/v4.3.0.md:L165:180)

## Vue Router & Dependencies

- BREAKING: Upgraded to **vue-router v5** — Removes dependency on `unplugin-vue-router`; typed routes still experimental; transparent for most apps [source](./.skilld/releases/v4.4.0.md:L55:61)

- BREAKING: Separate TypeScript projects for app/server/shared — One `tsconfig.json` at root; improved type inference per context [source](./.skilld/releases/v4.0.0.md:L64:71)

## Migration Patterns

- NEW: `nuxt.config.ts` structure — Optional: move code to `app/` directory for faster file watching; auto-detects legacy structure [source](./.skilld/releases/v4.0.0.md:L32:52)

- REMOVED: `installModule` (deprecated) → use `moduleDependencies` instead [source](./.skilld/releases/v4.1.0.md:L164)

- REMOVED: `requireModule` and `tryRequireModule` from older Nuxt 2 support (restored in v4.0.1) [source](./.skilld/releases/v4.0.0.md:L173)

## Also changed:

NEW in v4.x: `resolveFiles` now has `ignore` option · `setGlobalHead` utility for kit · `declarationPath` for component registration · `resolveModule` `extensions` option · payload extraction in dev mode · ISR/SWR caching · `nuxt build --profile` for build profiling · `unrouting` migration for 15% faster route changes · better `optimizeDeps` hints · reset to default for `useState`

PERFORMANCE: 14,000x faster module ID parsing · disabled NuxtLink prefetching in dev · precomputed renderer dependencies at build time · hook filters to skip unnecessary runs · SSR styles optimization · route rules compilation into client chunk

DEPRECATED: `statusCode`/`statusMessage` in error objects (v4.3+)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `useFetch` or `useAsyncData` for all data fetching to prevent double-fetching during SSR hydration — both composables transmit server-rendered data to the client payload, avoiding redundant requests on hydration [source](./.skilld/docs/4.api/2.composables/use-fetch.md#usage)

- Create custom fetch composables with `createUseFetch` instead of wrapping `$fetch` directly — this generates type hints, auto-deduplicates keys based on URL and options, and provides a consistent API across your application [source](./.skilld/docs/3.guide/5.recipes/3.custom-usefetch.md#recipe-api-client-with-auth)

- Use `useState` with only serializable data (objects, arrays, primitives) — non-serializable values like classes or functions will cause hydration errors when the state is passed from server to client [source](./.skilld/docs/4.api/2.composables/use-state.md#usage)

- Prefix components with `Lazy` to dynamically import them only when needed — this reduces initial bundle size and defers parsing and execution until the component is actually used [source](./.skilld/docs/3.guide/2.best-practices/performance.md#lazy-loading-components)

- Use `hydrate-on-visible` on lazy components to defer hydration until they scroll into the viewport — this prioritises hydration of above-the-fold content and improves time-to-interactive [source](./.skilld/docs/3.guide/2.best-practices/performance.md#lazy-hydration)

- Use `ClientOnly` wrapper for browser-only code rather than checking `import.meta.client` in setup — this prevents hydration mismatches by explicitly marking content that should only render on the client side [source](./.skilld/docs/3.guide/2.best-practices/hydration.md#third-party-libraries-with-side-effects)

- Use `useCookie` instead of `localStorage` for persistent state — cookies are automatically synced between server and client during SSR, avoiding hydration mismatches from browser-only APIs [source](./.skilld/docs/3.guide/2.best-practices/hydration.md#browser-only-apis-in-server-context)

- Call Nuxt composables (`useState`, `useFetch`, `useRouter`, etc.) only within `<script setup>`, route middleware, or plugins — calling them elsewhere (async functions, event handlers) causes "Nuxt instance unavailable" errors because the composable context is lost [source](./.skilld/docs/3.guide/1.concepts/3.auto-imports.md#vue-and-nuxt-composables)

- Combine `useState` with `shallowRef` for large objects or arrays — shallow reactivity avoids expensive deep tracking and improves performance when large data structures don't need fine-grained reactivity [source](./.skilld/docs/4.api/2.composables/use-state.md#using-shallowref)

- Avoid large or costly plugin initialization logic — plugins run during hydration and block rendering, so defer expensive setup to Nuxt hooks or lazy-load initialization until `onMounted` [source](./.skilld/docs/3.guide/2.best-practices/plugins.md#avoid-costly-plugin-setup)

- Set `parallel: true` on asynchronous plugins to allow multiple plugins to load concurrently — by default plugins load sequentially, which delays the dev server and build process [source](./.skilld/docs/3.guide/2.best-practices/plugins.md#if-async-enable-parallel)

- Use `watch: false` on `useFetch` when reactive fetch options should not trigger refetches — this prevents unintended requests when refs used in query parameters or headers change [source](./.skilld/docs/4.api/2.composables/use-fetch.md#reactive-fetch-options)

- Use `routeRules` with hybrid rendering to apply different caching strategies per route — this allows building static pages at runtime (ISR), caching with revalidation (SWR), or client-side rendering (CSR) on the same app [source](./.skilld/docs/3.guide/1.concepts/1.rendering.md#hybrid-rendering)

- Prefix all module exports with the module name (e.g. `useFooData`, `<FooButton>`, `/api/_foo/...`) — this prevents naming conflicts with other modules, Nuxt internals, or user-defined code, especially important for server routes that commonly use `/api/auth` or `/api/user` [source](./.skilld/docs/3.guide/4.modules/6.best-practices.md#prefix-your-exports)
<!-- /skilld:best-practices -->

Related: vue-skilld
