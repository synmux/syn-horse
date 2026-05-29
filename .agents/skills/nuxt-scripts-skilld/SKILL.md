---
name: nuxt-scripts-skilld
description: "ALWAYS use when writing code importing \"@nuxt/scripts\". Consult for debugging, best practices, or modifying @nuxt/scripts, nuxt/scripts, nuxt scripts, scripts."
metadata:
  version: 1.1.1
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt/scripts `@nuxt/scripts@1.1.1`
**Tags:** beta: 1.0.0-beta.32, rc: 1.0.0-rc.11, latest: 1.1.1

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/scripts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/scripts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: PayPal SDK v5 API removed — migrate to v6 which uses instance-based initialization (`createInstance()`), eligibility-first rendering, and session-based payment flows. Component API has changed significantly. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#paypal-sdk-v6-628)

- BREAKING: `ScriptPayPalMarks` removed — no v6 equivalent, use `sdkInstance.findEligibleMethods()` instead. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#paypal-sdk-v6-628)

- BREAKING: `PayPalNamespace` type replaced with `PayPalV6Namespace` from `@paypal/paypal-js/sdk-v6`. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#paypal-sdk-v6-628)

- BREAKING: `ScriptGoogleMapsPinElement` removed — use `#content` slot on `ScriptGoogleMapsMarker` instead. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scriptgooglemapspinelement-removed)

- BREAKING: `ScriptGoogleMaps` `markers` and `centerMarker` props removed — use child `<ScriptGoogleMapsMarker>` components instead. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#markers-and-centermarker-props-removed)

- BREAKING: `ScriptGoogleMaps` `placeholderOptions`, `placeholderAttrs`, and `aboveTheFold` props removed — compose with new standalone `<ScriptGoogleMapsStaticMap>` component inside the `#placeholder` slot. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#static-placeholder-props-removed-673)

- NEW: `<ScriptGoogleMapsStaticMap>` component introduced — provides static map capabilities, replacing `placeholderOptions`, `placeholderAttrs`, and `aboveTheFold` props on `<ScriptGoogleMaps>`. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#static-placeholder-props-removed-673)

- DEPRECATED: Registry entries no longer auto-load without a `trigger` — add `trigger: 'onNuxtReady'` or `trigger: false` to avoid build warnings. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scripts-no-longer-auto-load-without-a-trigger)

- DEPRECATED: `true` shorthand for registry config emits a deprecation warning — use `{ trigger: 'onNuxtReady' }` instead. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#legacy-shorthand-still-works)

- DEPRECATED: `ScriptGoogleMapsAdvancedMarkerElement` replaced by `ScriptGoogleMapsMarker` — old component still works via shim with dev deprecation warning. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scriptgooglemapsadvancedmarkerelement--scriptgooglemapsmarker-deprecated)

- DEPRECATED: `ScriptGoogleMaps` top-level `:center` and `:zoom` props — pass them via `:map-options="{ center, zoom }"` instead. Legacy form emits dev-mode warning. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#top-level-center--zoom-deprecated-694)

- RENAMED/DEPRECATED: `ScriptGoogleMaps` `googleMaps` template ref key renamed to `mapsApi` — old key still works as deprecated alias. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#template-ref-googlemaps--mapsapi-695)

- RENAMED/DEPRECATED: `ScriptGoogleMapsOverlayView` `overlay` key renamed to `overlayView` — old key still works as deprecated alias. [source](./.skilld/references/@nuxt/scripts@1.1.1/docs/content/docs/4.migration-guide/1.v0-to-v1.md#template-ref-googlemaps--mapsapi-695)

**Also changed:** YouTube Player `width`/`height` no longer drive aspect ratio (use `ratio` prop) · YouTube Player placeholder `object-fit` default changed from `contain` to `cover` · GTM `onBeforeGtmStart` callback now fires for cached scripts, guard with `if (initialized) return`
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use a unique script ID for Plausible Analytics (new format as of October 2025) for site identification. [source](./.skilld/pkg/dist/runtime/registry/plausible-analytics.d.ts:L20)

- Wrap `useScript()` calls in custom composables to manage singleton behavior and provide easier instantiation. [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md#script-singleton)

- Leverage `proxy` for SSR-safe function calls without awaiting script load, especially when direct return values are not immediately needed. [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md#understanding-proxied-functions)

- Explicitly await script load using `onLoaded` when direct access to the script instance and its return values is required. [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md#understanding-proxied-functions)

- Configure registry scripts via `.env` and `runtimeConfig` to manage environment-specific options without hardcoding. [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#runtime-config-integration)

- Use `mock: 'mock'` for registry scripts in development to prevent actual script loading while still enabling testing of exposed APIs. [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#disabling-in-development)

- Provide a unique `key` when intentionally loading multiple instances of the same registry script to avoid deduping. [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#loading-multiple-of-the-same-script)

- Initialize registry scripts in `app.vue` or `nuxt.config.ts` for consistent, single-instance loading and better performance across components. [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#loading-best-practices)

- Leverage `onNuxtReady` as the default trigger for idle loading, minimizing impact on Core Web Vitals and user experience. [source](./.skilld/docs/content/docs/1.guides/1.script-triggers.md#default-onnuxtready)

- Employ `warmupStrategy: 'preload'` for immediate script loads and `'preconnect'` for scripts loaded within 10 seconds from different origins to optimize network requests. [source](./.skilld/docs/content/docs/1.guides/1.warmup.md#warmupstrategy)

- Implement cookie consent using `useScriptTriggerConsent()` as a binary load gate and manage vendor-native consent via per-script `consent` objects. [source](./.skilld/docs/content/docs/1.guides/3.consent.md#two-complementary-primitives)

- Bundle scripts as assets (`bundle: true`) to avoid extra DNS lookups and reduce requests, improving performance. [source](./.skilld/pkg/dist/runtime/types.d.ts:L95)

- When resolving Google Maps locations, use `ScriptGoogleMapsExpose.resolveQueryToLatLng` to leverage caching and server-side proxies, avoiding unnecessary client-side API calls. [source](./.skilld/pkg/dist/runtime/components/GoogleMaps/ScriptGoogleMaps.vue.d.ts:L77-80)
<!-- /skilld:best-practices -->
