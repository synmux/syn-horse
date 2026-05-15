---
name: pushover-js-skilld
description: 'ALWAYS use when writing code importing "pushover-js". Consult for debugging, best practices, or modifying pushover-js, pushover js.'
metadata:
  version: 1.3.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# danitetus/pushover-js `pushover-js@1.3.2`

**Tags:** latest: 1.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p pushover-js` instead of grepping `.skilld/` directories. Run `skilld search --guide -p pushover-js` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases and the v0.x → v1.x migration.

- BREAKING: Complete Promise-based rewrite — v0.x was callback-based, v1.x uses promises and method chaining. All v0.x code is incompatible [source](./.skilld/releases/CHANGELOG.md:L9)

- BREAKING: `send()` returns `Promise<IResponse>` — v0.x used callbacks, v1.x returns a promise that resolves with response object containing `{ headers, data, statusCode }` [source](./.skilld/releases/CHANGELOG.md:L20)

- NEW: `setAttachment(name, filePath)` — added in v1.3.0, allows attaching files to notifications [source](./.skilld/releases/CHANGELOG.md:L8)

- NEW: `setHtml()` — added in v1.2.0, marks notification message as HTML compliant [source](./.skilld/releases/CHANGELOG.md:L12)

- NEW: `setTimestamp(timestamp)` — added in v1.1.1, allows setting custom Unix timestamp (not JavaScript milliseconds) for when notification was created [source](./.skilld/releases/CHANGELOG.md:L17)

- FIXED: `send()` promise resolution — v1.1.1 fixed critical bug where successful requests didn't resolve the promise and never returned the response object [source](./.skilld/releases/CHANGELOG.md:L20)

**Also changed:** Method chaining pattern — all setter methods (`setSound`, `setTitle`, `setPriority`, `setUrl`, `setDevice`, `setMessage`) return `Pushover` instance for chaining · Notification data structure — uses `INotificationData` interface with typed `Sound` union and `Priority` type

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use async/await for notification sends instead of promise chains — it's more readable and integrates better with error handling in server contexts [source](./.skilld/pkg/README.md:L119-147)

- Timestamps must be Unix timestamps in seconds, not JavaScript milliseconds — divide `Date.getTime()` by 1000 before passing to `setTimestamp()` [source](./.skilld/pkg/README.md:L61)

```ts
// Correct: Unix timestamp (seconds)
.setTimestamp(Math.floor(Date.now() / 1000))

// Incorrect: JavaScript milliseconds
.setTimestamp(Date.now())
```

- When setting priority 2 (emergency), always provide explicit `expire` and `retry` values — defaults (10800s and 3600s) may not match your use case [source](./.skilld/pkg/lib/pushover.js:L52-62)

- Create a fresh `Pushover` instance for each notification rather than reusing across different messages — the builder state accumulates, causing unintended data to leak between sends [source](./.skilld/pkg/lib/pushover.js:L12-23)

- Use `setDevice()` to target specific user devices when a user has multiple — omitting it broadcasts to all devices, which may not be desired [source](./.skilld/pkg/lib/pushover.d.ts:L28)

- Enable HTML mode only when necessary with `setHtml()` — the Pushover app renders HTML content differently and can break layout if unexpectedly enabled [source](./.skilld/pkg/README.md:L65)

- Always provide a `url_title` argument to `setUrl()` when including a URL — users see the title in the notification, making it clear what they're tapping into [source](./.skilld/pkg/lib/pushover.js:L64-69)

- Sounds are strictly typed and limited to the enum — attempting to use an undocumented sound string silently falls back to the default, without error feedback [source](./.skilld/pkg/lib/pushover.d.ts:L22)

- Set attachments before calling `send()` — file I/O happens during the request, so earlier attachment configuration gives more time for validation [source](./.skilld/pkg/lib/pushover.js:L45-50)

- Wrap sends in try/catch when using async/await — Pushover API failures (network, invalid token, rate limiting) are thrown, not returned as failed promises [source](./.skilld/pkg/README.md:L140-145)

- Avoid passing title or message to the constructor — instead pass them to `send()` or use `setTitle()` and `setMessage()` for clarity about what is baked into the instance [source](./.skilld/pkg/lib/pushover.js:L75-87)

- Priority defaults to 0 (normal) — set explicitly if your use case defaults to a different level, since undefined priority will silently become 0 [source](./.skilld/pkg/lib/pushover.js:L19)

- Validate priority values are in the -2 to 2 range before calling `setPriority()` — the library logs an error to console but continues, allowing invalid state to be sent [source](./.skilld/pkg/lib/pushover.js:L52-56)
<!-- /skilld:best-practices -->
