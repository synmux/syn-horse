# konami code — escalation ideas

current behaviour: `app/composables/useKonamiCode.ts` watches for ↑↑↓↓←→←→ba and fires a callback. only consumer today is `app/components/layout/KonamiToast.vue`, which pops a pink "◆ the horse is loose ◆" toast for 3.2s.

what follows is a menu of more expansive / more ridiculous payloads. each entry has a concept, a vibe note, and a detailed prompt you can hand to a model. prompts are written so an implementation pass lands inside this codebase's conventions (theme tokens, lowercase prose, vue 3 `<script setup lang="ts">`, no react, `prefers-reduced-motion` respect, exit conditions).

ideas are grouped by escalation tier. tier 1 = ambient tweak, tier 4 = full viewport hostage situation.

---

## tier 1 — ambient

### 1. accent flip

**concept.** every `--accent-color` consumer in the site swaps from hot pink to a rotating palette (hot → cool → lilac → pop → hot, 4s per beat) for 30 seconds. site keeps working, but the pulse of the brand is hijacked.

**vibe.** "the horse changed its mind."

**prompt.**

```plaintext
implement a konami payload that hijacks the global --accent-color css variable for 30 seconds.

context:
- konami trigger composable lives at app/composables/useKonamiCode.ts and exposes useKonamiCode(onTrigger).
- existing payload is app/components/layout/KonamiToast.vue. follow the same shape.
- theme tokens in app/assets/css/main.css define --color-hot, --color-cool, --color-lilac, --color-pop. site code references --accent-color with a fallback chain: var(--accent-color, var(--color-hot)).
- the project's conventions: vue 3 <script setup lang="ts">, no react, lowercase prose, no inline :style bindings except where absolutely necessary (sri is on; prefer class binding + css variable on :root). this is the rare exception — writing a css var on the root element is fine.

create app/components/layout/KonamiAccentFlip.vue:
- mount a watcher via useKonamiCode.
- on trigger, set document.documentElement.style.setProperty('--accent-color', '<colour>') on a 4-second cadence cycling through the four token colours, ending after 30 seconds with a removeProperty call.
- store the interval id in a let; clear it on unmount and on re-trigger (a second konami restarts the cycle).
- if window.matchMedia('(prefers-reduced-motion: reduce)').matches, skip the cycle entirely and just show a one-off toast "accent locked: cool" that picks one random token, sets it once, and clears it after 30s with no animation.
- register the component in app/layouts/default.vue alongside <LayoutKonamiToast />.
```

---

### 2. status bar goes sentient

**concept.** the existing status bar text (`shouting at git`) starts narrating live user behaviour: cursor velocity, scroll depth, last route, idle time. flips to passive-aggressive lines when nothing happens.

**vibe.** "the site noticed you."

**prompt.**

```plaintext
implement a konami payload that takes over the LayoutStatusBar status text with live narration of user activity for 90 seconds.

context:
- status bar component: app/components/layout/StatusBar.vue. it currently renders SITE.status from app/data/site.ts.
- konami composable: app/composables/useKonamiCode.ts.
- voice rules: lowercase only, british english, dry. example lines that fit the brand: "watching you scroll", "you have not moved the mouse for nine seconds", "that link does nothing, click it again", "the horse is judging you".

approach:
1. lift the status string into a piece of reactive state shared between LayoutStatusBar and a new component LayoutKonamiNarrator.vue. easiest path: a tiny composable app/composables/useStatusOverride.ts that exports a global ref<string | null> and a setter; statusbar reads it with a fallback to SITE.status.
2. create app/components/layout/KonamiNarrator.vue:
   - on konami trigger, start a 90-second window of narration.
   - track three signals via vueuse if convenient (useMouse, useWindowScroll, useIdle) — vueuse is already a transitive dep via @nuxt/scripts; if not, add it. otherwise raw window listeners with cleanup in onUnmounted.
   - every 1.5s, pick a line from a deterministic table keyed off (signal value, time-since-last-action). examples:
     - mouse moved a lot: "you have moved the mouse {n} pixels. impressive."
     - scrolled: "you scrolled like a coward."
     - idle 8s+: "still there?"
     - idle 20s+: "i can wait."
     - route changed: "fled to {path}. typical."
   - call setStatusOverride(line); after 90 seconds, call setStatusOverride(null) to release the override.
   - if reduced motion: shorten to 20s and use only the idle-detection branch.
3. register in app/layouts/default.vue.
4. ensure no SSR access to window — wrap listeners in onMounted, gate the initial render in <ClientOnly> if needed.
```

---

### 3. horse hoofbeats

**concept.** plays a 4-bar loop of synthesised hoofbeats (web audio api, no asset) for 12 seconds. status bar shows "♪ stampede mode".

**vibe.** "audio-only chaos."

**prompt.**

```plaintext
implement a konami payload that plays a synthesised hoofbeat loop using the web audio api for 12 seconds.

constraints:
- no audio assets — generate the sound entirely with web audio api oscillators and noise buffers. hoofbeats: short low-frequency thump (~80hz triangle decay 80ms) every ~250ms, panned alternately L/R for galloping effect, with a high-pass filtered noise burst layered for the click of the hoof.
- gate everything behind a user-gesture-completed flag — the konami code itself counts as user gesture, so audiocontext can resume on trigger.
- respect prefers-reduced-motion AND prefers-reduced-data: skip entirely if either is set.
- stop and dispose of all nodes after 12 seconds and on component unmount.

files:
- app/composables/useHoofbeats.ts — exports startHoofbeats(durationMs: number): Promise<void>. handles audiocontext lifecycle, scheduling, and cleanup.
- app/components/layout/KonamiHoofbeats.vue — calls useKonamiCode + useHoofbeats; also temporarily flips the status bar text to "♪ stampede mode" via useStatusOverride (see status-bar narrator idea, or inline a simpler ref if that hasn't been built).
- register in app/layouts/default.vue.

ux:
- if a second konami fires while the loop is active, immediately stop the loop. do not stack.
- log nothing to the console.
```

---

## tier 2 — persistent overlays

### 4. pony express transitions

**concept.** every internal `<NuxtLink>` navigation now plays a 600ms horse-gallops-left-to-right transition over the page. persists for the rest of the session (or until konami fires again to disable).

**vibe.** "every click ships a parcel by horse."

**prompt.**

```plaintext
implement a konami payload that toggles a persistent page-transition mode: every route change plays a 600ms horse-galloping-across-screen animation.

context:
- nuxt 4, app/layouts/default.vue is the shared shell. <main><slot /></main> renders the page. nuxt's built-in page transition system is via app.vue's <NuxtPage :transition="..."> or via definePageMeta — but since we already use a layout, we can wrap <slot /> with <Transition name="..."> conditionally.
- theme tokens: --color-hot for the horse glyph. --easing-snap for the gallop curve.
- konami composable: app/composables/useKonamiCode.ts.

approach:
1. add a global ref<boolean> for "pony mode" in a new composable app/composables/usePonyMode.ts. persist it in sessionStorage (not localStorage — easter eggs should not survive a tab close).
2. create app/components/layout/KonamiPonyMode.vue: useKonamiCode(() => togglePonyMode()). show a 2s toast when enabled ("pony express enabled — every click ships by horse") and when disabled ("standard ground shipping").
3. modify app/layouts/default.vue:
   - import usePonyMode and the route from useRoute.
   - watch route.fullPath. when it changes AND ponyMode is true, mount a one-shot overlay component <KonamiGallopOverlay /> that:
     - renders an svg horse glyph (use a simple ◆-styled silhouette in --color-hot) absolutely positioned, full-viewport-width, 80vh from top.
     - animates translateX from -20vw to 120vw over 600ms with cubic-bezier(0.2, 0.9, 0.2, 1) (--ease-snap).
     - emits a "done" event after 600ms; parent unmounts it.
   - alternatively, use <Transition> with css keyframes — keep keyframes in app/assets/css/main.css next to the existing konami-in keyframes; name them "pony-gallop" so they don't collide with anything.
4. respect prefers-reduced-motion: if reduced, disable pony mode entirely (toast says "pony mode unavailable in reduced motion").
5. ensure the overlay is aria-hidden="true" and has pointer-events: none so it never blocks clicks.
```

---

### 5. sentient command palette

**concept.** the existing `LayoutCommandPalette` gets new joke commands injected: `feed horse`, `kick the can`, `summon a meeting`, `cd /dev/null`, `rm -rf feelings`. each one prints an output line in console-style and sometimes triggers another konami payload (recursive easter eggs).

**vibe.** "the cli grew teeth."

**prompt.**

```plaintext
implement a konami payload that injects joke commands into the existing LayoutCommandPalette and persists them for the session.

context:
- command palette: app/components/layout/CommandPalette.vue. read it first to understand its current command schema (likely a typed array of {label, action, hint}).
- konami composable: app/composables/useKonamiCode.ts.
- styling: use the existing .console class from main.css for any output rendering, with .pr / .mu / .ok / .danger inner spans.
- voice: lowercase, dry, british english.

approach:
1. extend the command palette to accept extra commands via a composable app/composables/useExtraCommands.ts that exports a reactive list with add/clear methods. hook the palette's command source into [...baseCommands, ...extraCommands.value].
2. create app/components/layout/KonamiCommands.vue:
   - on konami, push a curated list of jokes:
     - "feed horse" → renders a console output "horse fed. mood: smug." in a transient toast or inline within the palette
     - "rm -rf feelings" → triggers a 2s screen-shake (reuse glitch-jitter at higher amplitude in a one-off keyframe pony-shake) and prints "operation not permitted: too late."
     - "summon meeting" → opens mailto:syn@syn.as?subject=meeting&body=... with the body "no."
     - "cd /dev/null" → navigates to /404 deliberately, then back, with the status bar narrating the descent.
   - show a one-time toast on enable: "12 hidden commands unlocked. type / to see them."
3. persist the unlock state in sessionStorage so commands survive route changes but not tab closes.
4. a second konami removes the joke commands and shows "commands locked" toast.
```

---

### 6. boss-bar status

**concept.** a slim daisyUI-styled progress bar pinned to the top of the viewport labelled `MARE STRESS INDEX`. fills slowly as you idle, drains as you scroll/click. permanent until next refresh.

**vibe.** "you are now responsible for a horse's emotional regulation."

**prompt.**

```plaintext
implement a konami payload that adds a permanent (until refresh) "mare stress index" hud bar at the top of the viewport.

context:
- daisyUI 5 is configured with a single bespoke 'synhorse' theme (see app/assets/css/main.css). use the daisyUI <progress> component shape but theme it explicitly with utility classes — semantic role mapping is in main.css.
- konami composable: app/composables/useKonamiCode.ts.
- theme tokens: --color-pop (lemon, warnings) for high-stress, --color-ok for low-stress, --color-paper-3 for label text, font-mono for the label.

approach:
1. create app/components/layout/KonamiStressBar.vue:
   - mounts above LayoutStatusBar in app/layouts/default.vue, behind a v-if tied to a ref<boolean> that flips on konami trigger.
   - renders a 4px-tall fixed bar at top: 0 with a label "MARE STRESS INDEX" in font-mono uppercase text-[10px] tracking-wide on the left and a percentage on the right.
   - internal stress: ref<number> from 0 to 100, starting at 30.
   - tick every 250ms via setInterval (cleared in onUnmounted):
     - +0.4% each tick by default (idle drift up).
     - listen for window 'mousemove', 'scroll', 'click' events; each event subtracts 0.5% (clamp 0..100).
     - listen for route change; each route change is +5%.
   - colour interpolation: 0–40% --color-ok, 40–75% --color-pop, 75–100% --color-danger. drive via a computed class binding (avoid inline styles).
   - at 100%, freeze the bar, flash text "MARE COLLAPSED — F5 TO REVIVE" in --color-danger, and disable further updates. the user can refresh to reset.
2. respect prefers-reduced-motion by replacing the colour transitions with instant swaps.
3. there is no off-switch — once enabled, it is enabled until refresh. that is the joke.
```

---

## tier 3 — viewport takeover

### 7. crt boot sequence

**concept.** the entire viewport blacks out and types out a fake POST/BIOS/Linux boot sequence (white-on-black mono, scanlines turned to 11) ending with `[ ok ] horse mounted at /dev/horse`. takes ~6 seconds, then fades back into the site.

**vibe.** "your tab just rebooted into the syn.horse OS."

**prompt.**

```plaintext
implement a konami payload that takes over the viewport with a fake boot sequence for ~6 seconds, then fades out.

context:
- konami composable: app/composables/useKonamiCode.ts.
- existing FX layer: app/components/layout/FxLayer.vue uses .fx-scan, .fx-grain, .fx-vignette classes from main.css. you may temporarily intensify these by toggling a class on the .site root (e.g. .site.boot-mode amplifies the scan/grain animations).
- voice: lowercase except for tags like [ ok ], [warn], [FAIL] which match real-life dmesg output for visual contrast.
- type ramp: use jetbrains mono via font-mono.

approach:
1. create app/components/layout/KonamiBoot.vue:
   - on konami trigger, mount a fixed inset-0 z-[9999] div with bg-black text-paper font-mono.
   - render a <pre> that streams lines via a rAF-driven typewriter at ~30 chars per frame.
   - lines (in order) — keep them lowercase except status tags:
     synhorse bios v0.3.1 — copyright (c) syn industries
     memory test ............ 64k ok
     cpu: pony-core (4 hooves) @ 4.20 ghz
     loading the horse ............ [ ok ]
     mounting /dev/horse ............ [ ok ]
     starting scanlines daemon ............ [ ok ]
     starting grain daemon ............ [ ok ]
     starting vibes ............ [WARN] vibes immaculate, continuing
     fsck of /home/syn ............ clean
     welcome to synhorse linux. press any key.
   - after the last line, listen once for any keydown / mousedown / touchstart and fade the overlay out over 400ms via a transition class.
   - if no input within 4 seconds of the last line, auto-dismiss anyway.
   - add .boot-mode to <body> while active to ramp scanlines/grain animation speeds (define those amplifications in main.css under a new selector body.boot-mode .fx-scan { animation-duration: 1s; } etc).
2. on first mount, also call useKonamiCode again to bind a second konami → instant dismiss.
3. respect prefers-reduced-motion: skip the typewriter entirely, render the full screen instantly, hold for 1.5s, fade out.
4. accessibility: aria-live="polite" on the <pre> so a screen reader gets the last line, role="dialog" on the wrapper, focus trap optional (the dismiss-on-keypress covers it).
```

---

### 8. synthwave gridfloor

**concept.** the FX layer gains a third overlay: an animated perspective-projected pink/cyan grid floor anchored to the bottom of the viewport, with a setting sun above it. site content stays interactive. permanent until next konami.

**vibe.** "1985 forever."

**prompt.**

```plaintext
implement a konami payload that toggles a synthwave gridfloor + sun overlay on the FX layer. persistent until re-trigger.

context:
- existing FX layer: app/components/layout/FxLayer.vue currently renders .fx-scan, .fx-grain, .fx-vignette divs. all three are pure-css overlays in main.css.
- theme tokens: --color-hot, --color-cool for the grid lines, --color-pop for the sun gradient mid-band.
- konami composable: app/composables/useKonamiCode.ts.

approach:
1. create app/components/layout/KonamiGridfloor.vue:
   - manages a ref<boolean> for "gridfloor enabled" persisted in sessionStorage.
   - watches the boolean and, when true, mounts a sibling div .fx-gridfloor anchored bottom: 0 with height 40vh.
2. create the .fx-gridfloor css in app/assets/css/main.css under @layer components (or a new section near .fx-vignette). it should:
   - be aria-hidden="true" and pointer-events: none.
   - have a transparent background with two repeating-linear-gradient layers — one for vertical lines, one for horizontal lines — each in --color-hot / 0.4 alpha.
   - apply transform: perspective(600px) rotateX(60deg) and translateY a bit so the grid recedes toward a vanishing point near the bottom-quarter of the viewport.
   - animate the y-component of the horizontal gradient with a "gridfloor-scroll" keyframe (12s linear infinite) so the lines appear to move toward the camera. respect prefers-reduced-motion by setting animation-duration to 0 in the existing reduced-motion block.
3. add a sun: a sibling .fx-gridsun div positioned absolute, bottom: 35vh, left: 50%, translateX(-50%), 320px circle with a radial-gradient from --color-pop at top to --color-hot at bottom, and three horizontal "slats" cut out via mask-image with linear-gradient stripes.
4. include a subtle vignette boost so site content stays readable (intensify --fx-vignette opacity by adding a .gridfloor-mode class to body when active).
5. trigger toast: "gridfloor on — drive carefully" / "gridfloor off — back to the void".
```

---

### 9. page hostage (text glitch storm)

**concept.** every text node on the page starts intermittently swapping characters with glitch glyphs (zalgo-light + 1337-speak + occasional kanji). looks like the matrix. lasts 15 seconds.

**vibe.** "your text just escaped."

**prompt.**

```plaintext
implement a konami payload that, for 15 seconds, intermittently corrupts visible text content with glitch glyphs.

context:
- konami composable: app/composables/useKonamiCode.ts.
- this MUST not damage the dom permanently. use a non-destructive approach: read text nodes, wrap originals in a data attribute, swap chars in-memory, restore on cleanup.

approach:
1. create app/composables/useTextHostage.ts:
   - exports startHostage(durationMs: number) and stopHostage().
   - on start, walks the live dom under <main> and the layout components except those with [data-no-hostage] (mark anything you don't want corrupted, e.g. the status bar version badge, by adding data-no-hostage="" attribute).
   - for each text node, captures the original string, sets a data-original attribute on the parent element (or stores a WeakMap<Text, string>).
   - on a 120ms tick:
     - pick ~3% of tracked text nodes at random.
     - for each, replace 1–3 random chars in the visible string with one of: ▓ █ ░ ◆ ► ◢ ◣ ☐ ⌬ a random katakana from the kana ranges, or l33t equivalents (a→4, e→3, etc).
     - schedule a restore of the original text 200–500ms later (per node).
   - stop() restores all originals and clears all timers / mutationobserver subscriptions.
   - watch the dom for mutations during the active window (mutationobserver) so newly-inserted nodes also get tracked.
2. create app/components/layout/KonamiHostage.vue → useKonamiCode(() => startHostage(15000)) and ensure a re-trigger calls stopHostage immediately + reset.
3. mark the konami toast itself, the status bar version, all kbd hints, and any phone-numbery thing with data-no-hostage so they stay legible.
4. respect prefers-reduced-motion: skip entirely (motion-stable users typically also prefer text-stability).
5. ensure all teardown happens in onUnmounted and on stopHostage. no zombie timers.
```

---

### 10. cassette rewind

**concept.** entire viewport plays in reverse for 2 seconds: video-tape rewind sound, animations reverse, scroll position auto-scrubs to top, text in headings reverses character-by-character, then snaps back to normal.

**vibe.** "be kind, rewind."

**prompt.**

```plaintext
implement a konami payload that plays a 2-second cassette-rewind effect over the entire site.

context:
- konami composable: app/composables/useKonamiCode.ts.
- existing scan + grain overlays in app/components/layout/FxLayer.vue, ramped via classes on body.
- theme tokens: --color-paper-3 for the rewind-bar text; --shadow-glow-cool for a faint blue tint during rewind.

approach:
1. create app/components/layout/KonamiRewind.vue:
   - on trigger, add class .rewind-mode to <body>. disable pointer events on .site for the duration.
   - over 2000ms, animate window.scrollY from current position back to 0 using rAF with an ease-in cubic.
   - simultaneously, run a typewriter-in-reverse on every element with class .page-h1: capture innerText, then reduce length by one char every (durationMs / charCount) ms; restore in full at the end.
   - overlay a fixed top: 0 left: 0 right: 0 strip of height 28px with text "◀◀ rewind" font-mono uppercase tracking-wider colored --color-paper-3 with a stuttering animation (existing glitch-jitter, sped up to 0.06s steps(2) infinite).
   - reverse the css animation play-state on .fx-scan and .fx-grain by adding `animation-direction: reverse; animation-duration: 0.5s;` in body.rewind-mode rules in main.css.
2. optional: synthesise a faint high-frequency "tape rewind" sound via web audio (band-limited noise modulated by a sawtooth). gate behind prefers-reduced-data. skip on reduced-motion.
3. cleanup: after 2000ms, remove .rewind-mode, restore all headline texts from the captured originals, restore body pointer events, dismiss the rewind strip.
4. a second konami during the rewind cancels and restores immediately.
```

---

## tier 4 — interactive / playable

### 11. snake on the void

**concept.** a fullscreen modal opens with a playable snake game styled in synhorse colours. snake = pink, food = cyan dots, walls = paper-3 hairline. high score persists in localStorage. esc to dismiss.

**vibe.** "you came here to read about a horse and now you are playing nokia snake."

**prompt.**

```plaintext
implement a konami payload that opens a playable snake mini-game in a fullscreen modal styled in the synhorse theme.

context:
- konami composable: app/composables/useKonamiCode.ts.
- theme tokens: --color-hot (snake), --color-cool (food), --color-paper-3 (gridlines), --color-void (background), font-mono and font-display for HUD.
- existing modal/overlay patterns: see app/components/layout/CommandPalette.vue for the overlay shape and dismiss handling. follow its idioms (escape key, click-outside, focus trap).
- accessibility: the game itself is not screen-reader-friendly, but the modal must be dismissable via keyboard (esc).

approach:
1. create app/components/layout/KonamiSnake.vue with the konami trigger inside.
2. create app/components/snake/SnakeGame.vue rendering a <canvas ref="canvas"> at 600×600, styled with .console + theme colours. game loop runs in rAF, paused when modal closes.
3. implementation rules:
   - grid: 30×30 cells, snake speed: 6 cells/sec initially, +0.5/sec every 5 food eaten.
   - controls: arrow keys, wasd, hjkl all bound. pressing the konami sequence inside the game does nothing (don't recursively trigger the easter egg).
   - food: random cell, never on the snake. cyan glow shadow-glow-cool pulse via existing animate-pulse-glow.
   - death: snake collides with wall or self → game over screen with score, high score (localStorage key "synhorse:snake:hi"), and "press r to restart, esc to leave".
   - HUD: top-left "score: NN" font-mono text-sm, top-right "high: NN".
   - title: "◆ snake.horse ◆" font-display text-4xl above the canvas.
4. render an outer .konami-snake-overlay fixed inset-0 bg-void/80 backdrop-blur-sm grid place-items-center z-[3000].
5. dismiss: esc key or backdrop click closes the modal. trigger toast "score: NN — back to the site" on close if score > 0.
6. respect prefers-reduced-motion: skip the food pulse animation; everything else is fine.
```

---

### 12. boss battle

**concept.** a giant ASCII horse appears centre-screen with a pink HP bar at 100/100. you must click it 30 times to defeat it. each click takes 1–4 hp (random), screen flashes, plays a damage tick. defeat unlocks a console message and `/the-stable` route (which 404s normally).

**vibe.** "you have entered combat with a horse. you cannot run."

**prompt.**

```plaintext
implement a konami payload that triggers a boss-fight encounter against a giant ascii horse.

context:
- konami composable: app/composables/useKonamiCode.ts.
- theme tokens: --color-hot for hp bar, --color-danger for damage flash, --color-pop for crit hits.
- routing: app/pages/. routes like /the-stable do not exist and currently 404 via app/error.vue.

approach:
1. create app/components/layout/KonamiBoss.vue.
   - on konami trigger, mount a fixed inset-0 z-[3000] grid place-items-center modal with backdrop-blur and a click-blocking layer.
   - centre: a multiline <pre> rendering an ascii horse art (find or write a ~14-line version, --color-hot text, font-mono). use animate-pulse-glow on the wrapper.
   - top of the modal: title "WILD HORSE APPEARED" font-display text-5xl uppercase tracking-wider --color-paper.
   - bottom: hp bar 800px wide, segmented, fill-color --color-hot, label "MARE HP" + "100 / 100" font-mono.
   - subtitle: "click to attack. press esc to flee (cowardly)."
2. interaction:
   - clicks on the ascii horse subtract 1–4 hp (uniform random). 5% chance of a crit (10 hp, --color-pop flash, "CRITICAL HIT" toast).
   - each click triggers a 100ms screen-shake using a one-off keyframe boss-shake (re-use the glitch-jitter pattern at higher amplitude — define it in main.css next to the existing keyframes).
   - hp at 0 → modal title swaps to "HORSE DEFEATED" and the ascii horse rotates 180° (transform). show a 3-line console output:
     "you defeated the horse."
     "you feel slightly worse."
     "achievement unlocked: /the-stable"
   - then close the modal after 3 seconds and unlock the stable route.
3. routing unlock:
   - persist `synhorse:stable-unlocked` in localStorage on victory.
   - create app/pages/the-stable.vue that renders only if localStorage says unlocked, else redirects to / via navigateTo with replace: true. content: a page of horse-themed lorem ipsum + a "logout" button that clears the unlock and navigates home.
4. esc to flee: closes the modal, shows toast "you fled. the horse remembers."
5. respect prefers-reduced-motion: drop the shake to a colour flash only.
```

---

### 13. konami chat — talk to the horse

**concept.** a sidebar slides in from the right with a chat interface. you type messages; the horse replies with deadpan, lowercase, pre-canned lines from a small finite-state machine. closes on second konami.

**vibe.** "the horse is listening but not therapist-coded."

**prompt.**

```plaintext
implement a konami payload that opens a slide-in chat sidebar where the user can talk to "the horse".

context:
- konami composable: app/composables/useKonamiCode.ts.
- theme tokens: panels use --color-void-2 / --color-void-3 for elevation, --color-paper for primary text, --color-paper-3 for muted, --color-hot for the horse's avatar accent.
- voice: the horse is dry, slightly menacing, lowercase, british english, never uses exclamation marks.

approach:
1. create app/components/layout/KonamiChat.vue.
   - mounts a fixed right: 0 top: 0 bottom: 0 w-[380px] panel that slides in via a transition (transform translateX(100%) → 0, 250ms ease-snap).
   - header: small mono "CHAT WITH THE HORSE" eyebrow + a close button.
   - body: scrollable message list, message bubbles. user messages right-aligned --color-cool border, horse messages left-aligned --color-hot border, horse avatar a single ◆ glyph.
   - footer: <textarea> with placeholder "say something, coward" + send button (or enter-to-send, shift-enter for newline).
2. response logic — pure client-side, deterministic:
   - app/composables/useHorseBrain.ts exports `respond(input: string): string`.
   - branches:
     - input contains "hello" / "hi" / "hey" → "you cannot greet a horse."
     - input contains "?" → pick from ["i don't know.", "ask the void.", "no.", "yes, but only sometimes."]
     - input contains "love" / "like you" → "i am a horse."
     - input contains "syn" / "dave" → "do not ask about him."
     - input contains "konami" / "code" → "you are inside the easter egg right now. obviously."
     - input is "/quit" or "exit" → "you can just close it. it's a div."
     - default → pick from ["mm.", "i see.", "interesting.", "go on.", "and then?"] but biased so the horse never says the same line twice in a row (track lastLine in module scope).
   - 600ms simulated typing delay: show a "● ● ●" indicator before the response.
3. persistence: chat history lives in sessionStorage so it survives route changes within the tab; cleared on close. cap at 50 messages, drop oldest.
4. close behaviour: esc key, second konami, or click the close button. all three slide the panel back out.
5. respect prefers-reduced-motion: skip the slide transition, just toggle visibility instantly.
```

---

## tier ∞ — the curse

### 14. ALL OF THEM

**concept.** the konami code now triggers a random one of the above payloads each time, except the first time per session (which always plays the boot sequence). state persists in sessionStorage.

**vibe.** "russian roulette but for ergonomics."

**prompt.**

```plaintext
implement a konami payload that randomises which other konami payload fires on each trigger.

context:
- assumes ideas 1–13 have been implemented as standalone components, each exporting a single fire() function via a composable next to it (refactor each KonamiX.vue to delegate the actual effect into a useKonamiX.ts composable that returns { fire(): void, stop?(): void }).
- konami composable: app/composables/useKonamiCode.ts.

approach:
1. create app/composables/useKonamiRoulette.ts:
   - imports all 13 fire() functions.
   - exports a fire() that:
     - on first call per session (gate via sessionStorage key "synhorse:konami:first-fire"), always calls the boot sequence (idea #7) and sets the gate.
     - on every subsequent call, picks one of the other 12 at random and fires it.
     - prevents the same effect firing twice in a row via a lastFired ref in module scope.
2. replace the existing app/components/layout/KonamiToast.vue trigger with a single KonamiRoulette.vue that calls useKonamiCode(() => fireRoulette()).
3. ensure each individual effect's stop()/cleanup is callable by the next fire() so payloads don't stack catastrophically — e.g. firing the gridfloor while the rewind is mid-animation should cancel the rewind first.
4. respect prefers-reduced-motion: in that mode, the roulette set is restricted to ideas {1, 2, 5, 11, 13} (the ones that don't depend on heavy animation).
5. the on-screen toast on every fire shows just "◆ rolling ◆" for 200ms before the actual effect kicks in, so users can tell they hit the code.
```

---

## composition notes

- **don't ship more than one tier-3 or tier-4 effect at a time.** they all want full-viewport real estate; running two simultaneously is a bug, not a feature.
- **every payload must have an off-switch.** even the persistent ones (idea #6 mare stress) explicitly use refresh as the escape hatch — that's a deliberate joke, not an oversight, but it has to be telegraphed in the toast.
- **keyframes are global in main.css.** any new animation must be uniquely named. existing names so far: pulse-glow, scan-flicker, grain-shift, glitch-jitter, glitch-strong, konami-in, konami-jitter. follow the konami-\* prefix convention for new ones (boss-shake → konami-boss-shake, gridfloor-scroll → konami-gridfloor-scroll, etc) so a future `grep` finds them all.
- **prefers-reduced-motion is non-negotiable.** the css media query block at the bottom of main.css already mutes the loud ambient animations; every payload above specifies its reduced-motion behaviour explicitly. the user uses this site themselves and reduced-motion isn't optional decoration.
- **sessionStorage for persistence, never localStorage.** easter eggs that survive a tab close are hostile. only the snake high-score (idea #11) and the boss-fight unlock (idea #12) use localStorage, because both are arguably user achievements.
