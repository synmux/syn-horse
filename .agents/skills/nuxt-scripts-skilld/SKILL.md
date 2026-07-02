---
name: nuxt-scripts-skilld
description: "ALWAYS use when writing code importing \"@nuxt/scripts\". Consult for debugging, best practices, or modifying @nuxt/scripts, nuxt/scripts, nuxt scripts, scripts."
metadata:
  version: 1.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# nuxt/scripts `@nuxt/scripts@1.3.0`
**Tags:** beta: 1.0.0-beta.32, rc: 1.0.0-rc.11, latest: 1.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/scripts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/scripts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes (v1.0.0)

- BREAKING: Registry entries no longer auto-load without an explicit `trigger` property. Build warning fires if config lacks `trigger`. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L33:45)

- BREAKING: PayPal SDK migrated from v5 to v6, changing from callback-based to session-based API. `ScriptPayPalButtons` now exposes SDK instance via scoped slot, `ScriptPayPalMarks` removed. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L76:110)

- BREAKING: `ScriptGoogleMapsPinElement` removed entirely. Use `#content` slot on `ScriptGoogleMapsMarker` instead. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L176:189)

- BREAKING: Google Maps `markers` and `centerMarker` props removed from `ScriptGoogleMaps`. Use child `<ScriptGoogleMapsMarker>` components declaratively. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L191:205)

- BREAKING: Google Maps `placeholderOptions`, `placeholderAttrs`, and `aboveTheFold` props removed. Compose `<ScriptGoogleMapsStaticMap>` in the `#placeholder` slot instead. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L207:230)

- BREAKING: YouTube Player `object-fit` default changed from `contain` to `cover`. Set `placeholder-object-fit="contain"` to restore v0 behaviour. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L134:141)

- BREAKING: Google Tag Manager `onBeforeGtmStart` callback now fires for cached scripts. Guard with `if (initialized) return` to prevent multiple calls. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L146:161)

### Deprecations (v1.0.0)

- DEPRECATED: Registry shorthand `true` value (e.g., `googleAnalytics: true`). Use `{ trigger: 'onNuxtReady' }` instead; old form still works but emits warning. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L58:72)

- DEPRECATED: `ScriptGoogleMapsAdvancedMarkerElement` component name. Use `ScriptGoogleMapsMarker` instead; shim keeps old name working with dev warning. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L167:174)

- DEPRECATED: Top-level `:center` and `:zoom` props on `ScriptGoogleMaps`. Pass via `:map-options="{ center, zoom }"` instead; old form works but emits warning. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L232:239)

- DEPRECATED: Template ref key `googleMaps` on `ScriptGoogleMaps`. Use `mapsApi` instead; old key works as deprecated alias with one-shot warning. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L241:251)

- DEPRECATED: Template ref key `overlay` on `ScriptGoogleMapsOverlayView`. Use `overlayView` instead; `overlay` kept as deprecated alias. [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L253:261)

### New Features (v1.0.0)

- NEW: `useScript().reload()` method — re-execute DOM-scanning scripts after SPA navigation. [source](./.skilld/releases/v1.0.0.md:L118:125)

- NEW: SSR social embeds for X (Twitter), Instagram, and Bluesky — fetch embed data server-side, proxy assets through your domain for performance and privacy. [source](./.skilld/releases/v1.0.0.md:L58:80)

- NEW: Partytown web worker support — load third-party scripts off main thread with `partytown: true` per-script, auto-forwarding supported for 15+ analytics vendors. [source](./.skilld/releases/v1.0.0.md:L34:56)

- NEW: First-party proxy mode with privacy anonymization — reverse proxy requests through your server, anonymise IPs/user agents, block fingerprinting APIs at build time. [source](./.skilld/releases/v1.0.0.md:L16:26)

- NEW: `@nuxt/scripts/stats` subpath export — audit script privacy ratings, performance impact, cookie analysis, and tracked data types. [source](./.skilld/releases/v1.0.0.md:L142:151)

- NEW: Vendor-native consent controls — consent-aware registry scripts expose typed `consent` object with `update()`, `grant()`, `revoke()`, and `hold()` methods. [source](./.skilld/releases/v1.0.0.md:L82:101)

- NEW: YouTube Player aspect ratio control via `ratio` prop (replaces width/height driven aspect ratio). [source](./.skilld/docs/content/docs/4.migration-guide/1.v0-to-v1.md:L119:132)

- NEW: Google Maps declarative component architecture — 11 composable SFC components for markers, shapes, overlays, clustering replacing options-bag API. [source](./.skilld/releases/v1.0.0.md:L166:169)

- NEW: `ScriptGoogleMapsStaticMap` standalone component — static placeholder now a first-class component with server-side image routing. [source](./.skilld/releases/v1.0.0.md:L191:193)

- NEW: `ScriptGoogleMapsGeoJson` component — declarative GeoJSON wrapper around `google.maps.Data` with full event bindings. [source](./.skilld/releases/v1.0.0.md:L193)

- NEW: Google Maps `ScriptGoogleMapsMarker` `#content` slot — replace default pin with arbitrary HTML/Vue templates. [source](./.skilld/releases/v1.0.0.md:L169:177)

- NEW: Google Maps `ScriptGoogleMapsOverlayView` — render arbitrary Vue content at map position with full styling control and `v-model:open` toggling. [source](./.skilld/releases/v1.0.0.md:L179:187)

- NEW: Environment-variable config overrides — auto-populate `runtimeConfig.public.scripts` from `NUXT_PUBLIC_SCRIPTS_*` env vars (e.g., `NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID=G-XXXXXX`). [source](./.skilld/releases/v1.0.0.md:L203:211)

- NEW: Automatic SRI integrity hash generation — `scripts.assets.integrity: 'sha384'` generates Subresource Integrity hashes for bundled scripts. [source](./.skilld/releases/v1.0.0.md:L127:139)

- NEW: PostHog Analytics registry script — product analytics with feature flags. [source](./.skilld/releases/v1.0.0.md:L105)

- NEW: Google reCAPTCHA v3 registry script — invisible bot protection. [source](./.skilld/releases/v1.0.0.md:L106)

- NEW: TikTok Pixel registry script — conversion tracking. [source](./.skilld/releases/v1.0.0.md:L107)

- NEW: Google Sign-In registry script — one-tap authentication. [source](./.skilld/releases/v1.0.0.md:L108)

- NEW: Rybbit Analytics registry script — privacy-focused open source analytics. [source](./.skilld/releases/v1.0.0.md:L109)

- NEW: Databuddy Analytics registry script — lightweight analytics. [source](./.skilld/releases/v1.0.0.md:L110)

- NEW: Bing UET registry script — Microsoft Advertising conversion tracking. [source](./.skilld/releases/v1.0.0.md:L111)

- NEW: Mixpanel Analytics registry script — product analytics and user tracking. [source](./.skilld/releases/v1.0.0.md:L112)

- NEW: Vercel Analytics registry script — Vercel Web Analytics integration. [source](./.skilld/releases/v1.0.0.md:L113)

- NEW: Gravatar registry script — avatar service with privacy-preserving proxy. [source](./.skilld/releases/v1.0.0.md:L114)

### New Features (v1.1.0)

- NEW: LinkedIn Insight Tag registry script — conversion tracking and retargeting for LinkedIn Ads. [source](./.skilld/releases/v1.1.0.md:L11)

- NEW: Ahrefs Web Analytics registry script — privacy-first, cookie-less analytics. [source](./.skilld/releases/v1.1.0.md:L12)

- NEW: Usercentrics CMP registry script — consent management platform for GDPR/CCPA compliance. [source](./.skilld/releases/v1.1.0.md:L13)

- NEW: Calendly registry script — scheduling tool embed widget. [source](./.skilld/releases/v1.1.0.md:L14)

- NEW: Build-time debug flag with script-lifecycle tracing — `scripts.debug: true` in config logs script loading pipeline. [source](./.skilld/releases/v1.1.0.md:L15)

- NEW: Env-var overrides for `scripts.globals` — single build, multi-deploy pattern support via environment variables. [source](./.skilld/releases/v1.1.0.md:L17)

- NEW: Consent.default() API + strict GCMv2 validation — Google Consent Mode v2 defaults enforced with runtime validation for GTM and GA. [source](./.skilld/releases/v1.1.0.md:L18)

- NEW: TikTok Pixel production hardening — region selection, CAPI deduplication, advanced matching. [source](./.skilld/releases/v1.1.0.md:L19)

### New Features (v1.2.0)

- NEW: SpeedCurve LUX registry script — Real User Monitoring tool for Core Web Vitals and custom timing measurements. [source](./.skilld/releases/v1.2.0.md:L11)

- NEW: Runtime disable + `scripts:globals` hook — disable individual global scripts at runtime, hook for intercepting globals registration. [source](./.skilld/releases/v1.2.0.md:L12)

- NEW: Stripe.js SDK version selection — allow selecting Stripe.js SDK version per-script configuration. [source](./.skilld/releases/v1.2.0.md:L22)

### Deprecations (v1.2.0)

- DEPRECATED: `ScriptGoogleMapsHeatmapLayer` component (heatmap visualization). [source](./.skilld/releases/v1.2.0.md:L17)

**Also changed:** Google Maps & Gravatar a11y fixes · Instagram embed user-agent & caching · RFC 7230 hop-by-hop header stripping · Vimeo keyboard a11y · YouTube Player keyboard a11y · Support for unhead v3 · Proxy domain expansion
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Wrap `useScript()` calls in composables to create singleton instances — allows reuse across components without re-initializing, and centralizes configuration [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md:L25:33)

- Use `useScriptTriggerConsent()` as a binary load gate for cookie banners — scripts remain in `awaitingLoad` state until `accept()` is called, simplifying the classic consent flow [source](./.skilld/docs/content/docs/1.guides/3.consent.md:L20:50)

- Leverage per-script vendor-native consent APIs instead of remapping categories — each script's `consent` object (e.g. `consent.update()` for Google Analytics, `consent.grant()`/`consent.revoke()` for Meta) matches the vendor's actual API, avoiding lossy projections [source](./.skilld/docs/content/docs/1.guides/3.consent.md:L90:150)

- Use `trigger: 'onNuxtReady'` (the default) for idle-loaded scripts — ensures Core Web Vitals remain optimal by deferring third-party script loading until after Nuxt hydration completes and the main thread is idle [source](./.skilld/docs/content/docs/1.guides/1.script-triggers.md:L43:62)

- Enable first-party mode bundling via `bundle: true` for performance and privacy — bundled scripts load from your own domain (avoiding DNS lookups and CORS), and proxied requests strip identifying data (IP, user agent, screen dimensions) automatically [source](./.skilld/docs/content/docs/1.guides/2.first-party.md:L16:35)

- Initialize registry scripts in `nuxt.config.ts` or `app.vue` with their base config, then call them from components without options — the singleton pattern deduplicates instances and re-initializing in components is unnecessary [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md:L178:223)

- Use `scriptOptions: { trigger: manual }` with `element-based` triggers (click, visible) for facade components — delays heavyweight third-party loading until explicit user interaction, preventing performance regression [source](./.skilld/docs/content/docs/1.guides/5.facade-components.md:L36:69)

- Apply `warmupStrategy: 'preconnect'` or `'preload'` for scripts expected to load within seconds — preload is more aggressive (immediately reserved), preconnect is lighter (DNS + TCP handshake only) [source](./.skilld/docs/content/docs/1.guides/1.warmup.md:L27:56)

- Set `mock` mode in development config to load a stub script and skip validation — prevents production analytics from triggering during dev, while avoiding console warnings about missing IDs [source](./.skilld/docs/content/docs/1.guides/1.registry-scripts.md:L92:113)

- Use runtime config (`runtimeConfig.public.scripts.*`) with env var overrides for registry script IDs — keeps secrets out of `nuxt.config.ts` and enables per-deployment configuration without rebuilds [source](./.skilld/docs/content/docs/3.api/5.nuxt-config.md:L35:53)

- Store script initialization logic in a wrapper composable instead of calling `useScript()` directly — enables lifecycle control via `onLoaded()` for accessing the real script API after it loads, avoiding proxy queueing issues [source](./.skilld/docs/content/docs/1.guides/0.key-concepts.md:L48:71)

- Override privacy tiers per-script using the `privacy` object (e.g. `privacy: { ip: true, userAgent: true }`) — allows fine-grained control over which user data is anonymised before forwarding proxied requests [source](./.skilld/docs/content/docs/1.guides/2.first-party.md:L118:133)

- Prefer vendor-native SPA support (e.g. `_iub.cs.api.activateSnippets()` for iubenda) over calling `reload()` on route changes — vendors optimise for their own DOM scanning patterns and avoid unnecessary full script re-execution [source](./.skilld/docs/content/docs/3.api/1.use-script.md:L115:128)

- Use `proxy.alias` to replace third-party hostnames with opaque aliases in proxy paths (e.g. `us.i.posthog.com` → `ph`) — prevents ad-blockers and network observers from classifying requests by hostname, while the server resolves aliases back to real domains transparently [source](./.skilld/docs/content/docs/1.guides/2.first-party.md:L147:188)
<!-- /skilld:best-practices -->
