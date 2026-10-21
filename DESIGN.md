---
version: alpha
name: syn.horse
description: >-
  Glitch-vaporwave identity for syn.horse, a personal site (with a blog that is one
  section among several) and its satellite surfaces: web app, terminal, marketing
  page, mobile app and slide deck. Dark void-purple ground, hot pink / cyan / lilac
  signals, VT323 pixel headlines over Inter body, square corners, glow instead of
  shadow, and a permanent layer of CRT scanlines and grain.
colors:
  primary: "#ff71ce"
  primary-pressed: "#ff2bb5"
  on-primary: "#0d0221"
  secondary: "#01cdfe"
  secondary-pressed: "#00a3cc"
  tertiary: "#b967ff"
  tertiary-pressed: "#9333ea"
  pop: "#fffb96"
  pop-pressed: "#f5e441"
  error: "#ff003c"
  error-pressed: "#cc002e"
  success: "#62ffaa"
  surface: "#0d0221"
  surface-deep: "#08011a"
  surface-container: "#14082e"
  surface-container-high: "#1d0d3d"
  outline-variant: "#2a1656"
  on-surface: "#fff7ff"
  on-surface-variant: "#d9c8e8"
  outline: "#8b7aa8"
  on-surface-disabled: "#4a3d63"
typography:
  display-xl:
    fontFamily: VT323
    fontSize: 144px
    fontWeight: 400
    lineHeight: 1.05
  headline-display:
    fontFamily: VT323
    fontSize: 96px
    fontWeight: 400
    lineHeight: 1.18
  headline-lg:
    fontFamily: VT323
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.18
  headline-md:
    fontFamily: VT323
    fontSize: 44px
    fontWeight: 400
    lineHeight: 1.22
  headline-sm:
    fontFamily: VT323
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.22
  title-md:
    fontFamily: VT323
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.22
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-caps:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.12em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  5xl: 128px
  statusbar-height: 24px
  marquee-height: 28px
  siderail-width: 56px
  content-max-width: 1200px
  reading-max-width: 880px
  prose-max-width: 680px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 16px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 16px
    height: 40px
  button-secondary-hover:
    textColor: "{colors.primary}"
  button-disabled:
    textColor: "{colors.on-surface-disabled}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 16px
  button-ghost-hover:
    textColor: "{colors.secondary}"
  link:
    textColor: "{colors.secondary}"
  link-active:
    textColor: "{colors.secondary-pressed}"
  glyph-decorative:
    textColor: "{colors.tertiary}"
  glyph-decorative-active:
    textColor: "{colors.tertiary-pressed}"
  button-danger:
    backgroundColor: transparent
    textColor: "{colors.error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 16px
  button-danger-hover:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-surface}"
  button-danger-active:
    backgroundColor: "{colors.error-pressed}"
    textColor: "{colors.on-surface}"
  button-pill:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 16px
  card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 16px
  tag:
    backgroundColor: transparent
    textColor: "{colors.outline}"
    typography: "{typography.label-mono-sm}"
    rounded: "{rounded.none}"
    padding: 8px
  tag-hot:
    textColor: "{colors.primary}"
  tag-cool:
    textColor: "{colors.secondary}"
  tag-warn:
    textColor: "{colors.pop}"
  tag-warn-active:
    textColor: "{colors.pop-pressed}"
  badge-status:
    backgroundColor: transparent
    textColor: "{colors.success}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.none}"
    padding: 10px
  input-field:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: 12px
  input-label:
    textColor: "{colors.outline}"
    typography: "{typography.label-mono-sm}"
  status-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.outline}"
    typography: "{typography.label-mono}"
    height: 24px
  marquee:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.outline}"
    typography: "{typography.label-mono}"
    height: 28px
  side-rail:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.outline}"
    width: 56px
  side-rail-item-active:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    size: 40px
  console:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.secondary}"
    typography: "{typography.code}"
    padding: 16px
  command-palette:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    width: 640px
  tab-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-mono}"
  blockquote:
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-sm}"
  inline-code:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.secondary}"
    typography: "{typography.code}"
---

# syn.horse

## Overview

syn.horse is a personal site wearing a glitch-vaporwave skin. The core surface is the site itself: a home page, a `/now` page, a projects grid and a blog. The blog is one tab of four and never the front door. The same identity stretches across a dashboard-style web app, a fake terminal, a marketing landing page, a mobile app and a slide deck.

The look is **modem-era weirdness, rendered crisply**: a 1998 web page that was scanned, sharpened by a 2026 design team, then dropped so the screen cracked. It should feel confrontational, technically fluent and self-aware. It should never feel polite, corporate or "delightful".

Voice is part of the design system, and agents generating UI copy must follow it:

- **lowercase by default.** Headers, buttons, labels and navigation are all lowercase (`new synth`, `settings`, `cancel`).
- **ALL CAPS WHEN ANGRY.** Errors, destructive confirmations and easter eggs go uppercase (`CANNOT UNDO. DON'T CRY.`).
- Proper nouns and acronyms keep their casing (`syn.horse`, `OAuth`, `JSON`).
- The system is **i**, the reader is **you**, and **we** does not exist. Never write "users" or "members".
- It threatens you, lovingly. Copy is terse and dry: `saved. probably.`, `thinking. (badly.)`, `THIS PAGE DOES NOT EXIST. NEVER DID. GO HOME.`, `nothing here. you have to make something.`
- Break the fourth wall at most once per screen (`you're still scrolling. it's fine.`).
- **No emoji, ever.** ASCII kaomoji (`¯\_(ツ)_/¯`, `(╯°□°)╯︵ ┻━┻`) and unicode geometry (`◆ ▶ ▼ ◯ ✶ ※ ▓ ▒ ░ ■ →`) are encouraged.

## Colors

The palette is a **dark vaporwave**: a near-black purple void as the ground, three loud signal colours that carry the brand, a lemon for "look here", and an angrier red kept for destruction only. Neutrals are warm and faintly violet, never grey.

- **Hot pink (`primary`, #ff71ce):** The brand's main signal. Primary buttons, active borders, card hover, `◆` bullets, the top edge of active tabs, the `>` prompt in consoles. Pressed state is #ff2bb5.
- **Electric cyan (`secondary`, #01cdfe):** Links, focus rings, code and console text, ghost-button hover. Pressed state is #00a3cc.
- **Sour lilac (`tertiary`, #b967ff):** Decoration. Unicode glyphs, dividers, secondary accents. Pressed state is #9333ea.
- **Lemon (`pop`, #fffb96):** Warnings, "unstable" status, console warnings, the occasional "hey, here".
- **Danger (`error`, #ff003c):** Destructive states only. It is deliberately angrier than hot pink so the two never get confused.
- **Success (`success`, #62ffaa):** The `ONLINE` pulse dot and success badges. Use sparingly.
- **Void (`surface`, #0d0221):** Page background. Never pure black. Elevation steps up through #14082e (cards, rails), #1d0d3d (hover and active surfaces) and #2a1656 (hairline borders and dividers). Console and code blocks sink _below_ the page to #08011a.
- **Paper (`on-surface`, #fff7ff):** Primary text, an off-white with a pink cast. Never #ffffff. Secondary text is #d9c8e8, tertiary text and soft borders are #8b7aa8, and disabled is #4a3d63.

Text on a hot-pink fill is always void (#0d0221), not white. The source CSS exposes semantic aliases (`--fg-1…4`, `--bg`, `--bg-elev-1…3`, `--accent`, `--accent-2`, `--accent-3`, `--warn`, `--error`, `--success`); production code should use those variables rather than raw hex.

## Typography

Three families, each with a fixed job. All three are self-hosted (`fonts/`) and released under the SIL OFL.

- **VT323 (display):** A pixel/bitmap face used for every headline, section title, card title, blockquote and the command palette input. It has **one weight only (400)**; never fake bold. Headlines are forced lowercase. At 96px and above use it for single-line hero text (line height 1.05). For anything that might wrap, use a line height of **1.18–1.22** plus bottom padding, otherwise descenders collide with the next line.
- **Inter (body and UI):** 14–15px for UI, 17px for long-form reading (line height 1.65), 13px for card descriptions. Buttons are Inter 14px semi-bold (600), lowercase. Uppercase Inter at 17px semi-bold with 0.02em tracking is the `h4` eyebrow style.
- **JetBrains Mono (system):** Code, consoles, timestamps, keyboard hints, tags, status bar and marquee text, field labels and IDs (`◆ SYNTH-0421`). Mono labels are UPPERCASE with 0.08em tracking; eyebrows use 0.12em.

The scale is a capped 1.25 modular ramp: 12 · 13 · 15 · 17 · 20 · 24 · 32 · 44 · 64 · 96 · 144 px. Personal-site page titles sit at 96px (home hero 120px, post titles 80px); web-app page titles sit at 64px.

## Layout

A **4px base grid** with tokens at 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.

Pages favour **wide gutters and generous whitespace**, then break the rhythm with exactly one dense, strange module: a marquee, a console block, an oversized timestamp, a stat strip.

- **Personal site:** single centred column, max width 880px, padding 56px top / 32px sides / 80px bottom. Blog post prose is capped at 680px. Navigation is a sticky top bar; the active item is prefixed with a hot-pink `◆`.
- **Web app:** a CSS grid shell with a 24px **status bar** across the top (brand mark, route, uppercase mono items, green `ONLINE` pulse, clock), a 56px **side rail** of 40px icon buttons on the left, and a 28px **marquee** of scrolling system messages along the bottom (right-to-left, 30–35s loop). Main content is padded 32px × 40px with a max width of 1200px.
- **Grids:** two-column card grids with 14–16px gaps. Stat strips use a 1px gap over an `outline-variant` background so the gaps read as hairlines.

The status bar, marquee and side rail are UI, not chrome. They are visible and load-bearing; never hide them to "clean up" a screen.

## Elevation & Depth

There are **no soft drop shadows**. Nothing like `0 4px 12px rgba(0,0,0,0.1)`. Hierarchy comes from tonal steps, hairlines and light.

- **Tonal layers:** void → #14082e → #1d0d3d → #2a1656. Cards sit one step above the page. Consoles and code blocks sink below it (#08011a).
- **Inset edge:** cards carry `inset 0 1px 0 rgba(255,255,255,0.06)` as a faint top highlight.
- **Glow halos:** `0 0 24px` at 40% alpha in hot pink, cyan or lilac on hover and focus. The command palette gets a stronger `0 0 40px rgba(255,113,206,0.4)`.
- **RGB split:** `text-shadow: 2px 0 0 #ff71ce, -2px 0 0 #01cdfe` is the hover signature on text.
- **Blur:** modal backdrops use `rgba(13,2,33,0.85)` with `backdrop-filter: blur(8px)`; pinned headers use `rgba(13,2,33,0.7)` with `blur(12px)`. No glassmorphism cards anywhere else.
- **Texture overlays (always on):** fixed, pointer-events-none layers at the top of the z-stack (z 9999):
  1. **Scanlines:** `repeating-linear-gradient(to bottom, rgba(255,255,255,0.04–0.05) 0 1px, transparent 1px 3px)`, slowly flickering in opacity over 4s.
  2. **Grain:** an SVG `feTurbulence` noise (baseFrequency 0.9, 2 octaves) at 4% opacity with `mix-blend-mode: overlay`.
  3. **Vignette (optional):** `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)` on full-bleed sections.

Gradients are never decoration. No `linear-gradient(135deg, pink, cyan)` hero fills. They are reserved for type fills, the CRT overlays above, and hard protection gradients (`to top, var(--bg) 0%, transparent 60%`) when text sits on imagery, which should look clipped, not faded.

## Shapes

The shape language is **square, with nothing in between**.

- **0px** is the default for buttons, inputs, tags, tabs, consoles and the command palette.
- **2px** is the "barely there" softness for cards only.
- **4px** is permitted for small chips.
- **999px** pills are for status badges and filter pills only.

Borders are either **1px hairlines** (#2a1656 on dark surfaces, #8b7aa8 for soft outlines) or **2px hard** lines in hot pink for emphasis and buttons. No 1.5px borders. Dashed borders exist only on drop zones.

Pixel artwork (the horse mark, 8×8 and 16×16 sprites) renders at exact integer multiples (16px or 32px) with `image-rendering: pixelated`.

## Components

**Buttons** are Inter 14px / 600, lowercase, square, with a 2px border and padding of 9–10px × 16–18px (small: 6px × 12px, 12px text).

- _Primary:_ hot-pink fill, void text. Hover darkens to #ff2bb5 and adds a pink glow; no RGB split on filled buttons.
- _Secondary (default):_ transparent with a hot-pink border and paper text. Hover turns the text pink and applies the RGB split. The background never changes on hover.
- _Ghost:_ lilac-grey border, lavender text; hover goes cyan.
- _Danger:_ red border and text, **UPPERCASE** with 0.05em tracking (`DELETE FOREVER`). Hover fills red with paper text.
- _Pill:_ the secondary style with a 999px radius, 8px × 16px padding and 13px text, for filters.
- _Press:_ scale to 0.97 and snap back, with no colour shift. _Disabled:_ 40% opacity, `cursor: not-allowed`, and a `(no.)` suffix on the label where it fits.

**Cards / tiles:** #14082e fill, 1px #2a1656 border, 2px radius, inset top edge, 16–22px padding. Title in VT323 26–32px, description in Inter 13–13.5px secondary text, optional mono ID or year pinned top-right at 10px. Hover changes only the border to hot pink, with no movement.

**Tags and badges:** JetBrains Mono 10–11px, UPPERCASE, 0.08em tracking, 1px border in the same colour as the text, padding 2–4px × 8–10px. Variants: default (lilac-grey), hot, cool, warn, ok, error. Status badges lead with a 6px glowing dot in `currentColor`.

**Inputs:** #14082e fill, 1px #8b7aa8 border, square, 10px × 12px padding, Inter 14px. Placeholder in tertiary text. Labels sit above in mono 10–11px UPPERCASE. Focus: border and 2px outline (2px offset) go cyan with a cyan glow. Checkboxes use `accent-color: #ff71ce`.

**Status bar / marquee / side rail:** see Layout. Mono 11px UPPERCASE with 0.08em tracking in tertiary text; the brand in the status bar is VT323 16px. Marquee items can be coloured hot, cool or pop. Side-rail buttons are 40px squares; hover gives a pink border and RGB split, active gives a pink border on #1d0d3d.

**Console / code block:** #08011a fill, 1px #2a1656 border, JetBrains Mono 12–13px at line height 1.6–1.7 in cyan. Prompts are hot pink, warnings lemon, errors danger red, muted lines tertiary. Inline code: cyan mono on #14082e with a 1px hairline and 1px × 6px padding.

**Command palette (⌘K):** 640px wide, #14082e fill, 2px hot-pink border, strong pink glow, over the blurred modal backdrop. The input is VT323 24px. Rows are Inter 14px; hover and active rows go to #1d0d3d. Section headers and key hints are mono 10–11px.

**Tabs:** mono 11px UPPERCASE. The active tab joins the page background, gains hairline sides, and carries a 2px hot-pink bar on its top edge.

**Blog prose:** body Inter 17px / 1.65 in secondary text, max 680px. `h2` in VT323 44px. Blockquotes have a 2px hot-pink left rule with VT323 28px paper text. Links are cyan and underlined with a 3px offset, going hot pink on hover. Post lists are a three-column grid (date · title and description · read time) separated by hairlines; hovering a row RGB-splits its title.

**Iconography:** line icons (Lucide, 1.5px stroke, 16 or 20px) for UI chrome; custom pixel sprites (16 or 32px) for the brand mark, status, loaders and terminal glyphs; unicode geometry as first-class bullets and dividers in lilac or cyan. Never put a line icon and a pixel icon in the same row. Marketing pages never use icon-only buttons.

**Motion:** 80ms (fast), 160ms (base), 320ms (slow). Easing is a hard snap, `cubic-bezier(0.2, 0.9, 0.2, 1)`, or no easing at all. Hover glitch: RGB split plus a 60ms, two-step, 1px translate jitter, only on `:hover` and never on `:focus`. Key surfaces cold-start with a roughly one-second typewriter boot log. No bounce, no spring, no overshoot.

**Imagery:** cool, slightly desaturated, with VHS artefacts (chroma bleed, scan distortion, noise), like PS1-era renders, low-res webcam stills or scanned manuals. With no real photograph, use a placeholder card bearing the wordmark and `[ image: placeholder ]`. Never AI-generate decorative imagery.

## Do's and Don'ts

- Do write every label, button and heading in lowercase, and save ALL CAPS for errors, threats and destructive actions.
- Do layer scanlines and grain over every full surface.
- Do use VT323 only at weight 400, and give wrapping VT323 headings a line height of 1.18 or more.
- Do use the `--fg-*`, `--bg-*` and `--accent-*` CSS variables rather than raw hex, raw px or unlisted fonts (the project lint rules flag all three).
- Do show focus with the 2px cyan outline and glow. It is meant to be visible and slightly ugly.
- Do keep hot pink for the main action and danger red strictly for destruction.
- Don't use emoji. Not one. Kaomoji and unicode geometry only.
- Don't use soft drop shadows, decorative gradients or glassmorphism cards.
- Don't round anything except cards (2px), small chips (4px) and pills (999px).
- Don't change a button's background on hover (filled primary and danger are the only exceptions); change the text effect instead.
- Don't use pure black (#000000) or pure white (#ffffff).
- Don't say "we", "users" or "valued anything". The system is i, the reader is you.
- Don't let the blog take over the personal site; it is one section among home, now and projects.
- Don't overdo the fourth-wall jokes. More than one per screen turns into a quirky brand voice, and that kills it.
