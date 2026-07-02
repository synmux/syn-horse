# `PUBSUB.md`

Options for pushing update events from `syn.horse` to a digital signage device over WebSockets, given the current stack (Nuxt 4.4 / nitropack 2.13 / `cloudflare_module` preset on Cloudflare Workers). This is a decision document for human review — no code has been written. Researched 2026-07-02 against current Cloudflare and Nitro documentation.

## TL;DR

WebSockets on Cloudflare Workers are really WebSockets on **Durable Objects** — a plain stateless Worker can accept a socket but cannot broadcast to it later, so every serious option below is "a Durable Object, wrapped differently". Four options, roughly in ascending order of integration with this repo:

| #   | Option                             | One-liner                                                      | Verdict                                |
| --- | ---------------------------------- | -------------------------------------------------------------- | -------------------------------------- |
| 0   | Polling (no WebSockets)            | Device polls a state endpoint with `ETag`                      | Legitimate baseline; keep as fallback  |
| 1   | Dedicated realtime Worker + DO     | Tiny separate Worker, hand-written hibernating Durable Object  | **Recommended**                        |
| 2   | Nitro's built-in WebSocket support | `experimental.websocket` + swap preset to `cloudflare_durable` | The integrated alternative; viable     |
| 3   | Agents SDK (`agents` package)      | Batteries-included DO framework with state sync                | Overkill today; revisit if state grows |

Recommendation: **option 1**, paired with the "notify-then-fetch" pattern and option 0 as the device's fallback path. Reasoning at the end.

## Background: how WebSockets actually work on Workers

The example you linked ([Workers WebSocket example](https://developers.cloudflare.com/workers/examples/websockets/)) shows a stateless Worker terminating a WebSocket via `WebSocketPair`. That works, but it has a structural problem for pub/sub: each connection lives inside one isolated Worker invocation. Two signage devices connected "to the site" are actually connected to two isolates that cannot see each other, and — critically — an update event arriving later (a deploy hook, an admin request) lands in a _third_ isolate with no handle on either socket. There is no way to broadcast. The crossws docs describe this mode bluntly: each connection is "a separate Worker invocation that can't send to another connection's socket".

The platform's answer is [Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/websockets/): a single-instance, addressable object that all connections and all publish events converge on. One DO instance holds every signage socket; anything that can reach the DO (an HTTP route, a queue consumer, an alarm) can broadcast to all of them. The [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api) makes this cheap: the DO is evicted from memory while idle, the sockets stay open at the edge, duration billing stops, and the DO is revived when a message or publish arrives. The runtime answers WebSocket protocol pings automatically without waking the DO, so keepalives cost nothing.

Two platform behaviours worth internalising before choosing:

- **Deploys disconnect every WebSocket.** Updating a Worker's code restarts its Durable Objects, which drops all connections. Devices must reconnect regardless of which option we pick — this is documented behaviour, not a bug.
- **Naming collision:** Cloudflare used to have a product literally called **Pub/Sub** (an MQTT broker, closed beta from 2022). It no longer appears anywhere in Cloudflare's documentation index and should be considered dead. Nothing in this document relates to it; Durable Objects are Cloudflare's current answer to this problem space.

## Option 0 — no WebSockets: polling (the honest baseline)

The device periodically GETs a small state endpoint (e.g. `/api/signage/state`) backed by KV or D1, sending `If-None-Match` and acting only on a changed `ETag`. The `/api/**` route rules already exist; this needs one Nitro route and nothing else — no preset change, no new Worker, no new bindings.

- **Pros:** trivially robust (survives every network blip, proxy, captive portal and deploy), zero new infrastructure, testable with `curl`, no connection state to reason about. At signage scale (a handful of devices, poll every 15–60 s) the cost is a rounding error.
- **Cons:** latency is the poll interval; "update events" become "eventual convergence". A tighter interval trades cost for latency but never reaches instant.
- **Server-sent events** are the half-way house — Nitro supports SSE streams — but on a stateless Worker the stream handler has no one to receive a publish from either, so it degenerates into server-side polling of KV inside the stream. Not worth it here.

Even if we build WebSockets, the device firmware should treat polling as its degraded mode: WebSocket down → poll until it comes back. That makes the WS channel a latency optimisation rather than a single point of failure, which is the right posture for signage.

## Option 1 — dedicated realtime Worker with a hand-written Durable Object (recommended)

A small, separate Worker (own repo, mirroring the `syn-horse-notifications` pattern) exposed on e.g. `wss://ws.syn.horse`. It contains one Durable Object class using the first-party Hibernation API: `ctx.acceptWebSocket()` on upgrade, `ctx.getWebSockets()` to broadcast, `setWebSocketAutoResponse()` for app-level ping/pong at zero duration cost, and optionally a row or two of DO-local SQLite to remember the last event for replay on reconnect. This is the pattern Cloudflare's own docs and examples are built around; the whole Worker is likely under 150 lines.

Publishing (getting events _in_) has three sub-options:

1. **Authenticated HTTP endpoint on the realtime Worker** (recommended): the Nuxt server — or anything else, including `curl` from a laptop or a CI deploy hook — POSTs the event with a shared-secret bearer token. Mirrors how Turnstile secrets are already handled; no binding changes to this repo's protected wrangler block.
2. **Cross-Worker Durable Object binding** (`script_name`) from the Nuxt Worker: lower latency, no shared secret, but requires editing the `nitro.cloudflare.wrangler` block and does not emulate cleanly in single-Worker local dev. Not worth it at this scale.
3. **Hang it off the existing `NOTIFICATIONS` queue**: already-built plumbing, but queues add batching latency and the consumer lives in the other repo; conflates paging with signage. Mentioned for completeness only.

- **Pros:** zero risk to this repo's carefully balanced Nuxt/wrangler setup (no preset change, no experimental flags, no edits to the generated deploy config); site deploys — which happen constantly — never drop signage connections, only realtime-Worker deploys do (rare); full control over device auth, replay, and message shape; first-party hibernation with none of the adapter caveats from option 2; independently testable with `wrangler dev` and `wscat`.
- **Cons:** a second repo/Worker to maintain and deploy, plus a small cross-repo contract (the event schema) — though the notifications Worker shows that pattern is already accepted here. New DNS record for `ws.syn.horse` (trivial; the zone is on Cloudflare).
- **Variant:** [PartyServer](https://github.com/cloudflare/partyserver) (Cloudflare's PartyKit-derived library) wraps the same DO mechanics in a friendlier API with hibernation on by default. Optional sugar; the raw API is small enough that it isn't needed.

## Option 2 — Nitro's built-in WebSocket support (the integrated route)

This is the direct answer to "how do we plumb WebSockets into Nuxt". Nitro 2.13 ships experimental WebSocket support via [crossws](https://crossws.h3.dev/adapters/cloudflare): set `nitro.experimental.websocket = true`, drop a `defineWebSocketHandler` route under `server/routes/`, and Nuxt serves WebSockets on the same origin (`wss://syn.horse/...`). The handler API includes pub/sub primitives (`peer.subscribe(topic)`, `peer.publish(topic, data)`), and local dev works out of the box because the dev server uses the Node adapter.

On Cloudflare, this requires switching `nitro.preset` from `cloudflare_module` to **`cloudflare_durable`** (verified against the nitropack 2.13 source). The durable preset extends `cloudflare_module`: ordinary HTTP requests are still served statelessly exactly as today, but the build additionally exports a `$DurableObject` class, and any request with an `Upgrade: websocket` header is forwarded into a single DO instance (hard-coded binding name `$DurableObject`, instance name `server`) running the crossws `cloudflare-durable` adapter — hibernation-capable, with all connections converging on that one instance, which is exactly the broadcast domain we want. Nitro also exposes an experimental `publish` method on the generated DO (added in 2.11.10), which is how a normal HTTP route (e.g. an admin `POST /api/signage/publish`) would push an event to connected devices.

Changes this repo would need (all small, but several touch protected/fragile areas):

- `nitro.preset` → `cloudflare_durable`; `nitro.experimental.websocket = true`.
- The **`nitro.cloudflare.wrangler` block must gain** a `durable_objects` binding (`name` and `class_name` both `$DurableObject`) and a migration entry (`new_sqlite_classes: ["$DurableObject"]`) — verified that Nitro does _not_ add these to the generated deploy config automatically. That block is currently marked do-not-modify, so this is an explicit, user-authorised change.
- `wrangler.dev.jsonc` gains the matching DO binding so `bun run preview` and migrations tooling stay coherent; `bun run build` regenerates `worker-configuration.d.ts`.
- Verification pass that `@nuxthub/core`, `nuxt-security` and the D1-backed `@nuxt/content` are indifferent to the preset swap (they should be, since durable extends module — but "should" needs checking).

Trade-offs:

- **Pros:** one repo, one deploy, same origin (no new DNS, no CORS/auth hop for publishing — the publish call is an in-Worker binding call); the nicest authoring DX of all options.
- **Cons:** an experimental flag and a less-travelled preset underneath the _entire_ production site, not just the signage feature; every site deploy restarts the DO and drops all device connections (site deploys are frequent here); the crossws durable adapter documents a real caveat — _"a message relayed into a hibernated Durable Object may miss some sockets"_, because its peer/topic bookkeeping is partly in-memory — and sharding beyond one instance would need a custom backplane. The notify-then-fetch pattern (below) neutralises the missed-message risk, but it's still adapter behaviour we'd be living with rather than controlling.

## Option 3 — Cloudflare Agents SDK

The [`agents` package](https://developers.cloudflare.com/agents/) is Cloudflare's framework on top of Durable Objects: WebSocket lifecycle handling, a `this.broadcast()` primitive, SQLite-backed state that **auto-syncs to connected clients** (`setState` → every device receives the new state), scheduling (`schedule`/`scheduleEvery`) and retries for free. It would run as its own Worker like option 1 — it does not embed inside the Nuxt build.

The state-sync model is a genuinely good conceptual fit for signage — "the device mirrors an object's state" is exactly what signage is — and the scheduling primitives would suit dayparting/playlists later. But the client SDK is React-first (plain-WebSocket protocol access exists but is a second-class path for a non-browser device), and the framework brings far more machinery than "broadcast a poke to three screens" justifies. File under: the upgrade path if signage state ever becomes rich enough that hand-rolled state diffing in option 1 starts hurting.

## Cross-cutting design notes (apply to whichever option wins)

- **Notify-then-fetch.** Treat the WebSocket as a doorbell, not a data channel: events carry only "state changed (version N)"; the device then GETs the same state endpoint used for polling. One code path renders state regardless of transport, missed WebSocket messages cost nothing (the next fetch or reconnect self-heals), and option 0/1/2 all share the endpoint. This single decision removes most of the reliability anxiety from every option above.
- **Device behaviour.** Reconnect with exponential backoff + jitter (deploys _will_ drop the socket); re-fetch state on every (re)connect; rely on protocol pings (server-side auto-response is free and does not wake the DO). Message size is a non-issue (the platform limit is now 32 MiB; ours are bytes).
- **Auth.** A per-device token presented at upgrade time (query parameter or header, validated before accepting the socket); sockets are read-only — devices never publish. The publish endpoint is protected by a secret (option 1) or is internal to the Worker (option 2).
- **Cost.** Effectively nil at this scale on the existing Workers Paid plan: a hibernated DO accrues no duration charges, incoming WebSocket messages bill at a 20:1 ratio (and the devices barely send any), outgoing messages and pings are free, and Durable Objects have been available even on the free plan since April 2025. The dominant "cost" is operational complexity, which is why the options are ordered by it.
- **What triggers publishes** (needs your input): deploy hooks? blog post publication? manual pokes? a cron heartbeat? The answer doesn't change the transport choice but does shape the event schema and whether the publisher lives in CI, the Nuxt server, or your shell history.

## Why option 1 over option 2

Both end in the same place — one hibernating Durable Object holding every signage socket. The difference is blast radius. Option 2 threads an experimental Nitro feature, a preset swap and new bindings through the production site's build, and couples signage connection stability to the site's deploy cadence. Option 1 spends its complexity budget on a second tiny Worker instead — a pattern this project already runs happily with the notifications consumer — and leaves `syn.horse` untouched except for one small authenticated publish call (plus the shared state endpoint, which option 0 wants anyway). For a device whose defining requirement is "keep working unattended", the boring separated architecture wins. If keeping everything in one repo matters more to you than the above, option 2 is genuinely workable — just plan a verification pass on the preset swap and accept the experimental label.

## Suggested next steps

1. Decide the option (and the publish trigger list above).
2. Either way: build `/api/signage/state` + `ETag` first (serves option 0 immediately and every other option's fetch path later).
3. If option 1: scaffold the realtime Worker repo (DO + hibernation + auth + publish endpoint), add the `ws.syn.horse` custom domain, then teach the device notify-then-fetch.

## Sources

- [Durable Objects: use WebSockets (hibernation API)](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) — hibernation, auto ping/pong, deploy-disconnect behaviour, wrangler bindings/migrations
- [Durable Objects pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/) — hibernation billing, 20:1 message ratio, included quotas
- [Durable Objects on the free plan (changelog, 2025-04-07)](https://developers.cloudflare.com/changelog/post/2025-04-07-durable-objects-free-tier/)
- [WebSocket message limit raised to 32 MiB (changelog, 2025-10-31)](https://developers.cloudflare.com/changelog/post/2025-10-31-increased-websocket-message-size-limit/)
- [crossws Cloudflare adapters](https://crossws.h3.dev/adapters/cloudflare) — plain vs durable adapter, hibernation caveat, single-instance broadcast
- [Nitro WebSocket guide](https://nitro.build/guide/websocket) + nitropack 2.13 `cloudflare-durable` preset source — `$DurableObject` export, hard-coded binding/instance names, experimental `publish`
- [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/) — state sync, broadcast, scheduling
- [Workers WebSocket example](https://developers.cloudflare.com/workers/examples/websockets/) — the stateless-Worker mode and its limits
