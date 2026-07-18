---
name: nuxi-skilld
description: "ALWAYS use when writing code importing \"nuxi\". Consult for debugging, best practices, or modifying nuxi, cli."
metadata:
  version: 3.37.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# nuxt/cli `nuxi@3.37.0`
**Tags:** latest: 3.37.0

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxi` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxi` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for nuxi v3.x. Focus on recent major/minor releases where breaking changes and new APIs are most likely to affect usage.

- BREAKING: `nuxi module add` → `nuxi add` — v3.32.0 moved module add to add command; old command no longer works [source](./.skilld/releases/v3.32.0.md#enhancements)

- NEW: `nuxi template-add` — new command added in v3.32.0 to manage template-specific operations [source](./.skilld/releases/v3.32.0.md#enhancements)

- BREAKING: proxy server removed — v3.30.0 drops the built-in proxy server in favour of direct listening; dev server no longer maintains persistent connections [source](./.skilld/releases/v3.30.0.md#highlights)

- NEW: upgrade channels — v3.29.0 adds v3, v4, v3-nightly, v4-nightly channels for nuxi upgrade command [source](./.skilld/releases/v3.29.0.md#enhancements)

- NEW: `nuxi module remove` — new command added in v3.36.0 for removing modules [source](./.skilld/releases/v3.36.0.md#enhancements)

- NEW: `--profile` flag — added in v3.34.0 to both dev and build commands for profiling support [source](./.skilld/releases/v3.34.0.md#enhancements)

- NEW: `-e` alias for `--extends` — v3.27.0 adds shorthand flag for extending configuration [source](./.skilld/releases/v3.27.0.md#enhancements)

- NEW: `--nightly` flag — v3.28.0 adds flag to nuxi init for installing nightly Nuxt versions [source](./.skilld/releases/v3.28.0.md#enhancements)

- NEW: agents locks — v3.35.0 adds locking mechanism for agents running dev and build commands [source](./.skilld/releases/v3.35.0.md#enhancements)

- NEW: `--non-interactive` mode for init — v3.36.0 adds non-interactive mode to nuxi init command [source](./.skilld/releases/v3.36.0.md#enhancements)

**Also changed:** shell completions via @bomb.sh/tab (v3.31) · template selection prompt in init (v3.31) · fuzzy search for module selection (v3.33) · install deps with aube (v3.36) · typecheck vue-tsc prompt (v3.36)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `useFetch` or `useAsyncData` for initial data fetching instead of `$fetch` in component setup — prevents double-fetching on server and client by serializing data into the payload [source](./.skilld/docs/raw/docs/4.x/getting-started/data-fetching.md:L14-L55)

- Avoid using browser-only APIs in setup context — wrap `localStorage`, `window`, or `document` access in `onMounted` or use SSR-friendly alternatives like `useCookie` [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/hydration.md:L30-L60)

- Implement dynamic data fetching with computed or ref URLs in `useFetch` — automatically refetches when reactive dependencies change [source](./.skilld/docs/raw/docs/4.x/api/composables/use-fetch.md:L75-L96)

- Apply abort signal support when using `useAsyncData` — enables cancellation of pending requests when users navigate away or refresh [source](./.skilld/docs/raw/docs/4.x/api/composables/use-async-data.md:L80-L130)

- Defer time-consuming logic to Nuxt lifecycle hooks in modules instead of the setup function — module setup must complete within 1 second to avoid warnings [source](./.skilld/docs/raw/docs/4.x/guide/modules/best-practices.md:L7-L17)

- Prefix module exports with a unique namespace to prevent naming collisions — use module-scoped names for components, composables, and routes [source](./.skilld/docs/raw/docs/4.x/guide/modules/best-practices.md:L19-L130)

- Enable `parallel: true` for asynchronous plugins to allow concurrent loading — prevents blocking the dev server or build process [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/plugins.md:L14-L18)

- Use `<NuxtIsland>` for static, non-interactive sections to reduce client-side JavaScript — no hydration overhead for pure content [source](./.skilld/docs/raw/docs/4.x/api/components/nuxt-island.md:L1-L20)

- Wrap client-only code with `onMounted` or `<ClientOnly>` component instead of checking `import.meta.client` in setup — maintains hydration consistency [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/hydration.md:L106-L130)

- Always provide an abort signal to `useAsyncData` handler for clean cancellation — allows prior requests to be cancelled when a new fetch occurs [source](./.skilld/docs/raw/docs/4.x/api/composables/use-async-data.md:L80-L96)

- Leverage `definePageMeta` to set layout metadata instead of hard-coding layout components in pages — enables dynamic layout switching via middleware [source](./.skilld/docs/raw/docs/4.x/api/utils/define-page-meta.md)

- Use error hooks (`vue:error` hook in plugins, or `onErrorCaptured`) to centralize error handling — provides a single point to catch and report all Vue errors [source](./.skilld/docs/raw/docs/4.x/getting-started/error-handling.md:L18-L37)

- Call Nuxt composables only within the correct lifecycle context (setup, plugins, middleware) — composables track the active Nuxt instance, which is unavailable outside these contexts [source](./.skilld/docs/raw/docs/4.x/guide/concepts/auto-imports.md:L56-L76)

- Use reactive fetch options (refs or computed) in `useFetch` to trigger automatic refetching when dependencies change [source](./.skilld/docs/raw/docs/4.x/api/composables/use-fetch.md:L121-L145)

- Set `lazy: true` for route-specific data that doesn't block navigation — allows immediate navigation and defers data loading [source](./.skilld/docs/raw/docs/4.x/getting-started/data-fetching.md:L68-L86)

- Use `createUseFetch` or `createUseAsyncData` to create custom composables with preset defaults — avoids duplicating default options (baseURL, headers, auth) [source](./.skilld/docs/raw/docs/4.x/api/composables/use-fetch.md:L24-L28)

- Keep composables synchronous by calling `useNuxtApp()` and other context-dependent utilities inside the composable function, not at module scope — prevents `Nuxt instance is unavailable` errors [source](./.skilld/docs/raw/docs/4.x/guide/concepts/auto-imports.md:L90-L111)
<!-- /skilld:best-practices -->
