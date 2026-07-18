---
name: nuxt-scripts-skilld
description: "ALWAYS use when writing code importing \"@nuxt/scripts\". Consult for debugging, best practices, or modifying @nuxt/scripts, nuxt/scripts, nuxt scripts, scripts."
metadata:
  version: 1.3.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# nuxt/scripts `@nuxt/scripts@1.3.1`
**Tags:** beta: 1.0.0-beta.32, rc: 1.0.0-rc.11, latest: 1.3.1

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/scripts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/scripts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @nuxt/scripts v1.x — prioritize recent major/minor releases and breaking changes.

### Breaking Changes (v0→v1 Migration)

- BREAKING: Registry entries no longer auto-load without `trigger` — must set `trigger: 'onNuxtReady'` or `trigger: false` explicitly [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L16:46)

- BREAKING: PayPal SDK v6 migration — `ScriptPayPalButtons` no longer renders directly; use `#default` scoped slot with `sdkInstance`, `PayPalNamespace` → `PayPalV6Namespace`, `createInstance()` required, no `ScriptPayPalMarks` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L76:115)

- BREAKING: YouTube Player aspect ratio — use `ratio` prop instead of deriving from `width`/`height`, default changed to `16/9` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L119:132)

- BREAKING: YouTube Player placeholder `object-fit` default changed from `contain` to `cover` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L135:140)

- BREAKING: Google Maps `ScriptGoogleMaps` removed `markers`/`centerMarker` props — use child `<ScriptGoogleMapsMarker>` components instead [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L191:200)

- BREAKING: Google Maps `ScriptGoogleMapsPinElement` removed — use `#content` slot on `<ScriptGoogleMapsMarker>` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L176:189)

- BREAKING: GTM `onBeforeGtmStart` callback timing changed to fire for cached scripts — guard with `if (initialized) return` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L148:161)

### New APIs (v1.0.0+)

- NEW: Script `.reload()` method for re-executing DOM-scanning scripts after SPA navigation [source](./.skilld/releases/v1.0.0.md:L118:125)

- NEW: `@nuxt/scripts/stats` subpath export with `getScriptStats()` for auditing script privacy, performance, security, cookie analysis [source](./.skilld/releases/v1.0.0.md:L142:151)

- NEW: SSR social embeds — `ScriptXEmbed`, `ScriptInstagramEmbed`, `ScriptBlueskyEmbed` for server-side embed data fetching with scoped slots [source](./.skilld/releases/v1.0.0.md:L58:80)

- NEW: Consent API — `defaultConsent` option on consent-aware scripts, `.consent.update()`, `.consent.grant()`, `.consent.revoke()` methods [source](./.skilld/releases/v1.0.0.md:L86:101)

- NEW: Partytown web worker support — set `partytown: true` per-script to offload third-party scripts from main thread, auto-forwarding configured for analytics scripts [source](./.skilld/releases/v1.0.0.md:L38:56)

- NEW: Google Maps component overhaul — `ScriptGoogleMapsMarker` (advanced marker), `ScriptGoogleMapsOverlayView` for custom content, `ScriptGoogleMapsStaticMap` standalone component, `ScriptGoogleMapsGeoJson` for GeoJSON rendering [source](./.skilld/releases/v1.0.0.md:L167:200)

- NEW: Environment variable configuration — `NUXT_PUBLIC_SCRIPTS_*` env vars auto-populate `runtimeConfig.public.scripts` without boilerplate (e.g. `NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID=G-XXXXXX`) [source](./.skilld/releases/v1.0.0.md:L205:211)

- NEW: Automatic SRI integrity hashes — `scripts.assets.integrity: 'sha384'` in nuxt.config generates Subresource Integrity hashes for bundled scripts [source](./.skilld/releases/v1.0.0.md:L128:139)

- NEW: First-party mode proxy — `firstParty: true` bundles scripts at build time and proxies runtime requests through your server with privacy anonymization (IP masking, browser version obfuscation) [source](./.skilld/releases/v1.0.0.md:L16:26)

- NEW: Multiple new registry scripts in v1.0.0 — PostHog Analytics, Google reCAPTCHA v3, TikTok Pixel, Google Sign-In, Rybbit Analytics, Databuddy, Bing UET, Mixpanel, Vercel Analytics, Gravatar [source](./.skilld/releases/v1.0.0.md:L103:114)

### Deprecated APIs

- DEPRECATED: `ScriptGoogleMapsAdvancedMarkerElement` — use `ScriptGoogleMapsMarker` instead, thin shim still works with dev warning [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L167:174)

- DEPRECATED: Google Maps `center` and `zoom` props on `ScriptGoogleMaps` — use `:map-options="{ center, zoom }"` [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L25)

- DEPRECATED: Google Maps `googleMaps` ref key on `ScriptGoogleMaps` expose — use `mapsApi` instead [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L26)

- DEPRECATED: Google Maps heatmap component in v1.2.0 — no replacement documented [source](./.skilld/releases/v1.2.0.md:L17)

### Minor Changes (v1.1.0+)

- NEW: `Consent.default()` helper for GTM/GA — strict GCMv2 validation with premade consent objects [source](./.skilld/releases/v1.1.0.md:L18)

- NEW: Runtime script disable + `scripts:globals` hook in v1.2.0 — runtime control over global script state [source](./.skilld/releases/v1.2.0.md:L12)

- NEW: Environment variable overrides for `scripts.globals` in v1.1.0 — single-build, multi-deploy configuration [source](./.skilld/releases/v1.1.0.md:L17)

- NEW: Build-time debug flag with script-lifecycle tracing in v1.1.0 [source](./.skilld/releases/v1.1.0.md:L15)

**Also changed:** LinkedIn Insight Tag · Ahrefs Web Analytics · Usercentrics CMP · Calendly · SpeedCurve LUX · Google Sign-In helpers (initialize/renderButton/prompt) · Stripe SDK version selection · Instagram embed UA + caching improvements · Vimeo player ratio prop · YouTube player keyboard accessibility
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices — @nuxt/scripts

## Best Practices

- Wrap `useScript()` calls in custom composables for script singleton management — allows easier instantiation across components and centralises script configuration [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md#script-singleton)

- Use `onLoaded()` callback instead of proxied functions when you need direct API access — avoids blocking rendering and provides return values from the third-party API [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md#understanding-proxied-functions)

- Prefer registry scripts over raw `useScript()` — automatically provides validation, type safety, privacy tier optimisation, and vendor-specific best-practice configuration [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#features)

- Start consent-gated scripts with `defaultConsent` values of `'denied'` for all storage categories — ensures explicit user opt-in for privacy compliance and prevents tracking before consent [source](./.skilld/docs/content/docs/1.guides/3.consent.md#per-script-consent-api)

- Use explicit user interaction triggers (click, keydown) over hover for facade components — hover triggers cause UX issues with lost subsequent events like clicks [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md#choose-the-triggering-event-wisely)

- Apply warmup strategies proactively for manual-trigger scripts — call `script.warmup('preload')` or `'preconnect'` when you predict script will soon be needed [source](./.skilld/docs/content/docs/1.guides/1.warmup.md#warmup)

- Use `useScriptEventPage()` for accurate page-view tracking in SPAs — resolves async title availability issue where page title is not ready on route change [source](./.skilld/docs/content/docs/1.guides/3.page-events.md#usage)

- Check vendor's SPA support before using `reload()` — many third-party scripts provide their own SPA methods (e.g. `_iub.cs.api.activateSnippets()` for iubenda) which are more efficient [source](./.skilld/docs/content/docs/3.api/1.use-script.md#reload)

- Disable scripts in development with the `mock` option — allows development and testing without loading actual third-party scripts [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#disabling-in-development)

- Load multiple instances of the same registry script by passing a unique `key` option — overrides automatic deduplication when you need multiple configurations [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md#loading-multiple-of-the-same-script)

- Enable first-party mode through registry configuration — automatically bundles scripts, proxies requests through your domain, and anonymises user data without additional setup [source](./.skilld/docs/content/docs/1.guides/2.first-party.md#usage)

- Gate scripts behind consent using `useScriptTriggerConsent()` — provides a binary load gate that prevents script loading until user grants consent [source](./.skilld/docs/content/docs/1.guides/3.consent.md#binary-load-gate)

- Provide error fallbacks for facade components — informs users when scripts fail to load and optionally provides alternative access methods [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md#provide-an-error-fallback)

- Use `ScriptLoadingIndicator` component for accessible loading states — provides semantic a11y feedback and visual indication while third-party scripts load [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md#provide-a-loading-state-with-accessible-feedback)
<!-- /skilld:best-practices -->
