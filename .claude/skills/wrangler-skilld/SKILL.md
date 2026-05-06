---
name: wrangler-skilld
description: 'ALWAYS use when writing code importing "wrangler". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk.'
metadata:
  version: 4.88.0
  generated_at: 2026-05-06
---

# cloudflare/workers-sdk `wrangler@4.88.0`

**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.88.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## Wrangler v4 API Changes

Documentation of significant API additions, deprecations, removals, and signature changes in wrangler v4.76.0 through v4.80.0. Changes are scored by impact: silent breaking changes (10), removed APIs (8), new APIs (5), deprecated features (3), renames (2), and other modifications (1).

## Score 5 — New APIs (14 changes)

### AI Search Binding Types

**Source:** `releases/wrangler@4.78.0.md` § MINOR Changes (lines 2–3)

Added `ai_search_namespaces` and `ai_search` binding configuration types:

- `ai_search_namespaces`: array of namespace bindings with auto-provisioning (binding + namespace name)
- `ai_search`: array of instance bindings (binding + instance_name reference)

Enable AI Search API integration via configuration. Distinct from the command-line AI Search management interface.

### AI Search Type Generation

**Source:** `releases/wrangler@4.80.0.md` § MINOR Changes (lines 11–33)

`wrangler types` now generates TypeScript types for AI Search bindings:

- `AiSearchNamespace` type for `ai_search_namespaces` bindings
- `AiSearchInstance` type for `ai_search` bindings

Example usage:

```typescript
interface Env {
  AI_SEARCH: AiSearchNamespace
  BLOG_SEARCH: AiSearchInstance
}
```

### AI Search Command Namespace

**Source:** `releases/wrangler@4.79.0.md` § MINOR Changes (lines 11–19)

Added `wrangler ai-search` command namespace for Cloudflare AI Search API management (open beta):

- `ai-search list`: list instances
- `ai-search create`: create instance (interactive wizard)
- `ai-search get`: retrieve instance details
- `ai-search update`: modify instance
- `ai-search delete`: remove instance
- `ai-search search`: semantic search with repeatable `--filter key=value` flags
- `ai-search stats`: fetch instance statistics

Requires `wrangler login` authentication.

### VPC Networks Binding

**Source:** `releases/wrangler@4.80.0.md` § MINOR Changes (lines 48–59)

Added `vpc_networks` binding for routing Worker traffic through Cloudflare Tunnel or mesh network:

```jsonc
{
  "vpc_networks": [
    { "binding": "MY_FIRST_VPC", "tunnel_id": "<tunnel-id>" },
    { "binding": "MY_SECOND_VPC", "network_id": "cf1:network" }
  ]
}
```

Enables network-isolated Worker execution.

### VPC TCP Services (Hyperdrive Origins)

**Source:** `releases/wrangler@4.78.0.md` § MINOR Changes (lines 4–6)

Added Workers VPC service support via `--service-id` option for Hyperdrive origins, enabling Hyperdrive to connect to databases through private VPC networks.

### Stream Binding Support

**Source:** `releases/wrangler@4.76.0.md` § MINOR Changes (lines 17–19)

Wrangler and workers-utils now recognize `stream` binding in configuration, deployment metadata, and generated worker types. Enables Stream binding declaration in `wrangler.json`.

### Stream Binding Local Mode

**Source:** `releases/wrangler@4.78.0.md` § MINOR Changes (lines 5–7)

Added local emulation support for Stream bindings, enabling:

- Video upload and download operations
- Video transcoding and format conversion
- Caption management and generation
- Watermark application

Available during `wrangler dev` with full API compatibility.

### Experimental Headful Browser Rendering

**Source:** `releases/wrangler@4.80.0.md` § MINOR Changes (lines 35–46)

Added experimental `X_BROWSER_HEADFUL` environment variable for headful (visible) browser rendering during local development:

```sh
X_BROWSER_HEADFUL=true wrangler dev
X_BROWSER_HEADFUL=true vite dev
```

Allows debugging browser operations visually. Note: `@cloudflare/playwright` may spawn two Chrome windows (expected behavior).

### Workflows --local Flag

**Source:** `releases/wrangler@4.79.0.md` § MINOR Changes (lines 21–30)

All Workflows CLI commands now support `--local` flag to target local `wrangler dev` session instead of production API:

```sh
wrangler workflows list --local
wrangler workflows trigger my-workflow '{"key":"value"}' --local
wrangler workflows instances describe my-workflow latest --local
wrangler workflows instances pause my-workflow <id> --local --port 9000
```

Uses `/cdn-cgi/explorer/api/workflows` endpoint. Optional `--port` flag (default 8787) for custom dev server port.

### Secrets Configuration Property

**Source:** `releases/wrangler@4.77.0.md` § MINOR Changes (lines 11–23 and patch changes § 26–39)

Added experimental `secrets` configuration property with required secrets validation for both `wrangler deploy` and `wrangler versions upload`:

```jsonc
{
  "secrets": {
    "required": ["API_KEY", "DB_PASSWORD"]
  }
}
```

Validates that all secrets declared in `secrets.required` are configured on the Worker before deployment. Fails with clear error listing missing secrets if validation fails.

### VPC Cert-Verification Mode

**Source:** `releases/wrangler@4.78.0.md` § MINOR Changes (lines 8–9)

Added `--cert-verification-mode` option to VPC service `create` and `update` commands with three modes:

- `verify_full`: full certificate verification (default)
- `verify_ca`: CA certificate verification only
- `disabled`: no verification

Enables flexible TLS configuration for private network connections.

### Local Explorer Enabled by Default

**Source:** `releases/wrangler@4.76.0.md` § MINOR Changes (lines 21–25)

Ungated local explorer UI enabled by default, accessible at `/cdn-cgi/explorer` during local development for inspecting:

- D1 database state
- Durable Objects state
- KV namespace contents

Can be disabled with `X_LOCAL_EXPLORER=false` environment variable. Feature remains experimental.

### Access Service Token Authentication

**Source:** `releases/wrangler@4.78.0.md` § MINOR Changes (lines 2–3)

Added Cloudflare Access Service Token authentication via environment variables:

- `CLOUDFLARE_ACCESS_CLIENT_ID`
- `CLOUDFLARE_ACCESS_CLIENT_SECRET`

Enables service-to-service authentication without user session requirements.

### Containers List Paginated API

**Source:** `releases/wrangler@4.76.0.md` § MINOR Changes (lines 11–15)

Rewrote `wrangler containers list` command to use paginated Dash API endpoint (`/dash/applications`):

- Fetches from Dash API instead of legacy `/applications` endpoint
- Displays results in paginated table with columns: ID, Name, State, Live Instances, Last Modified
- `--per-page` flag (default 25) for interactive pagination (Enter to load, q/Esc to quit)
- `--json` flag for machine-readable output
- Non-interactive environments load all results in single request

## Score 3 — Deprecated Features (0 changes)

No explicitly deprecated features identified in v4.76.0–v4.80.0 range.

## Score 8 — Removed APIs (1 change)

### Python cf-requirements Support Removal

**Source:** `releases/wrangler@4.77.0.md` § Patch Changes (line 55)

Removed `cf-requirements` support for Python workers. Feature has not worked with the runtime for an extended period. Python Workers should use alternative dependency management approaches.

## Score 2 — Renames and Structural Changes (2 changes)

### Qwik Adapter Command Selection

**Source:** `releases/wrangler@4.77.0.md` § Patch Changes (lines 47–53)

Fixed `qwik add` invocations in autoconfig to use `cloudflare-workers` instead of `cloudflare-pages` when targeting Cloudflare Workers. This corrects adapter directory structure generation and eliminates Pages-specific file cleanup requirements.

Added `--skipConfirmation=true` to all `qwik add` invocations for automated contexts.

### Containers List Endpoint Migration

**Source:** `releases/wrangler@4.76.0.md` § MINOR Changes (lines 11–15)

Migrated `wrangler containers list` from legacy `/applications` endpoint to `/dash/applications` paginated Dash API. Command signature and CLI behavior changed but output format remains compatible.

## Score 1 — Other Modifications (10 changes)

- **Remote preview API reliability (4.77.0):** Added automatic retry for transient 5xx errors (up to 3 attempts, linear backoff) and enforced 30-second per-request timeout to prevent indefinite dev session hangs.

- **Framework version validation (4.79.0):** Added minimum and maximum version validation during auto-configuration. Exits with error if framework version is below minimum; emits warning if version exceeds maximum known major version.

- **Asset configuration robustness (4.79.0):** Fixed `getPlatformProxy` and `unstable_getMiniflareWorkerOptions` crash when `assets` config block lacks `directory` property (external tools like `@cloudflare/vite-plugin` handle asset serving independently).

- **Multi-framework detection (4.79.0):** Fixed autoconfig failure on Waku projects that also detect Hono by filtering out Hono when Waku is detected.

- **Lock file warning suppression (4.79.0):** Suppressed misleading lock file warnings for static projects during autoconfig, since static projects don't require lock files.

- **Versions deploy optimization (4.79.0):** Skipped unnecessary `GET /versions?deployable=true` API call when all version IDs are explicitly provided and `--yes` flag is passed.

- **Asset directory validation (4.79.0):** Improved error message when `assets` directory path points to file instead of directory, replacing unhelpful `ENOTDIR` error with clear user-facing error.

- **Angular SPA auto-configuration (4.78.0):** Added auto-configuration support for Angular SPA projects without SSR requirements.

- **Build error visibility (4.80.0):** Fixed multi-worker mode (`-c` config flags) to display build errors from auxiliary/secondary workers at error level instead of debug level, preventing silent hangs on worker build failures.

- **WebAssembly source phase imports (4.80.0):** Fixed source phase import preservation in both `--no-bundle` and bundled deployments for Workers importing WebAssembly.

- **D1 migration file ordering (4.80.0):** Fixed inconsistent D1 migration file ordering across operating systems by sorting migration filenames alphabetically before returning, ensuring consistent chronological ordering.

- **Astro framework compatibility (4.76.0):** Added backward-compatible autoconfig support for Astro 4.x and 5.x projects via manual adapter installation and configuration when native `astro add cloudflare` is incompatible.

- **Vite 6.0.x support (4.80.0):** Polished `@cloudflare/vite-plugin` installation during autoconfig. Lowered minimum Vite version check from 6.1.0 to 6.0.0 and automatically upgraded Vite when project version is in range [6.0.0, 6.1.0).

- **Compatibility date resolution (4.80.0):** Changed default compatibility date generation to use today's date instead of loading locally installed `workerd` via `miniflare`, improving reliability across package manager environments (notably `pnpm`).

- **Container image digest matching (4.76.0):** Fixed container image digest matching when tags include registry ports (e.g., `localhost:5000/app:tag`) by properly stripping tags without breaking port information.

## Also changed:

Miniflare dependency updated to 4.20260401.0 (4.80.0); workerd updated to 1.20260401.1 (4.80.0); @cloudflare/unenv-preset updated to 2.16.0 (4.76.0); container registry port handling refined (4.76.0); secondary worker type resolution with environment overrides supported (4.78.0); dry-run asset validation added (4.78.0); interactive data catalog validation added to R2 commands with --force bypass (4.78.0); fetch() 401 response body issue patched (4.78.0); unexpected configuration field warnings now include upgrade hints when newer Wrangler version available (4.77.0); legacy nitro-cloudflare-dev module removed in favor of built-in nitropack 2.13+ cloudflare-dev preset (current architecture).

---

**Total API Changes Documented:** 27 (14 new, 1 removed, 2 renames, 10 other modifications)

**Version Range:** wrangler v4.76.0 (2026-03-20) through v4.80.0 (2026-04-02)

**Note:** Requested wrangler v4.88.0 does not exist in available releases. Latest available release is v4.80.0. This document covers the 5 most recent releases tracked in the wrangler skillD repository.

<!-- /skilld:api-changes -->
