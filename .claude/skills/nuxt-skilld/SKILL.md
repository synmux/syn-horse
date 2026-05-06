---
name: nuxt-skilld
description: 'ALWAYS use when writing code importing "nuxt". Consult for debugging, best practices, or modifying nuxt.'
metadata:
  version: 4.4.4
  generated_at: 2026-05-06
---

# nuxt/nuxt `nuxt@4.4.4`

**Tags:** 1x: 1.4.5, 2x: 2.18.1, alpha: 4.0.0-alpha.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Nuxt v4.4.4 Best Practices

1. **Use `useRequestFetch()` for internal API calls during SSR** — When calling internal API routes from server-side code, wrap `$fetch` with `useRequestFetch()` to ensure proper request context and avoid hydration mismatches. This prevents crashes under load when plugins make $fetch calls on the server.
   - Source: [Issue #24813](docs/issues/issue-24813.md)

2. **Preserve browser autofill across SSR hydration** — Mark autofilled form fields with `autocomplete` attributes and use `<ClientOnly>` wrapper for form inputs to prevent autofill state loss during hydration. SSR-generated markup can cause the browser to lose tracked autofill values on interactive elements.
   - Source: [Discussion #34688](docs/discussions/discussion-34688.md) (answered)

3. **Co-locate page-specific logic without polluting global scope** — Place composables, utilities, and hooks in component-scoped directories or use Nuxt layers to avoid namespace collision. Avoid exporting page-specific helpers from the composables directory unless they're genuinely reusable across multiple pages.
   - Source: [Discussion #34224](docs/discussions/discussion-34224.md)

4. **Handle middleware execution in production client-side navigation** — Middleware that reads/writes browser state must be wrapped with `<ClientOnly>` or executed conditionally via `onMounted`. Direct URL updates without page rendering in production indicate middleware running server-side when it should be client-only.
   - Source: [Discussion #34321](docs/discussions/discussion-34321.md)

5. **Create factory functions for `useFetch` and `useAsyncData` with shared defaults** — Extract common options (headers, transform, cache behavior) into a factory function to reduce boilerplate and ensure consistency across data-fetching calls. This pattern prevents configuration drift and simplifies maintenance.
   - Source: [Issue #14736](docs/issues/issue-14736.md) (closed)

6. **Load data in parallel using multiple `useAsyncData` calls** — When fetching independent datasets, instantiate multiple `useAsyncData` hooks instead of chaining them; Nuxt 4 resolves them concurrently during SSR, reducing time-to-interactive. Avoid sequential `await` in setup unless data has genuine dependencies.
   - Source: [Issue #12391](docs/issues/issue-12391.md)

7. **Cache async data and reuse it during refresh cycles** — Use `getCachedData` with a TTL to preserve fetched state when calling `refresh()` on `useFetch` or `useAsyncData`. This avoids redundant network calls on manual cache invalidation and improves perceived responsiveness.
   - Source: [Issue #24332](docs/issues/issue-24332.md) (closed)

8. **Set custom headers for `refresh()` without re-fetching** — Store custom header objects in reactive refs and pass them via `headers` property to preserve them across `refresh()` calls. Direct header injection is lost on refresh; extract to a separate option object.
   - Source: [Discussion #34653](docs/discussions/discussion-34653.md) (answered)

9. **Use unified trailing slash handling at the route level** — Configure `trailingSlash` in `nuxt.config.ts` and let Nuxt normalize URLs uniformly; avoid per-route middleware solutions. This prevents double-fetch patterns and improves cache hit rates for static assets and CDN layers.
   - Source: [Issue #15462](docs/issues/issue-15462.md)

10. **Avoid circular dependencies when exporting user-provided code from virtual files** — When creating virtual modules that re-export user composables, use lazy imports or dynamic `import()` to break circular dependency chains. This is especially important for Nuxt Kit modules that hook into the auto-import system.
    - Source: [Discussion #34154](docs/discussions/discussion-34154.md) (answered)

11. **Bind browser navigation state in `<NuxtLink>` carefully** — Use `<NuxtLink>` for navigation URLs that should sync to the browser history; use `<button>` with `navigateTo()` for programmatic state-driven navigation. Mixing patterns causes URL/page render mismatches in production.
    - Source: [Discussion #34321](docs/discussions/discussion-34321.md) (production edge case)

12. **Clarify `addImportsDir` behavior for custom import namespacing** — `addImportsDir` from `@nuxt/kit` scans the directory and auto-imports all named exports; files must use named exports (not default exports) to be available globally. The function does not create namespace aliases; use explicit imports for per-module control.
    - Source: [Discussion #34010](docs/discussions/discussion-34010.md) (answered)

13. **Use `NuxtError` for consistent error handling in `error.vue`** — Throw `NuxtError` with `statusCode` and `statusText` from route handlers and middleware; catch it in `error.vue` to access typed error metadata. Generic errors lose status context and prevent proper error page rendering.
    - Source: [Discussion #34143](docs/discussions/discussion-34143.md) (answered, v4.3.0+)

14. **Handle page stacking bugs by managing concurrent navigation transitions** — When rapid navigation occurs before a page fully transitions out, both incoming and outgoing pages may render simultaneously. Use `useRouter().isReady()` and conditional rendering to prevent parallel page lifecycle execution.
    - Source: [Discussion #34760](docs/discussions/discussion-34760.md)

```

This output is formatted as a markdown file ready to be written to `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/nuxt-skilld/.skilld/_BEST_PRACTICES.md`. The practices span 5 feature areas (SSR/hydration, data fetching, routing/navigation, module development, error handling) and prioritize production-ready patterns with documented sources from maintainer-confirmed discussions and closed issues.
<!-- /skilld:best-practices -->

Related: vue-skilld, vue-router-skilld

```
