---
name: nuxt-skilld
description: 'ALWAYS use when writing code importing "nuxt". Consult for debugging, best practices, or modifying nuxt.'
metadata:
  version: 4.4.2
  generated_at: 2026-04-11
---

# nuxt/nuxt `nuxt@4.4.2`

**Tags:** 1x: 1.4.5, 2x: 2.18.1, alpha: 4.0.0-alpha.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for Nuxt v4.x — prioritise recent major/minor releases.

- BREAKING: `useAsyncData` handler signature — v4.2 added a second `{ signal }` parameter to the handler: `(nuxtApp, { signal }) => Promise<T>`. Old handlers using `(nuxtApp) => ...` still compile but miss abort support. The `signal` enables `refresh()` to actually cancel in-flight `$fetch` requests when `dedupe: 'cancel'` [source](./.skilld/releases/v4.2.0.md#abort-control-for-data-fetching)

- BREAKING: `useAsyncData` / `useFetch` singleton data layer — v4.0 changed all calls with the same key to share `data`, `error`, and `status` refs. Multiple components with conflicting `deep`, `transform`, `pick`, `getCachedData`, or `default` options on the same key will now warn and behave inconsistently [source](./.skilld/docs/1.getting-started/18.upgrade.md:L411)

- BREAKING: `getCachedData` third parameter — v4.0 changed `getCachedData` to receive a `context` object as its third parameter with a `cause` field (`'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'`). The function is now called on every fetch (including watcher-triggered and manual refreshes), not just initial loads [source](./.skilld/docs/1.getting-started/18.upgrade.md:L448:L464)

- BREAKING: `useAsyncData` / `useFetch` data cleanup — v4.0 now automatically purges cached data when the last component using a key unmounts. Code that relied on stale data persisting after unmount will break silently. Disable with `experimental.purgeCachedData: false` [source](./.skilld/releases/v4.0.0.md:L191:L192)

- BREAKING: `window.__NUXT__` removed after hydration — v4.0 removes the global `window.__NUXT__` object post-hydration. Use `useNuxtApp().payload` instead [source](./.skilld/docs/1.getting-started/18.upgrade.md:L1107:L1124)

- BREAKING: Default `srcDir` changed to `app/` — v4.0 defaults to `app/` directory structure. The `~` alias now points to `app/`. Old flat structures auto-detected but `modules/`, `public/`, `shared/`, `server/` resolve from `rootDir`, not `srcDir` [source](./.skilld/docs/1.getting-started/18.upgrade.md:L309:L401)

- BREAKING: `builder:watch` hook emits absolute paths — v4.0 changed from relative to absolute paths. Handlers must convert: `path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))` [source](./.skilld/releases/v4.0.0.md:L163)

- BREAKING: `compatibilityVersion: 3` removed — v4.0 removed support for setting `compatibilityVersion` to `3`. Only `4` (default) and `5` (opt-in future) are valid [source](./.skilld/releases/v4.0.0.md:L195)

- BREAKING: `~public` and `~assets` aliases removed — v4.0 removed the `public` and `assets` path aliases. Use `~/public` or absolute paths instead [source](./.skilld/releases/v4.0.0.md:L200)

- BREAKING: Top-level `generate` config option removed — v4.0 removed the deprecated `generate` option from `nuxt.config`. Use `nitro.prerender` or route rules instead [source](./.skilld/releases/v4.0.0.md:L202)

- DEPRECATED: `statusCode` / `statusMessage` on `createError` — v4.3 deprecated in favour of `status` / `statusText` (Web API naming). Old properties still work but are deprecated ahead of v5 [source](./.skilld/releases/v4.3.0.md#deprecations)

- DEPRECATED: `installModule` — v4.1 deprecated in favour of `moduleDependencies` in `defineNuxtModule()`, which supports version constraints, defaults, and overrides [source](./.skilld/releases/v4.1.0.md:L164)

- NEW: `createUseFetch()` / `createUseAsyncData()` — v4.4 factory functions to create custom instances of `useFetch` / `useAsyncData` with pre-defined default options. Accepts a plain object or a function for full merge control [source](./.skilld/releases/v4.4.0.md#createusefetch-and-createuseasyncdata)

- NEW: `useAnnouncer()` composable and `<NuxtAnnouncer>` component — v4.4 accessibility composable for announcing dynamic in-page changes to screen readers. Provides `polite()` and `assertive()` methods [source](./.skilld/releases/v4.4.0.md#useannouncer-composable)

- NEW: `setPageLayout()` accepts props — v4.3 added a second `props` parameter to `setPageLayout(layout, props)` for passing typed props to layouts [source](./.skilld/releases/v4.3.0.md#layout-props-with-setpagelayout)

- NEW: `definePageMeta` typed layout props — v4.4 allows passing props to layouts via `definePageMeta({ layout: { name, props } })` with full type inference from layout `defineProps` [source](./.skilld/releases/v4.4.0.md#typed-layout-props-in-definepagepagemeta)

- NEW: `appLayout` in route rules — v4.3 allows setting layouts declaratively in `routeRules` via the new `appLayout` property [source](./.skilld/releases/v4.3.0.md#route-rule-layouts)

- NEW: `#server` import alias — v4.3 added `#server` alias for clean imports within `server/` directory (e.g. `import { helper } from '#server/utils/helper'`), with import protection preventing accidental client-side usage [source](./.skilld/releases/v4.3.0.md#server-alias)

- NEW: `useCookie` `refresh` option — v4.4 added `refresh: boolean` option to `useCookie` that extends cookie expiration on every assignment even when the value hasn't changed [source](./.skilld/releases/v4.4.0.md#refresh-option-for-usecookie)

- NEW: `clearNuxtState` resets to default — v4.4 changed `clearNuxtState()` and `useState` to reset to the initial `init` value instead of `undefined`. Controlled by `experimental.defaults.useState.resetOnClear` [source](./.skilld/releases/v4.4.0.md#usestate-reset-to-default)

- NEW: `onInstall` / `onUpgrade` module hooks — v4.1 added lifecycle hooks for modules to run setup on first install or after version upgrade. Requires `meta.name` and `meta.version` [source](./.skilld/releases/v4.1.0.md#module-lifecycle-hooks)

- NEW: `getLayerDirectories()` utility — v4.1 added to `@nuxt/kit` as the public API for accessing layer directories, replacing direct access to `nuxt.options._layers` [source](./.skilld/releases/v4.1.0.md#layer-directories-utility)

**Also changed:** `moduleDependencies` in `defineNuxtModule` replaces `installModule` v4.1 · `payloadExtraction: 'client'` mode v4.4 (experimental) · `experimental.extractAsyncDataHandlers` v4.2 (experimental) · route groups exposed in `route.meta.groups` v4.3 · `route.meta.name` deduplicated (use `route.name`) v4.0 · Unhead v2 (removed `vmid`/`hid`/`children`/`body` props) v4.0 · `render:html` hook no longer called for server islands v4.0 · `globalName` property removed v4.0 · `config.schema.json` export removed v4.0 · `shared/` directory with auto-imports v4.0 · vue-router v5 upgrade v4.4 · `setGlobalHead()` kit utility v4.2

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Plan: Generate \_BEST_PRACTICES.md for nuxt v4.4.2

## Context

The nuxt skilld package needs a `_BEST_PRACTICES.md` file that captures non-obvious, Nuxt-specific patterns an LLM wouldn't already know. This helps AI agents working with Nuxt codebases make better decisions.

## Research Complete

I've read the following reference files:

- Best practices docs (performance, hydration, plugins)
- Data fetching docs (useFetch, useAsyncData, getCachedData, etc.)
- State management docs (useState, clearNuxtState, callOnce)
- Configuration docs (runtimeConfig, app.config, env overrides)
- Auto-imports docs (composable context, #imports alias)
- Directory structure docs (shared/, server/, components/, middleware/)
- Release notes for v4.4.0, v4.3.0, v4.2.0 (new features)
- API docs for createUseFetch, useCookie, useAsyncData, callOnce
- Custom useFetch recipe
- Component lazy hydration docs
- Verified exports in pkg/dist/app/index.d.ts

## Verified API Exports

All mentioned APIs confirmed in `pkg/dist/app/index.d.ts`:

- useAsyncData, useFetch, useLazyFetch, useLazyAsyncData
- callOnce, useState, clearNuxtState
- useCookie, refreshCookie
- useRequestFetch, useRequestHeaders
- useAnnouncer, useRouteAnnouncer
- setPageLayout, navigateTo, abortNavigation
- NuxtTimeProps type

Note: `createUseFetch` / `createUseAsyncData` are compiler macros, not runtime exports — documented in the API docs.

## 14 Best Practice Items Planned

1. **createUseFetch factory** (v4.4.0) — use for API-wide defaults instead of manual wrapper composables
2. **useAsyncData handler must be side-effect-free** — use callOnce for side effects
3. **Always provide explicit keys for useAsyncData** in custom composables
4. **Use the `signal` parameter** in useAsyncData handlers to support request cancellation
5. **Async plugins must set `parallel: true`** to avoid blocking hydration
6. **useCookie `refresh` option** (v4.4.0) for session extension without value changes
7. **clearNuxtState resets to default** (v4.4.0) — not undefined
8. **shared/ directory** for code shared between Vue app and Nitro server
9. **Route groups in page meta** (v4.3.0) for convention-based authorization
10. **Lazy hydration strategies** — hydrate-on-visible, hydrate-on-idle for performance
11. **payloadExtraction: 'client'** (v4.4.0) for cached/ISR routes
12. **runtimeConfig must define all keys in nuxt.config** — env vars only override existing keys
13. **useFetch auto-proxies client headers via useRequestFetch** — no manual header forwarding needed
14. **`#server` alias** (v4.3.0) for clean server-directory imports with import protection

## Diversity Check

- Data fetching: 5 items (1, 2, 3, 4, 11)
- State/cookies: 2 items (6, 7)
- Plugins: 1 item (5)
- Directory structure/code sharing: 2 items (8, 14)
- Routing/navigation: 1 item (9)
- Performance/hydration: 1 item (10)
- Configuration: 1 item (12)
- SSR behaviour: 1 item (13)

Data fetching is at 5/14 = 36%, under the 40% cap.

## Output

Write to `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/nuxt-skilld/.skilld/_BEST_PRACTICES.md`
Then validate with `skilld validate`.

<!-- /skilld:best-practices -->

Related: vue-skilld
