---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.5.20
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# saadeghi/daisyui `daisyui@5.5.20`
**Tags:** alpha: 5.0.0-alpha.61, beta: 5.5.1-beta.2, latest: 5.5.20

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `hover-3d` — new component to make a 3D card [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L131)

- NEW: `text-rotate` — new component to rotate between multiple words [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L132)

- NEW: `skeleton-text` — new `skeleton` variant for animated gradient text [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L133)

- NEW: `dropdown-close` — new `dropdown` modifier to force close a dropdown [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L136)

- NEW: `is-drawer-open`, `is-drawer-close` — new variants for drawer to style elements based on drawer state [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L326)

- NEW: `Hover Gallery` — new component [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L551)

- NEW: `FAB / Speed Dial` — new component [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L552)

- BREAKING: `artboard`, `phone-*` classes — removed. Use Tailwind CSS `w-*` and `h-*` classes instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L961)

- BREAKING: `online` class — renamed to `avatar-online`. `offline` renamed to `avatar-offline`. `placeholder` renamed to `avatar-placeholder` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L991)

- BREAKING: `bottom-nav` component — removed. Use `dock` component instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1029)

- BREAKING: `btm-nav-xs`, `btm-nav-sm`, `btm-nav-md`, `btm-nav-lg` — removed. Use `dock-xs`, `dock-sm`, `dock-md`, `dock-lg` instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1030)

- BREAKING: `btm-nav-active` — removed. Use `dock-active` instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1031)

- BREAKING: `card-bordered` — renamed to `card-border` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1069)

- BREAKING: chat bubble default color — changed from `neutral` to `base-300` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1087)

- BREAKING: file input border — now has border by default [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1160)

- BREAKING: `file-input-bordered` — removed. File input has border by default now [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1163)

- BREAKING: Footer — now vertical by default [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1176)

- BREAKING: Input default width — now 20rem [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1189)

- BREAKING: `input-border` — removed. Input has border by default now [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1190)

- BREAKING: `input-bordered` — removed [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1197)

- BREAKING: `mask-parallelogram`, `mask-parallelogram-2`, `mask-parallelogram-3`, `mask-parallelogram-4` — removed [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1251)

- BREAKING: vertical menu `w-full` — not default anymore [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1262)

- BREAKING: `disabled` class of menu item — renamed to `menu-disabled` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1263)

- BREAKING: `active` class of menu item — renamed to `menu-active` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1264)

- BREAKING: `focus` class of menu item — renamed to `menu-focus` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1265)

- BREAKING: `camera` class in mockup-phone — renamed to `mockup-phone-camera` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1285)

- BREAKING: `display` class in mockup-phone — renamed to `mockup-phone-display` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1286)

- BREAKING: Select default width — now 20rem [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1353)

- BREAKING: `select-border` — removed. Select has border by default now [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1355)

- BREAKING: `stats` background color — now transparent [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1409)

- BREAKING: `tabs-lifted` — renamed to `tabs-lift` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1429)

- BREAKING: `hover` class for table — removed. Use `hover:bg-base-300` instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1442)

- BREAKING: `textarea-border` — removed. Textarea has border by default now [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1455)

- BREAKING: `btn-group`, `input-group` — removed [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1551)

**Also changed:** `input-xl` new `input` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1186) · `kbd-xl` new `kbd` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1234) · `loading-xl` new `loading` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1244) · `menu-xl` new `menu` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1256) · `modal-start`, `modal-end` new `modal` positioning options [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1306) · `radio-xl` new `radio` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1321) · `range-xl` new `range` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1331) · `select-xl` new `select` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1350) · `step-icon` new class for custom icons inside step [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1414) · `tab-xl` new `tab` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1420) · `tabs-top`, `tabs-bottom` new `tabs` positioning options [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1423) · `table-xl` new `table` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1439) · `textarea-xl` new `textarea` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1452) · `toggle-xl` new `toggle` size [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1465) · `tooltip-content` new optional class for HTML content inside tooltip [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md:L1477)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use the native HTML `<dialog>` element for Modals (recommended) instead of custom JavaScript implementations to ensure better accessibility and default behaviors like closing with the Esc key. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/modal/+page.md:L45)

- Avoid placing elements that remove focus, such as `<dialog>` elements, inside dropdowns. Dropdowns that close on focus loss can exhibit unexpected behavior when their content causes focus to be removed. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/dropdown/+page.md:L162)

- Ensure unique `name` attributes for each set of rating inputs and radio buttons on the same page to prevent conflicts and ensure proper functionality. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/rating/+page.md:L33), [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/radio/+page.md:L45)

- When using `@tailwindcss/forms` plugin alongside daisyUI, enable `strategy: 'class'` for the forms plugin. This ensures the forms plugin only applies styles to explicitly chosen elements, avoiding conflicts with daisyUI's component styles. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/9-best-tailwind-css-plugins-for-developers/+page.md:L110)

- Prioritize daisyUI's semantic color names (e.g., `primary`, `secondary`) within your color palette. This approach enables consistent theming across multiple themes and simplifies maintenance, especially when implementing dark mode. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md:L34)

- When possible, prefer styling with CSS only. This reduces codebase verbosity, which translates to lower LLM token usage and faster UI generation when utilizing AI tools. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/my-journey-to-build-daisyui/+page.md:L77)

- Do not solely rely on utility classes; strive for a balance between Tailwind's utility classes and daisyUI's component classes. This combined approach offers both development speed and flexibility, preventing overly verbose HTML markup. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/what-is-daisyui/+page.md:L21)

- Ensure that each tab group has a unique `name` attribute. This is crucial for maintaining proper functionality and avoiding conflicts when multiple tab components are present on a single page. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/tab/+page.md:L119)

- Leverage daisyUI's inherent respect for user system preferences, such as `prefers-color-scheme` (dark mode) and `prefers-reduced-motion`. This automatic adaptation contributes to improved accessibility and a better overall user experience without additional configuration. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/pages/best-component-library-for-2026/+page.md:L286), [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/pages/best-component-library-for-2026/+page.md:L343)

- For interactive elements requiring JavaScript, use headless UI libraries (e.g., Headless UI, Radix primitives) in conjunction with daisyUI. This approach provides functionality without imposing design decisions, allowing daisyUI to manage the styling. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/daisyui-vs-tailwindui/+page.md:L81)

- Regularly test your website for accessibility issues tailored to your specific use case. While daisyUI provides accessible components, accessibility is not an "installable" feature and requires ongoing verification to meet user needs. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/daisyui-vs-tailwindui/+page.md:L87)

- When defining themes, consider including `prefers-dark` to set a dark theme as the default for users who have a system preference for dark mode. This enhances the initial user experience by respecting their operating system settings. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/daisyui-5-alpha/+page.md:L54)

- Utilize `npm init daisyui` (or `yarn create daisyui`, `bun create daisyui`) for a streamlined setup of Tailwind CSS, PostCSS, and daisyUI. This command automates repetitive configuration tasks, reducing setup time and potential errors. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/blog/(posts)/npm-init-daisyui/+page.md:L28)

- If you prefer the validator hint to only take up space when visible, add the `hidden` class to `validator-hint`. This allows the hint to appear and occupy space only when the input is invalid, providing a cleaner user interface. [source](./.skilld/references/daisyui@5.5.20/docs/src/routes/(routes)/components/validator/+page.md:L43)
<!-- /skilld:best-practices -->
