---
name: dotenvx-dotenvx-skilld
description: 'ALWAYS use when writing code importing "@dotenvx/dotenvx". Consult for debugging, best practices, or modifying @dotenvx/dotenvx, dotenvx/dotenvx, dotenvx dotenvx, dotenvx.'
metadata:
  version: 1.66.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# dotenvx/dotenvx `@dotenvx/dotenvx@1.66.0`

**Tags:** latest: 1.66.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @dotenvx/dotenvx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @dotenvx/dotenvx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes — @dotenvx/dotenvx v1.66.0

This section documents version-specific API changes in the v1.x series. Focus on recent minor/major releases — these contain new APIs and breaking changes that LLMs trained on older data may not know.

## API Changes

- NEW: `doctor(directory: string): DoctorFinding[]` — scan code for dotenv loaders that can conflict with dotenvx [source](./.skilld/pkg/src/lib/main.d.ts:L379)

- NEW: `config({ envs: [...] })` parameter — explicitly specify env sources instead of relying on path/convention, unlocks Cloudflare Workers integration with encrypted env values. Accepts array of `{ type: 'envFile', value: string }` or `{ type: 'env', value: string, privateKeyName?: string }` [source](./.skilld/pkg/src/lib/main.d.ts:L52-L60)

- DEPRECATED: `opsOff` option — deprecated since v1.51.0, use `noOps` instead in `config()`, `set()`, and `get()`. The option still works for backwards compatibility but is marked for future removal [source](./.skilld/pkg/src/lib/main.d.ts:L175-L178)

- BREAKING: `.env.vault` file support removed in v1.56.0 — `.env.vault` files are no longer parsed or loaded by `config()`. Migration: migrate secrets to `.env.keys` encrypted format or pass them directly via the new `envs` parameter [source](./.skilld/pkg/CHANGELOG.md:L227-L229)

- NEW: `noOps` option added in v1.51.0 — turn off Dotenvx Ops features via `config({ noOps: true })`, `set(key, value, { noOps: true })`, or `get(key, { noOps: true })`. Replaces the deprecated `opsOff` parameter [source](./.skilld/pkg/CHANGELOG.md:L301)

- BREAKING: `ProKeypair` logic removed in v1.55.0 — internal helper for armored keys no longer available. Use the public `armor` command line interface instead [source](./.skilld/pkg/CHANGELOG.md:L245)

- ENHANCED: `set(key, value, options)` and `encrypt` now auto-create `.env` files in v1.59.0 if the file does not exist — add `--no-create` flag or `{ noCreate: true }` option to prevent this behaviour [source](./.skilld/pkg/CHANGELOG.md:L165-L166)

- BREAKING: `ops observe` command removed in v1.54.0 — radar observability feature no longer available. If needed, download dotenvx-ops separately [source](./.skilld/pkg/CHANGELOG.md:L257)

- BREAKING: `radar` command fully removed in v1.53.0 — replaced entirely by the new `ops` command suite. Radar was a separate early-access product; upgrade to use `dotenvx ops` for operational primitives [source](./.skilld/pkg/CHANGELOG.md:L263)

- NEW: `parse({ privateKey })` option — decrypt encrypted values in .env file contents by providing a private key during parsing [source](./.skilld/pkg/src/lib/main.d.ts:L28-L32)

- ENHANCED: CLI flags `--env` now accept encrypted values in v1.63.0 — `dotenvx run --env "KEY=encrypted:..."` decrypts automatically [source](./.skilld/pkg/CHANGELOG.md:L53)

- ENHANCED: `config({ envKeysFile })` option — customize the path to `.env.keys` file for monorepos, useful when keys are in a parent directory [source](./.skilld/pkg/src/lib/main.d.ts:L118-L122)

- NEW: `ls(directory, envFile, excludeEnvFile)` — list all env files in a directory matching glob patterns [source](./.skilld/pkg/src/lib/main.d.ts:L360-L364)

- NEW: `genexample(directory, envFile)` — generate an example `.env` file from existing `.env` entries [source](./.skilld/pkg/src/lib/main.d.ts:L398-L401)

**Also changed:** `parse({ processEnv })` — specify custom environment object instead of `process.env` · `config({ strict: true })` — throw immediately on missing `.env` file · `config({ overload: true })` and alias `override` — override already-set environment variables · `config({ logLevel })` — control log verbosity (error/warn/success/info/verbose/debug) · `set()` returns typed `SetOutput` with metadata about what changed · `get()` respects `noOps` flag for operations in v1.56.0+

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Load encrypted env files in Cloudflare Workers using the `envs` config option with imported string content — this allows bundling encrypted secrets into the worker artifact without exposing private keys [source](./.skilld/docs/docs/sdk/config.html.md)

```js
import envSrc from "../.env.txt"
import dotenvx from "@dotenvx/dotenvx"

const config = dotenvx.config({ envs: [{ type: "env", value: envSrc, privateKeyName: "DOTENV_PRIVATE_KEY" }] })
const envx = config.parsed
```

- Use `convention: 'nextjs'` or `convention: 'flow'` to automatically load multiple environment-specific .env files in the correct order without manually specifying each path — depends on `NODE_ENV` or other environment variables to determine which files to load [source](./.skilld/docs/docs/sdk/config-convention.html.md)

- Set `strict: true` in production environments to exit with code 1 if the .env file is missing or decryption fails — prevents silent failures and ensures secrets are properly configured before the application starts [source](./.skilld/docs/docs/sdk/config-strict.html.md)

- Use `ignore: ['MISSING_ENV_FILE']` in development to suppress errors for optional .env files while still loading required ones — allows different team members to have different optional local configurations [source](./.skilld/docs/docs/sdk/config-ignore.html.md)

- Pass multiple file paths with `path: ['.env.local', '.env']` and set `overload: true` to allow local environment-specific values to override defaults — the first file in the array takes precedence, useful for development workflows where `.env.local` contains personal overrides [source](./.skilld/docs/docs/sdk/config-overload.html.md)

- Use `envKeysFile` to customize the path to `.env.keys` in monorepos — prevents searching parent directories for the private key file and makes the intent explicit in configuration [source](./.skilld/docs/docs/sdk/config-env-keys-file.html.md)

- Decrypt encrypted values on-demand using `parse(src, { privateKey })` without loading from files — useful for handling encrypted env content passed as strings or received from APIs at runtime [source](./.skilld/docs/docs/sdk/parse-private-key.html.md)

- Use `parse(src, { processEnv: {} })` with an empty object to isolate parsing from the global `process.env` — prevents accidental environment variable pollution and is useful for testing or processing multiple env sources independently [source](./.skilld/docs/docs/sdk/parse-process-env.html.md)

- Set `encrypt: false` with `dotenvx.set(key, value, { encrypt: false })` to store plaintext values when encryption is not needed — by default, `set()` encrypts all values, so opt-out explicitly for non-sensitive configuration [source](./.skilld/docs/docs/sdk/config-set-key-value-plain.html.md)

- Use `dotenvx.get(key)` to implement decryption-at-access pattern — fetch and decrypt individual secrets only when needed, reducing memory footprint for applications with many secrets [source](./.skilld/docs/docs/sdk/get.html.md)

- Set `quiet: true` when running in CI/CD or serverless environments to suppress injection logs and keep output clean — necessary for clean stdout when logs are aggregated or parsed downstream [source](./.skilld/docs/docs/sdk/config-quiet.html.md)

- Import `'@dotenvx/dotenvx/config'` at the top of your Cloudflare Worker entrypoint to auto-load `.env` files at startup — this ESM-friendly approach ensures environment variables are loaded before the fetch handler executes [source](./.skilld/docs/docs/platforms/cloudflare.html.md)

- Always pass `envKeysFile` explicitly in monorepos rather than relying on directory traversal — makes the configuration dependency explicit and avoids unexpected behaviour when .env.keys exists at multiple levels [source](./.skilld/docs/docs/sdk/config-env-keys-file.html.md)

- Set `noOps: true` when `dotenvx-ops` is not installed or unavailable to skip remote key operations — prevents fallback attempts to cloud services and reduces latency when operating offline or in restricted environments [source](./.skilld/docs/docs/sdk/config-ops-off.html.md)
<!-- /skilld:best-practices -->

Related: dotenvx
