---
name: ntfy-skilld
description: 'ALWAYS use when writing code importing "ntfy". Consult for debugging, best practices, or modifying ntfy, node-packages, node packages.'
metadata:
  version: 1.15.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# ffflorian/node-packages `ntfy@1.15.2`

**Tags:** latest: 1.15.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ntfy` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ntfy` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- BREAKING: ESM-only module in v1.6.0 — CommonJS `require()` no longer supported, must use ESM `import` syntax [source](./.skilld/releases/CHANGELOG.md:L461:467)

- NEW: Access token authorization in v1.7.0 — `authorization` parameter now accepts string (access token) in addition to `{username, password}` object [source](./.skilld/releases/CHANGELOG.md:L420:428)

- NEW: NtfyClient constructor with default config in v1.5.0 — `new NtfyClient(config)` allows setting server URL and other defaults once, reused across multiple publish calls [source](./.skilld/releases/CHANGELOG.md:L524:531)

- NEW: markdown boolean parameter in BaseConfig — set `markdown: true` to enable Markdown formatting in message body (supports bold, italics, links, code blocks, headings, lists, blockquotes) [source](./.skilld/pkg/dist/interfaces.d.ts:L178)

- NEW: FileURL object support for attachments — pass `{ url: string, filename: string }` to customise attachment filename when using external URLs [source](./.skilld/pkg/dist/interfaces.d.ts:L229:232)

- NEW: HTTPMethod type with string union for action buttons — `publish()` actions support HTTP POST/PUT/GET/DELETE/PATCH with `method` parameter (default POST) [source](./.skilld/pkg/dist/interfaces.d.ts:L246:250)

**Also changed:** MessagePriority enum (MIN=1 through MAX=5) · BroadcastAction with Android intent extras · ViewAction for opening URLs/apps · TagsArray support (string or array of strings) · ResponseData generic with id and time fields · Delay parameter with Unix timestamp or duration format

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Instantiate `NtfyClient` once per server or custom endpoint to avoid redundant configuration — reuse across multiple publish calls rather than calling the standalone `publish()` function repeatedly [source](./.skilld/pkg/README.md:L83:91)

- Use `MessagePriority` enum values (MIN, LOW, DEFAULT, HIGH, MAX) rather than numeric constants to ensure correct notification urgency across platforms [source](./pkg-ntfy/dist/interfaces.d.ts:L1:11)

- Provide `clickURL` when publishing notifications about events that require user action — enables deep linking to relevant context (GitHub PRs, dashboards, etc.) and improves notification actionability [source](./pkg-ntfy/dist/interfaces.d.ts:L66:80)

- Pass `authorization` as a token string when available instead of basic credentials — v1.7.0 added access token support for better credential management in production environments [source](./.skilld/releases/CHANGELOG.md:L425)

- Enable `markdown: true` to format messages with bold, links, code blocks, and headings — improves readability of complex alerts or structured data without breaking into multiple notifications [source](./pkg-ntfy/dist/interfaces.d.ts:L168:177)

- Use `delay` with natural language time strings (e.g., `"10am"`, `"3pm tomorrow"`) or durations (e.g., `"30m"`, `"2 days"`) instead of Unix timestamps for scheduled messages — more readable and maintainable for reminder-style notifications [source](./pkg-ntfy/dist/interfaces.d.ts:L83:99)

- Add `tags` using emoji short codes to visually categorize notifications — emoji tags appear prepended to the title for instant visual categorization, while non-emoji tags display below the notification [source](./pkg-ntfy/dist/interfaces.d.ts:L190:200)

- Configure `actions` with typed variants (broadcast, http, view) to enable direct interaction from notifications — use http actions to trigger webhooks, view actions to open URLs, and broadcast actions to integrate with Android automation apps [source](./pkg-ntfy/dist/interfaces.d.ts:L13:52)

- Set `disableCache: true` only for sensitive messages where privacy outweighs delivery reliability — default caching (12 hours) ensures delivery across temporary network disruptions but may retain sensitive data on the server [source](./pkg-ntfy/dist/interfaces.d.ts:L101:117)

- Use `fileURL` for externally hosted attachments to avoid size and expiration limits — prefer this over `fileAttachment` when files are already on a CDN or cloud storage [source](./pkg-ntfy/dist/interfaces.d.ts:L150:157)

- Disable `disableFirebase: false` (default) on public ntfy.sh deployments to ensure fast Android delivery via Firebase Cloud Messaging — only disable when your server is configured without FCM support [source](./pkg-ntfy/dist/interfaces.d.ts:L126:133)

- Customise `server` in the client constructor rather than per-message to centralise configuration — useful for private ntfy instances or custom deployments [source](./.skilld/pkg/README.md:L85:89)

- Use `emailAddress` to duplicate critical notifications via email when available, but account for strict rate limiting (16 per IP then 1/hour) for production alerts [source](./pkg-ntfy/dist/interfaces.d.ts:L135:144)

- Apply `markdown: true` in conjunction with headers (introduced in v1.15.2) to structure complex messages — markdown headers enable scannable alert content [source](./.skilld/releases/CHANGELOG.md:L1:7)
<!-- /skilld:best-practices -->
