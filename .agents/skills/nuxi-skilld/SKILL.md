---
name: nuxi-skilld
description: 'ALWAYS use when writing code importing "nuxi". Consult for debugging, best practices, or modifying nuxi, cli.'
metadata:
  version: 3.36.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-28
---

# nuxt/cli `nuxi@3.36.1`

**Tags:** latest: 3.36.1

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxi` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxi` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific CLI command and flag changes — prioritize recent major/minor releases.

- BREAKING: `module add` command renamed to `add` — v3.32.0 moved the command from `nuxi module add <name>` to `nuxi add <name>` [source](./.skilld/releases/v3.32.0.md#enhancements)

- NEW: `add` command — replaces `module add`, now the primary way to add modules or templates to a Nuxt project [source](./.skilld/releases/v3.32.0.md#enhancements)

- NEW: `template-add` command — added in v3.32.0 alongside the new `add` command, separate from module installation [source](./.skilld/releases/v3.32.0.md#enhancements)

- NEW: `module remove` command — added in v3.36.0 to remove modules from a project [source](./.skilld/releases/v3.36.0.md#enhancements)

- NEW: `--nightly` flag for `init` — added in v3.28.0, enables installing nightly versions of Nuxt and packages during project initialization [source](./.skilld/releases/v3.28.0.md#enhancements)

- NEW: `upgrade` command with named channels — v3.29.0 added `v3`, `v4`, `v3-nightly`, `v4-nightly` channel options for the upgrade command, allowing users to target specific release channels [source](./.skilld/releases/v3.29.0.md#enhancements)

- NEW: `-e` short alias for `--extends` — added in v3.27.0 as shorthand for specifying layer extensions [source](./.skilld/releases/v3.27.0.md#enhancements)

- NEW: `--profile` flag for `build` and `dev` commands — added in v3.34.0 to support performance profiling during build and development [source](./.skilld/releases/v3.34.0.md#enhancements)

- NEW: Shell completions — v3.31.0 added support for shell completions using `@bomb.sh/tab` for bash/zsh/fish completion support [source](./.skilld/releases/v3.31.0.md#enhancements)

- NEW: Fuzzy search for module selection — v3.33.0 added fuzzy search capability when users select modules during project initialization [source](./.skilld/releases/v3.33.0.md#enhancements)

- NEW: `init` non-interactive mode — v3.36.0 added support for non-interactive mode for automated project initialization [source](./.skilld/releases/v3.36.0.md#enhancements)

- NEW: `init` template selection prompt — v3.31.0 changed init flow to prompt user to select a template during project setup [source](./.skilld/releases/v3.31.0.md#enhancements)

**Also changed:** `init --aube` flag for aube package manager · `upgrade` default to v4 channel · Dropped proxy server architecture in v3.30.0 · CLI agent locking for concurrent dev/build · Vite/Vue version display in banner
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Fix hydration mismatches seriously — they force full component tree re-renders, destroying performance and breaking interactivity. Use SSR-friendly composables (`useFetch`, `useAsyncData`, `useState`), wrap client-only code with `ClientOnly`, and ensure server/client data consistency [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/hydration.md#why-is-it-important-to-fix-them)

- Use `<NuxtLink>` for all internal navigation to enable intelligent prefetching that detects visible links and pre-downloads their chunks before user interaction [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/performance.md#links)

- Lazy-load components with the `Lazy` prefix to defer bundle code until needed, significantly optimizing initial JavaScript size [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/performance.md#lazy-loading-components)

- Apply lazy hydration with `hydrate-on-visible` or other strategies to delay component interactivity until the browser is idle or elements are visible [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/performance.md#lazy-hydration)

- Use `useFetch` or `useAsyncData` instead of bare `$fetch` for initial data — they prevent double fetching by forwarding server data to the client in the payload [source](./.skilld/docs/raw/docs/4.x/getting-started/data-fetching.md#the-need-for-usefetch-and-useasyncdata)

- Leverage hybrid rendering with `routeRules` to set per-route caching strategies (prerender, SWR, ISR, client-only) and match rendering mode to content type [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/performance.md#hybrid-rendering)

- Optimize images with `<NuxtImg>` using `loading="eager"` and `fetchPriority="high"` for LCP-critical images, and `loading="lazy"` with low priority for non-critical ones [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/performance.md#images)

- Keep plugins lightweight — avoid expensive computations in setup. Defer time-consuming logic to Nuxt hooks to prevent blocking the dev server and build process [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/plugins.md#avoid-costly-plugin-setup)

- Set `parallel: true` for async plugins to allow multiple plugins to load concurrently instead of sequentially blocking each other [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/plugins.md#if-async-enable-parallel)

- Prefer composables and utilities over plugins when possible — many features can be implemented directly without needing plugin registration, keeping projects lighter and more maintainable [source](./.skilld/docs/raw/docs/4.x/guide/best-practices/plugins.md#use-composition-whenever-possible)

- Use `useState('key')` for reactive, SSR-safe shared state that persists through hydration across components [source](./.skilld/docs/raw/docs/4.x/getting-started/state-management.md#basic-usage)

- Never define `const state = ref()` at module level — it causes cross-request state pollution on the server and memory leaks. Instead use `const useX = () => useState('x')` [source](./.skilld/docs/raw/docs/4.x/getting-started/state-management.md#best-practices)

- Use `useRequestFetch` to automatically proxy client headers (including cookies) to API calls made during SSR, or manually pass headers with `useRequestHeaders` [source](./.skilld/docs/raw/docs/4.x/getting-started/data-fetching.md#pass-client-headers-to-the-api)

- Call Nuxt composables only in setup functions, plugins, middleware, or `<script setup>` blocks — calling them in async functions outside these contexts throws "Nuxt instance is unavailable" [source](./.skilld/docs/raw/docs/4.x/guide/concepts/auto-imports.md#vue-and-nuxt-composables)

- Set up centralized error handling via `vueApp.config.errorHandler` or the `vue:error` hook in a plugin to catch and report all Vue errors consistently [source](./.skilld/docs/raw/docs/4.x/getting-started/error-handling.md#vue-errors)

- Use module lifecycle hooks (`onInstall`, `onUpgrade`) instead of `setup` for one-time tasks like database schema generation — this prevents unnecessary work on every build [source](./.skilld/docs/raw/docs/4.x/guide/modules/best-practices.md#use-lifecycle-hooks)

- Prefix all module exports (components, composables, routes, config) with your module name to avoid conflicts with other modules and user code [source](./.skilld/docs/raw/docs/4.x/guide/modules/best-practices.md#prefix-your-exports)

<!-- /skilld:best-practices -->
