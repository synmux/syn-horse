---
name: nuxt-scripts-skilld
description: "ALWAYS use when writing code importing \"@nuxt/scripts\". Consult for debugging, best practices, or modifying @nuxt/scripts, nuxt/scripts, nuxt scripts, scripts."
metadata:
  version: 1.2.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# nuxt/scripts `@nuxt/scripts@1.2.1`
**Tags:** beta: 1.0.0-beta.32, rc: 1.0.0-rc.11, latest: 1.2.1

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/scripts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/scripts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

- BREAKING: Registry entries no longer auto-load without `trigger` — must explicitly set `trigger: 'onNuxtReady'` or `trigger: false` to silence build warning. In v0 all configured entries auto-loaded globally; v1 registers infrastructure (types, bundling, proxy) but blocks injection without an explicit trigger [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scripts-no-longer-auto-load-without-a-trigger)

- BREAKING: PayPal SDK v6 API — `ScriptPayPalButtons` component rewired to expose SDK instance via scoped slot, `PayPalOptions` reduced to `clientId?`, `clientToken?`, `sandbox?`, `ScriptPayPalMarks` removed, `PayPalNamespace` replaced with `PayPalV6Namespace`, payment flow uses `createPayPalOneTimePaymentSession()` instead of button callbacks [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#paypal-sdk-v6)

- BREAKING: Google Maps components consolidated — `ScriptGoogleMapsAdvancedMarkerElement` and legacy `ScriptGoogleMapsMarker` unified into single `ScriptGoogleMapsMarker` (wrapping `google.maps.marker.AdvancedMarkerElement`), `ScriptGoogleMapsPinElement` removed, replaced by `#content` slot on markers [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scriptgooglemapsadvancedmarkerelement---scriptgooglemapsmarker-deprecated)

- BREAKING: Google Maps `markers`/`centerMarker` props removed — use child `<ScriptGoogleMapsMarker>` components instead, `placeholderOptions`/`placeholderAttrs`/`aboveTheFold` props removed, use `<ScriptGoogleMapsStaticMap>` component in `#placeholder` slot [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#markers-and-centermarker-props-removed)

- DEPRECATED: Google Maps `:center`/`:zoom` props — use `:map-options="{ center, zoom }"` instead, old form still works with dev-mode warning [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#top-level-center--zoom-deprecated)

- DEPRECATED: Google Maps `googleMaps` ref key — renamed to `mapsApi` to better reflect the `google.maps` API namespace it holds, old key still works with one-shot dev-mode warning [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#template-ref-googlemaps--mapsapi)

- BREAKING: YouTube Player aspect ratio — use `ratio` prop instead of deriving from `width`/`height`, default changed from `contain` to `cover` for placeholder `object-fit`, `width` and `height` props still control iframe dimensions only [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#aspect-ratio)

- BREAKING: GTM `onBeforeGtmStart` callback timing — now fires for cached/pre-initialized scripts, guard with `if (initialized) return` to prevent multiple invocations [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#onbeforegtmstart-callback)

- NEW: `useScript().reload()` — function to remove and re-execute a script, useful for third-party DOM scanners after SPA navigation [source](./.skilld/docs/content/docs/3.api/1.use-script.md#reload)

- NEW: First-party mode privacy proxy — reverse proxy bundled scripts at build time, routes runtime requests through server with anonymization (IPs, user agents, languages), auto-enabled per-script [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-party-mode-privacy-focused-proxy)

- NEW: Partytown web worker support — set `partytown: true` per-script to load off main thread, auto-forwards configured for analytics scripts, incompatible with DOM-access scripts (GTM, Hotjar, chat widgets) [source](./.skilld/docs/content/docs/5.releases/1.v1.md#partytown-web-worker-support)

- NEW: SSR social embeds — `ScriptXEmbed`, `ScriptInstagramEmbed`, `ScriptBlueskyEmbed` components fetch embed data server-side and proxy assets through your domain with full slot control [source](./.skilld/docs/content/docs/5.releases/1.v1.md#ssr-social-embeds)

- NEW: `useScriptTriggerConsent()` composable with revoke support — `accept()` and `revoke()` methods plus `consented` ref, replaces promise-only v0 API, gates script loading based on consent state [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-class-consent-controls)

- NEW: Vendor-native consent objects — registry scripts expose `consent` object with vendor-specific API (GCMv2 for Google/Bing, `grant`/`revoke` for Meta, `opt_in`/`opt_out` for Mixpanel/PostHog), plus `defaultConsent` option applied before first tracking call [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-class-consent-controls)

- NEW: `@nuxt/scripts/stats` export — `getScriptStats()` function for auditing privacy ratings, performance, CWV estimates, cookie analysis, and tracked data types [source](./.skilld/docs/content/docs/5.releases/1.v1.md#script-stats-export)

- NEW: Google Maps components — 11 new declarative components (`ScriptGoogleMapsMarker`, `ScriptGoogleMapsCircle`, `ScriptGoogleMapsPolygon`, `ScriptGoogleMapsPolyline`, `ScriptGoogleMapsRectangle`, `ScriptGoogleMapsMarkerClusterer`, `ScriptGoogleMapsHeatmapLayer`, `ScriptGoogleMapsOverlayView`, `ScriptGoogleMapsGeoJson`, `ScriptGoogleMapsStaticMap`) with Vue injection system and automatic cleanup [source](./.skilld/docs/content/docs/5.releases/1.v1.md#google-maps-overhaul)

**Also changed:** YouTube Player `ratio` prop · Vimeo Player `ratio` prop · Automatic SRI integrity hashes via `scripts.assets.integrity` config · Environment variable config via `NUXT_PUBLIC_SCRIPTS_*` vars · New registry scripts: PostHog, Google reCAPTCHA v3, TikTok Pixel, Google Sign-In, Rybbit Analytics, Databuddy Analytics, Bing UET, Mixpanel Analytics, Vercel Analytics, Gravatar · Google Maps color mode support via `mapIds` prop · Google Maps geocode proxy for server-side geocoding · Type augmentation reorganization (run `nuxi prepare` after upgrade)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Wrap `useScript()` calls in composables when you reference them across multiple components — scripts load as global singletons, and wrapper composables make instantiation consistent and easier to maintain [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md:L19:33)

- Use `onNuxtReady` trigger by default for analytics, tracking, and non-critical scripts — it ensures Nuxt hydration completes and the browser main thread is idle before loading, minimizing impact on Core Web Vitals [source](./.skilld/docs/content/docs/1.guides/1.script-triggers.md:L43:65)

- Lazy-load non-critical content scripts via `useScriptTriggerInteraction()` with click/touchstart events instead of scroll — scroll handlers cause excessive script loading and lost click events; explicit user interaction is more predictable [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md:L64:69)

- Combine `useScriptTriggerConsent()` as a load gate with the script's `defaultConsent` option for vendor-native consent APIs — this ensures both the script load is gated and the vendor receives the correct initial consent state [source](./.skilld/docs/content/docs/1.guides/3.consent.md:L90:124)

- Enable first-party mode by default for privacy-critical scripts; override global `privacy` tier only for scripts where analytics/fingerprinting is necessary (e.g. session replay tools preserve screen + user agent) [source](./.skilld/docs/content/docs/1.guides/2.first-party.md:L58:116)

- Initialize registry scripts in `nuxt.config.ts` or `app.vue` to enforce the singleton pattern — subsequent calls in other components return the same cached instance without re-initializing [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md:L178:222)

- Set `assets.integrity: 'sha256'` for bundled scripts to enable Subresource Integrity verification — prevents tampered or stale bundled assets from loading [source](./.skilld/docs/content/docs/3.api/5.nuxt-config.md:L241:248)

- Use `onLoaded()` callback instead of awaiting proxied functions when you need the real script API — awaiting blocks rendering; `onLoaded` executes the callback once the script loads without stalling the component [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md:L70:78)

- Call `useScriptEventPage()` instead of manually tracking page changes to ensure the page title is fully resolved before sending analytics events [source](./.skilld/docs/content/docs/1.guides/3.page-events.md:L22:33)

- Customize `warmupStrategy` per-script: use `'preload'` for scripts that load within 2 seconds, `'preconnect'` for later-loading third-party scripts, `'dns-prefetch'` for conditional loads, and `false` for bundled/same-origin scripts [source](./.skilld/docs/content/docs/1.guides/1.warmup.md:L27:56)

- Provide error fallbacks and loading states when using Facade Components — at minimum use `<template #error>` with user-friendly messaging and `<template #loading>` with `<ScriptLoadingIndicator />` for accessibility [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md:L36:62)

- Use environment variables via `runtimeConfig.public.scripts.*` for registry script credentials — this separates secrets from build-time config and allows per-deployment overrides without rebuilding [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md:L57:87)

- Provide a unique `key` when loading the same registry script multiple times with different configs — without a key, both calls return the first cached instance, silently ignoring the second config [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md:L118:150)
<!-- /skilld:best-practices -->
