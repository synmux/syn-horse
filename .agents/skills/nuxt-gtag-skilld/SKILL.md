---
name: nuxt-gtag-skilld
description: 'ALWAYS use when writing code importing "nuxt-gtag". Consult for debugging, best practices, or modifying nuxt-gtag, nuxt gtag.'
metadata:
  version: 4.1.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# johannschopplich/nuxt-gtag `nuxt-gtag@4.1.0`

**Tags:** latest: 4.1.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt-gtag` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt-gtag` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: Multi-tenancy support — with consent mode and dynamic tag IDs, providing new capabilities for managing Google Tag. [source](./.skilld/releases/v4.1.0.md#features)

- BREAKING: Upgrade to Nuxt v4 — nuxt-gtag now requires Nuxt v4, which may involve migration steps for existing Nuxt 3 projects. [source](./.skilld/releases/v4.0.0.md#breaking-changes)

- BREAKING: `initMode` for manual Gtag initialization — the `enabled` option is replaced by `initMode: 'manual'` for manual initialization; `enabled` now disables the module per environment. [source](./.skilld/releases/v3.0.0.md#breaking-changes)

**Also changed:** `enabled` option repurposed for environment-specific module disabling [source](./.skilld/releases/v3.0.0.md#migration)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `useTrackEvent` outside of `onMounted` hooks to ensure it is SSR-ready. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-26.md:L22)

- Activate debug mode for a Google Tag ID by setting `debug_mode: true` within the `config` option in `nuxt.config.ts`. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-69.md:L32:38)

- To send data to multiple destinations, configure multiple Google Tag IDs using the `tags` array in `nuxt.config.ts`, each with its own `config` if needed. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-43.md:L25:35)

- Dynamically change the Google Tag ID during the application's lifecycle using `initialize(newTagId)` from `useGtag`. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-101.md:L29:34)

- For cross-domain measurement, prefer configuring it via the Analytics interface; for custom solutions, use `useGtag()` to get the `gtag` instance and then `gtag('get', 'TAG_ID', 'client_id', ...)` and `gtag('get', 'TAG_ID', 'session_id', ...)` as per Google's documentation. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-91.md:L25)

- Ensure `initialize()` (formerly `grantConsent()`) is called only on the client-side for it to take effect when managing consent. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-45.md:L44)

- For Google Consent Mode V2, set default consent values using `initCommands` in `nuxt.config.ts` (e.g., `['consent', 'default', {...}]`) and update consent with `gtag('consent', 'update', {...})` via `useGtag` after user interaction. [source](./.skilld/repos/johannschopplich/nuxt-gtag/releases/v2.0.0.md:L65:77)

- Integrate with a Consent Management Platform (CMP); Google Consent Mode is not a replacement but rather adjusts tag behavior based on CMP input. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-78.md:L44)

- `nuxt-gtag` supports Google Ads conversions using the standard `gtag('event', 'conversion', {...})` syntax. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-40.md:L16)

- To add values to the `dataLayer` property, use `useGtag` to access `gtag` and then interact with the `dataLayer` object. [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-41.md:L28)

- (Avoid) Do not attempt to import `useGtag` directly from the package exports as it requires Nuxt context and will fail outside of a Nuxt environment (e.g., Storybook). [source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-95.md:L39:43)

- When migrating to v3+, replace the `enabled` option with `initMode: 'manual'` in `nuxt.config.ts` for manual Gtag initialization. [source](./.skilld/repos/johannschopplich/nuxt-gtag/releases/v3.0.0.md:L15:27)

- To disable tracking on localhost, unset the Gtag ID during development by using the `$development` environment specific configuration in `nuxt.config.ts`, setting `gtag.id` to `undefined`.

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ["nuxt-gtag"],

  $development: {
    gtag: {
      id: undefined
    }
  },

  gtag: {
    id: "G-XXXXXXXXXX"
  }
})
```

[source](./.skilld/repos/johannschopplich/nuxt-gtag/discussions/discussion-20.md:L22:33)

- When using manual initialization with consent, ensure `initCommands` are set for default consent and `initialize(id)` is called to load gtag.js after consent is managed. [source](./.skilld/repos/johannschopplich/nuxt-gtag/issues/issue-97.md:L23:27)
<!-- /skilld:best-practices -->
