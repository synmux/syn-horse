# syn.horse design system

> a glitch-vaporwave shitpost-friendly ui system for a fictional product called **syn.horse**.
> built from scratch — no existing codebase, figma, or assets were provided.

---

## what is syn.horse?

syn.horse is a (fictional) ✶ post-software ✶ playground for people who think computers got too polite. it's a chaotic-good toolkit shaped like a webapp, a terminal, a marketing site, a mobile app, and a slide deck — all bleeding into each other.

it has the energy of a 2am twitter thread that turns into a github project that gets 3k stars. think `are.na` × `cool retro term` × the `dril` account × `winamp 2`.

### what it does (lore)

doesn't matter. the ui is the product. for purposes of mocks and screens, treat it as:

- a **dashboard** for "synths" (saved scraps of internet detritus)
- a **terminal** that talks back
- a **marketing site** that is mostly threats and screenshots
- a **mobile app** for capturing synths on the go
- a **deck template** for hostile all-hands meetings

### sources

- nothing was attached. brand was invented from a one-line brief: _"cyberpunk, shitpost-friendly user interface."_
- user-selected direction: **glitch / vaporwave** flavor, pinks/purples/cyan, pixel headers + clean body, mixed icon style, scanlines + chromatic aberration + grain.
- voice: lowercase by default, ALL CAPS WHEN ANGRY, aggressive technical jargon, self-aware, lovingly threatens the user.

---

## content fundamentals

### tone

syn.horse talks like an unhinged but technically competent friend. the voice is **lowercase by default**, slips into **ALL CAPS** when something is broken, dangerous, or merely exciting. it talks to _you_, not _the user_. it never calls you "valued" anything.

### casing rules

- **headers, buttons, labels:** lowercase (`new synth`, `settings`, `cancel`)
- **errors, destructive confirmations, easter eggs:** ALL CAPS (`CANNOT UNDO. DON'T CRY.`)
- **proper nouns + acronyms:** keep their casing (`syn.horse`, `OAuth`, `JSON`)
- **headlines on marketing:** lowercase, oversized, often with a period for finality (`computers got too polite.`)

### the i / you contract

- **i** = the system. used sparingly, mostly in error states or boot logs. (`i lost the file. i'm not sorry.`)
- **you** = the human reading. always second-person. never "users", never "members".
- **we** = forbidden. there is no we.

### emoji

**no emoji.** at all. the only exceptions:

- ascii kaomoji are fine (`(╯°□°)╯︵ ┻━┻`, `¯\_(ツ)_/¯`, `ʕ•ᴥ•ʔ`)
- unicode geometry / arrows / box-drawing **are encouraged** (`▶`, `◆`, `→`, `▓`, `▒`, `░`, `■`, `◯`, `✶`, `※`)
- specifically banned: 🚀 ✨ 💜 👀 🔥 and anything with a face

### copy examples

| context             | bad                                                       | good                                                  |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| empty dashboard     | "no items yet — get started by creating your first item!" | `nothing here. you have to make something.`           |
| 404                 | "page not found"                                          | `THIS PAGE DOES NOT EXIST. NEVER DID. GO HOME.`       |
| save success        | "your changes have been saved"                            | `saved. probably.`                                    |
| destructive confirm | "are you sure?"                                           | `THIS DELETES IT FOREVER. type "yes" if you mean it.` |
| loading             | "please wait..."                                          | `thinking. (badly.)`                                  |
| signup cta          | "create your account"                                     | `become a synth. it's free. it's also weird.`         |
| onboarding          | "welcome to our platform!"                                | `welcome. read nothing. press buttons.`               |
| paywall             | "upgrade to premium"                                      | `give us $9. or don't. we'll cope.`                   |
| error toast         | "something went wrong"                                    | `IT BROKE. WE SAW. LOOK AWAY.`                        |

### technical jargon, weaponized

we lean into the jargon, then mock it. `garbage-collected your soul`. `the kernel panics, but romantically`. `we sharded your feelings`. don't actually use these — but understand the _flavor_. real product copy stays terse.

### the fourth wall

occasionally — never more than once per screen — break it. a footer that says `you're still scrolling. it's fine.` an empty state that says `i was hoping you'd give up.` use sparingly. overuse = quirky brand voice = death.

---

## visual foundations

### the core idea

**modem-era weirdness, rendered crisply.** the brand looks like a webpage from 1998 was scanned, then a 2026 design team made it sharp again, then someone cracked the screen.

### color

the palette is a **dark vaporwave**: near-black background, hot magenta + electric cyan + sour purple as the load-bearing trio, with a bright lemon as the _"hey"_ accent. greys are warm and slightly violet, never neutral. see `colors_and_type.css` for tokens.

- **bg:** `#0d0221` (deep void purple, not pure black)
- **fg:** `#fff7ff` (off-white with a pink hue — never `#ffffff`)
- **hot:** `#ff71ce` (the brand's primary signal)
- **cool:** `#01cdfe` (secondary signal, links, focus)
- **lilac:** `#b967ff` (tertiary, decorative)
- **pop:** `#fffb96` (warnings, "look here")
- **danger:** `#ff003c` (only for destructive states; angrier than `hot`)

semantic vars (`--fg-1`, `--fg-2`, `--bg-elev-1`, `--accent`, etc) are defined in css and should be used everywhere over raw hex.

### typography

- **display / headers:** **VT323** (pixel/bitmap, license: SIL OFL via google fonts). Used at large sizes for headlines, section titles, terminal prompts. _flagged: substituted from google fonts since no custom font was provided._
- **body / ui:** **Inter** (clean grotesque, geometric enough to feel modern, readable enough to not fight the pixel). 14–16px for ui, 17–19px for body.
- **mono / code:** **JetBrains Mono** for code blocks, terminals, monospaced ui (timestamps, kbd hints).

scale follows a 1.25 modular scale, capped — see `colors_and_type.css`.

### spacing & layout

- 4px base grid. spacing tokens: `--s-1` 4, `--s-2` 8, `--s-3` 12, `--s-4` 16, `--s-5` 24, `--s-6` 32, `--s-7` 48, `--s-8` 64, `--s-9` 96.
- pages favor **wide gutters** + generous whitespace, then break the rhythm with one **dense, weird module** (a marquee, a console, an oversized timestamp).
- layout often features fixed elements: a top status bar (`◆ syn.horse / ONLINE / 03:41:19`), a bottom marquee, a side rail with system stats.

### corners & borders

- corners: **square by default** (`--radius-0: 0`). cards get `--radius-1: 2px` for the _barely there_ softness. pills get `999px`. nothing in between.
- borders: **1px hairlines** in `--fg-3` (low-contrast lilac-grey), or **2px hard** in `--hot` for emphasis. no 1.5px, no dashed except for drop zones.

### shadows & elevation

shadows are NOT soft and blurry. they are:

- **glow shadows:** `0 0 24px rgba(255,113,206,0.4)` — pink/cyan halo around interactive elements on focus or hover.
- **chromatic offset:** `2px 0 0 #ff71ce, -2px 0 0 #01cdfe` text-shadow on hover for the rgb-split effect.
- **inset hairline:** `inset 0 1px 0 rgba(255,255,255,0.06)` to give cards a top edge highlight.

no traditional drop shadows. no `0 4px 12px rgba(0,0,0,0.1)` softness. that's for productivity apps.

### backgrounds & textures

three layered effects, used together or apart:

1. **scanlines:** repeating horizontal `1px` lines at ~5% opacity over the viewport. fixed, behind everything.
2. **grain/noise:** low-opacity (~3%) animated noise svg overlay on cards and full-bleed sections.
3. **vignette:** a subtle radial gradient darkening the corners of full-bleed sections.

backgrounds are **rarely flat** — they almost always have one of these textures. but never gradients-as-decoration; we don't do `linear-gradient(135deg, #ff71ce, #01cdfe)` filling a hero. gradients are reserved for type fills and the occasional CRT overlay.

### imagery

- **vibe:** cool, slightly desaturated, with intentional VHS artifacts (chroma bleed, scan distortion, noise). think ps1-era 3d screenshots, low-res webcam captures, scans of old manuals.
- when no real photography is available, we use **placeholder cards** with the wordmark and a `[ image: TODO ]` label. we never ai-generate decorative imagery.

### animation

- **easing:** mostly **hard snaps** (`cubic-bezier(0.2, 0.9, 0.2, 1)`) or **none at all**. transitions are 80–160ms — fast.
- **boot sequences:** key surfaces (terminal, dashboard) cold-start with a typewriter reveal of a few system lines (~1s total) before settling.
- **glitch on hover:** interactive elements get a 60ms rgb-split + 1px translate jitter on hover. only on `:hover`, never `:focus` (which uses glow instead).
- **scanline flicker:** the global scanline overlay has a slow 4s opacity oscillation between 4% and 6%.
- **no bouncing.** no spring physics. no overshoot. nothing in syn.horse "delights" — it confronts.

### hover & press states

- **hover:** rgb-split text-shadow + 1px translate (random direction) for 60ms then settle. background color does NOT change for buttons; only text effect changes.
- **press:** scale to 0.97, snap back. no color shift.
- **focus:** 2px solid `--cool` outline at 2px offset, plus a `0 0 12px var(--cool)` glow. visible, ugly on purpose.
- **disabled:** 40% opacity + `cursor: not-allowed` + a tiny `(no.)` postfix on button labels where space allows.

### transparency & blur

- modals use a `rgba(13, 2, 33, 0.85)` backdrop with `backdrop-filter: blur(8px)`.
- pinned headers use `rgba(13, 2, 33, 0.7)` + `blur(12px)` so the marquee underneath shows through.
- otherwise, transparency is sparing. no glassmorphism cards.

### cards

- bg: `--bg-elev-1` (a step lighter than page bg, very slight)
- border: 1px solid `--fg-3`
- corner: `--radius-1` (2px)
- inner highlight: `inset 0 1px 0 rgba(255,255,255,0.06)`
- on hover: border color shifts to `--hot`, no movement.

### protection gradients

when overlaying text on imagery, we use a hard linear gradient `to top, var(--bg) 0%, transparent 60%` rather than a soft one. it should look like the image is _clipped_, not faded.

### fixed/persistent ui

- **top status bar** (24px tall): brand mark, route, timestamp, "ONLINE" pulse. always lowercase. mono.
- **bottom marquee** (28px tall): scrolling system messages, alerts, jokes. left-to-right, 30s loop.
- **side rail** (web app only): vertical icon nav, 56px wide.

these are part of the ui, not chrome. they are _visible_ and _load-bearing_.

---

## iconography

### approach

**mixed — line + pixel**, picked by context:

- **line icons (Lucide via cdn):** for ui chrome — sidebar nav, button affordances, form inputs, menu items. 1.5px stroke, 16px or 20px sizes. _flagged: substituted from CDN since no custom icon set was provided. matches our "modern but weird" feel._
- **pixel icons:** custom 8×8 / 16×16 sprites for accents, status indicators, the brand mark itself. drawn as inline SVG with hard pixel grid. used for: brand mark, loading spinner, "synth" type indicator, terminal prompt glyphs.
- **unicode glyphs:** `◆ ▶ ▼ ▲ ◯ ✶ ※ ▓ ▒ ░ ■` are first-class — used in headers, list bullets, and decorative dividers. cheap, crisp, on-brand.
- **emoji:** banned (see content fundamentals).

icon assets live in `assets/icons/`. lucide is loaded via cdn in html files.

### usage rules

- never put a line icon next to a pixel icon in the same row.
- pixel icons render at exactly 16px or 32px — never scaled to non-integer multiples.
- decorative unicode glyphs go in `--lilac` or `--cool`, never `--fg-1`.
- no icon-only buttons in the marketing site (always pair with a label).

---

## index — what's in this folder

### root files

- `README.md` — this file
- `SKILL.md` — agent skill definition (cross-compatible with claude code)
- `colors_and_type.css` — design tokens (colors, type, spacing, shadows, motion). import this everywhere.

### folders

- `fonts/` — webfont source files (currently: google fonts via cdn — _substitution flagged_)
- `assets/` — logos, brand marks, noise textures, illustrations, pixel sprites
- `assets/icons/` — pixel icon sprites
- `preview/` — design system tab cards (one html per token group)
- `ui_kits/webapp/` — dashboard ui kit (jsx components + index.html)
- `ui_kits/terminal/` — cli/terminal ui kit
- `ui_kits/marketing/` — marketing site ui kit
- `ui_kits/mobile/` — mobile app ui kit (in ios frame)
- `slides/` — slide deck template (one html per slide type)

### substitutions flagged

these were chosen by me from CDN/Google Fonts because no source assets were provided. **please confirm or replace:**

- **VT323** → display/header font (substitute for "pixel/bitmap font for headers")
- **Inter** → body font (substitute for "clean sans body")
- **JetBrains Mono** → mono font
- **Lucide** → line icon set
- **logo / wordmark** → drawn from scratch as inline SVG; happy to replace with a real asset
