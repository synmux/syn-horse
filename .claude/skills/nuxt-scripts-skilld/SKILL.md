---
name: nuxt-scripts-skilld
description: 'ALWAYS use when writing code importing "@nuxt/scripts". Consult for debugging, best practices, or modifying @nuxt/scripts, nuxt/scripts, nuxt scripts, scripts.'
metadata:
  version: 1.1.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-17
---

# nuxt/scripts `@nuxt/scripts@1.1.0`

**Tags:** beta: 1.0.0-beta.32, rc: 1.0.0-rc.11, latest: 1.1.0

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/scripts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/scripts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes — @nuxt/scripts

This section documents version-specific API changes in @nuxt/scripts v1.x, focusing on breaking changes, deprecations, and new features that differ from v0.x.

## API Changes

### Registry Configuration

BREAKING: Registry entries no longer auto-load globally without an explicit `trigger` option. In v0, any configured entry injected a script tag; in v1, configuration registers types and infrastructure but requires `trigger: 'onNuxtReady'` or `trigger: false` to control injection. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#registry-config)

BREAKING: `true` shorthand for registry entries deprecated. Migrate `googleAnalytics: true` to `googleAnalytics: { trigger: 'onNuxtReady' }`. The tuple form `[options, scriptOptions]` still works. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#legacy-shorthand-still-works)

### PayPal Integration

BREAKING: PayPal SDK v6 migration. SDK moved from v5 to v6 endpoints (`/web-sdk/v6/core`), instance-based initialization via `createInstance()`, and session-based payment flows. `ScriptPayPalMarks` removed; use `sdkInstance.findEligibleMethods()` instead. `PayPalNamespace` type replaced with `PayPalV6Namespace`. Component now uses scoped slot `#default="{ sdkInstance }"` to expose the v6 instance. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#paypal-sdk-v6-628)

### YouTube Player

BREAKING: Use `ratio` prop instead of deriving aspect ratio from `width`/`height` pair. `width` and `height` still control iframe dimensions but no longer drive wrapper aspect ratio; default is `16/9`. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#aspect-ratio)

BREAKING: Placeholder `object-fit` default changed from `contain` to `cover`. Pass `placeholder-object-fit="contain"` to restore v0 behaviour. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#placeholder-image)

### Google Tag Manager

BREAKING: `onBeforeGtmStart` callback now fires for cached/pre-initialized scripts. Guard against multiple calls by checking a flag: `if (initialized) return; initialized = true;` before init code. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#onbeforegtmstart-callback)

### Google Maps

BREAKING: `ScriptGoogleMaps` marker and placeholder props removed. Use child `<ScriptGoogleMapsMarker>` components instead of `markers` array prop, and the `#placeholder` slot with `<ScriptGoogleMapsStaticMap>` instead of `placeholderOptions`/`placeholderAttrs`/`aboveTheFold`. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#markers-and-centermarker-props-removed)

BREAKING: `ScriptGoogleMaps` props `center` and `zoom` at top level removed. Pass them via `:map-options="{ center, zoom }"` instead. Top-level props still work with dev-mode deprecation warning; `mapOptions` wins if both set. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#top-level-center--zoom-deprecated-694)

BREAKING: `ScriptGoogleMapsPinElement` removed. Use the `#content` slot on `<ScriptGoogleMapsMarker>` with custom HTML/Vue content instead. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scriptgooglemapspinelement-removed)

DEPRECATED: `ScriptGoogleMapsAdvancedMarkerElement` deprecated in favour of `ScriptGoogleMapsMarker`. Still works via thin shim with dev-mode warning. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#scriptgooglemapsadvancedmarkerelement--scriptgooglemapsmarker-deprecated)

DEPRECATED: Template ref key `googleMaps` on `<ScriptGoogleMaps>` changed to `mapsApi` to better reflect what it holds (the `google.maps` API namespace). Old key still works as alias with one-shot dev-mode warning. Same rename applies to `<ScriptGoogleMapsOverlayView>`: `overlay` → `overlayView`. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#template-ref-googlemaps--mapsapi-695)

### New Composables & Consent APIs

NEW: `useScriptTriggerConsent()` composable with runtime revoke support. Accept, revoke, or check consent status via `trigger.accept()`, `trigger.revoke()`, and `trigger.consented` ref. Replaces the v0 pattern of only granting consent at load time. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-class-consent-controls)

NEW: Vendor-native consent objects on all consent-aware registry scripts (`useScriptGoogleTagManager`, `useScriptMetaPixel`, `useScriptMixpanelAnalytics`, etc.). Each vendor exposes a typed `consent` object matching its dialect (GCMv2 for Google/Bing, `grant`/`revoke` for Meta, `opt_in`/`opt_out` for Mixpanel/PostHog). Set `defaultConsent` option before first tracking call. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-class-consent-controls)

NEW: `.reload()` method on all scripts for re-executing DOM-scanning scripts after SPA navigation. Returns a promise: `await script.reload()`. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#script-reload-api)

### First-Party Mode & Privacy

NEW: First-party proxy mode (`bundle: true` or auto-enabled per-script). Scripts bundled at build time and served from your domain; runtime requests proxied through your server with IP anonymization, user-agent normalization, and fingerprinting reduction. Auto-enabled for all scripts that support it. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#first-party-mode-privacy-focused-proxy)

NEW: Partytown web worker support. Set `partytown: true` per-script to offload execution to a worker, freeing the main thread. Requires `@nuxtjs/partytown` configured separately. Auto-forwarding supported for analytics scripts. GTM and DOM-accessing scripts not compatible. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#partytown-web-worker-support)

### Social Embeds

NEW: SSR social media embeds for X, Instagram, and Bluesky. Components `<ScriptXEmbed>`, `<ScriptInstagramEmbed>`, `<ScriptBlueskyEmbed>` fetch embed data server-side and proxy assets through your domain, eliminating third-party script injection and data leakage. Full styling control via scoped slots: `#default="{ userName, text, likesFormatted, photos }"`. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#ssr-social-embeds)

### Google Maps Components

NEW: Declarative SFC components for Google Maps (v1.0.0). Composable components replace options-based API: `<ScriptGoogleMapsMarker>`, `<ScriptGoogleMapsCircle>`, `<ScriptGoogleMapsPolyline>`, `<ScriptGoogleMapsPolygon>`, `<ScriptGoogleMapsRectangle>`, `<ScriptGoogleMapsHeatmapLayer>`, `<ScriptGoogleMapsKmlLayer>`, `<ScriptGoogleMapsMarkerClusterer>`, `<ScriptGoogleMapsOverlayView>`. All use Vue injection system for parent/child communication and auto-clean up on unmount. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#google-maps-overhaul)

NEW: `<ScriptGoogleMapsMarker>` accepts `:position` as a top-level prop and exposes `#content` slot for custom marker visuals (replaces legacy pin elements). [source](./.skilld/docs/content/docs/5.releases/1.v1.md#google-maps-overhaul)

NEW: `<ScriptGoogleMapsStaticMap>` standalone component for static placeholder images. Composes with `#placeholder` slot on `<ScriptGoogleMaps>`. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md#static-placeholder-props-removed-673)

### Other Features

NEW: Automatic SRI integrity hashes for bundled scripts. Set `scripts.assets.integrity: 'sha384'` in nuxt.config to enable. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#automatic-sri-integrity-hashes)

NEW: `@nuxt/scripts/stats` subpath export for auditing script privacy, performance, and security characteristics. `getScriptStats()` returns privacy ratings, performance ratings, CWV estimates, cookie analysis, and tracked data types. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#script-stats-export)

NEW: Vimeo Player aspect ratio control via `ratio` prop, matching YouTube Player API (v1.0.0). [source](./.skilld/docs/content/docs/5.releases/1.v1.md#vimeo-player-enhancements)

NEW: Multiple YouTube Player instances properly isolated on same page. Removed workarounds needed in v0. [source](./.skilld/docs/content/docs/5.releases/1.v1.md#youtube-player-overhaul)

**Also changed:** Type templates reorganized; run `nuxi prepare` after upgrade · `skipValidation` option to skip schema validation for script inputs · `warmupStrategy` option for preload/preconnect/dns-prefetch control · New registry scripts: PostHog Analytics, Google reCAPTCHA v3, Bing UET, Mixpanel, Vercel Analytics, Rybbit Analytics, Databuddy Analytics, Google Sign-In, Gravatar

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## @nuxt/scripts v1.1.0 Best Practices

## Best Practices

- Wrap `useScript()` calls in custom composables to ensure script singletons load once globally, simplifying reuse across components [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/0.key-concepts.md:L25:L33)

- Prefer awaiting script load with `onLoaded()` over proxied functions when you need the script's return value or direct API access—proxied functions queue calls and won't block, which can cause SSR mismatches [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/0.key-concepts.md:L48:L78)

- Use the default `onNuxtReady` trigger for minimal Core Web Vitals impact—it defers script loading until hydration completes and the main thread is idle [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.script-triggers.md:L43:L65)

- Use `useScriptTriggerIdleTimeout()` to delay non-critical scripts by a specified time after Nuxt ready, avoiding competition with critical path resources [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.script-triggers.md:L68:L95)

- Pair `useScriptTriggerInteraction()` with user-interaction events (scroll, click) to load analytics and tracking only when users engage, saving bandwidth for bounce traffic [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.script-triggers.md:L97:L123)

- Initialize registry scripts once in `nuxt.config` or `app.vue` to create a singleton instance, then use the composable without options in other components to share that instance [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.registry-scripts.md:L178:L212)

- Use unique `key` parameter only when you genuinely need multiple instances of the same registry script with different configs—deduplication is the default to avoid duplicate script loads [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.registry-scripts.md:L115:L150)

- Set `defaultConsent` to 'denied' for all tracking scripts, then update consent state via the script's typed `consent` API after user accepts—this ensures compliance before any data leaves the client [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/3.consent.md:L90:L108)

- Wire consent updates explicitly to each script's consent API when managing multiple vendors from one cookie banner—no magic remapping, fully typed, zero data loss [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/3.consent.md:L127:L150)

- Enable first-party mode (`bundle: true`) for tracking scripts to eliminate third-party cookies, ad blocker interference, and extra DNS lookups—privacy and performance improve automatically [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/2.first-party.md:L37:L57)

- Choose privacy tiers per-script based on functionality needs: use Full anonymisation for ad pixels, Heatmap-safe for analytics retaining user agent/screen, IP-only for self-hosted analytics [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/2.first-party.md:L58:L94)

- Check third-party script docs for SPA support (e.g. `_iub.cs.api.activateSnippets()` for iubenda) before using `reload()`—vendor-native methods are usually more efficient than reloading the entire script [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/3.api/1.use-script.md:L115:L128)

- Use `warmupStrategy` to preconnect or preload scripts before they load—this gives the network time to warm up during hydration, improving effective load speed without blocking the main thread [source](./.skilld/references/@nuxt/scripts@1.1.0/docs/content/docs/1.guides/1.warmup.md:L27:L56)
<!-- /skilld:best-practices -->
