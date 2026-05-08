# konami code — escalation ideas

current behaviour: `app/composables/useKonamiCode.ts` watches for ↑↑↓↓←→←→ba and fires a callback. only consumer today is `app/components/layout/KonamiToast.vue`, which pops a pink "◆ the horse is loose ◆" toast for 3.2s.

what follows is a menu of more expansive / more ridiculous payloads. each entry has a concept, a vibe note, and a detailed prompt you can hand to a model. prompts are written so an implementation pass lands inside this codebase's conventions (theme tokens, lowercase prose, vue 3 `<script setup lang="ts">`, no react, `prefers-reduced-motion` respect, exit conditions).

## crt boot sequence

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

## sentient command palette

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

We want to combine the two. Have the boot sequence trigger, and then when "rebooted", the notification toast from the second idea appears and the second idea is implemented.

A second konami disables effects, as stated in the second idea. But if the user konamis AGAIN, they just get the 'commands enabled' toast; we skip the boot sequence.

it's fine for the boot sequence to run if the page is refreshed and the konami code entered again; we don't need to persist where the user is in the process.
