---
name: syn-horse-design
description: Use this skill to generate well-branded interfaces and assets for syn.horse — a fictional cyberpunk/glitch-vaporwave shitpost-friendly product. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (colors_and_type.css, assets/, ui_kits/, slides/, preview/).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Critical brand rules to enforce:

- lowercase by default; ALL CAPS for errors and threats
- no emoji (kaomoji + unicode geometry only: ◆ ▶ ✶ ※ ▓ → ←)
- VT323 for headers, Inter for body, JetBrains Mono for code
- always layer scanlines + grain + (optional) vignette on full surfaces
- square corners by default; --radius-1 (2px) for cards; pills only for badges
- never use soft drop shadows — use glow halos and rgb-split text-shadow
- voice "talks to you, never about users"; lovingly threatens; self-aware

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
