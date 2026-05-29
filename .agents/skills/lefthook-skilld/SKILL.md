---
name: lefthook-skilld
description: "ALWAYS use when writing code importing \"lefthook\". Consult for debugging, best practices, or modifying lefthook."
metadata:
  version: 2.1.9
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# evilmartians/lefthook `lefthook@2.1.9`
**Tags:** latest: 2.1.9

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p lefthook` instead of grepping `.skilld/` directories. Run `skilld search --guide -p lefthook` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `exclude` option no longer accepts regexp, only globs. [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L185)
- BREAKING: `skip_output` option is dropped, use `output` instead. [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L186)
- BREAKING: CLI arguments changed names for consistency (refer `lefthook run -h` for details). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L187)
- BREAKING: `only` and `skip` options with `- run: '...'` now use Bourne Shell. [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L189)
- BREAKING: `sh` as command executor on Windows (v2.0.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L192)
- BREAKING: drop support for `exclude regexp` (v2.0.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L193)
- BREAKING: drop deprecated `skip_output` option (v2.0.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L194)
- BREAKING: CLI framework changed (v2.0.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L195)
- NEW: `installing non-git hooks` allowed (v2.1.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L306)
- NEW: `check core.hooksPath` during `lefthook install` (v2.1.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L305)
- NEW: `setup hook option` introduced (v2.1.2). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L329)
- NEW: `jsonc support` added (v2.0.14). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L377)
- NEW: `ability to show diff when failing on changes` (v2.0.12). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L397)
- NEW: `refetch and cleanup on ref change` (v2.0.11). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L407)
- NEW: `more rudimentary shell completions` (v2.0.11). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L409)
- NEW: `no_auto_install` added to `lefthook.yml` (v2.0.10). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L415)
- BREAKING: `restructure files and folders`, remove deprecated options (v1.12.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L503)
- BREAKING: `replace viper with koanf` (v1.9.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L459)
- BREAKING: `don't auto-install lefthook with npx if not found` (v1.8.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L491)
- BREAKING: `execute files command within configured root` (v1.8.0). [source](./.skilld/repos/evilmartians/lefthook/releases/CHANGELOG.md:L492)

**Also changed:** `add timeout argument` (v2.0.16) · `add optional args to scripts` (v2.0.5) · `add optional standard glob matcher (doublestar)` (v2.0.4) · `fail_on_changes non-ci option` (v2.0.3) · `add $schema property` (v1.10.11) · `add custom plain templates` (v1.10.8) · `add schema.json to npm packages` (v1.10.7) · `add lefthook option for custom path or command` (v1.10.5) · `add validate command` (v1.10.2) · `inherit exclude option in groups` (v1.10.2) · `add ability to specify job names for command run` (v1.10.1) · `add jobs option` (v1.10.0) · `add option to skip running LFS hooks` (v1.8.5) · `add refetch_frequency parameter to settings` (v1.8.2) · `add skip option merge-commit` (v1.7.22) · `maintain Python package` (v1.7.21) · `add self-update command` (v1.7.6) · `use glob in exclude array` (v1.7.5) · `allow list of files in exclude option` (v1.7.3) · `add file type filters` (v1.6.10) · `add priorities to scripts` (v1.6.8) · `Add output setting` (v1.6.6) · `use configurable path to lefthook (LEFTHOOK_BIN)` (v1.6.6) · `add remotes and configs options` (v1.6.0) · `add replaces to all template and parse files from stdin` (v1.6.0) · `add priorities to commands` (v1.5.5) · `add force flag to run command` (v1.5.1) · `initial support for Swift Plugins` (v1.5.1) · `add interrupt (Ctrl-C) handling` (v1.5.0) · `add use_stdin option` (v1.4.11) · `add files, all-files, and commands flags` (v1.4.9) · `add assert_lefthook_installed option` (v1.4.8) · `support .lefthook.yml and .lefthook-local.yml` (v1.4.6) · `support toml dumpint` (v1.4.2) · `support json configs` (v1.4.2) · `allow dumping with JSON` (v1.4.1) · `add skip execution_info option` (v1.4.1) · `add adaptive colors` (v1.4.0) · `add dump command` (v1.4.0) · `add only option` (v1.3.13) · `add execution_out to skip output settings` (v1.3.11) · `implitic skip on missing files for pre-commit and pre-push hooks` (v1.3.6) · `add stage_fixed option` (v1.3.5) · `Skip unstaged changes for pre-commit hook` (v1.3.0) · `Allow following output` (v1.2.6) · `Add an option to disable spinner` (v1.2.5) · `Use pnpm before npx` (v1.2.5) · `Allow providing rc file` (v1.2.4) · `Expand env variables` (v1.2.3) · `Skip based on branch name and allow global skip rules` (v1.2.2) · `Add remote config support` (v1.2.0) · `Add LEFTHOOK_VERBOSE env` (v1.1.4) · `Allow setting env vars` (v1.1.3) · `Show current running command and script name(s)` (v1.1.3) · `Exclude by command names too` (v1.1.3) · `Pass stdin by default` (v1.1.2) · `Allow suppressing execution output` (v1.1.0) · `Add support for Git LFS` (v1.1.0) · `Add fail text option` (v1.1.0).
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Configure `refetch_frequency` for remotes with mutable references to ensure up-to-date configurations, using a frequency appropriate for the project, rather than relying on `never` or not setting it. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/refetch_frequency.md#refetch_frequency)

- Avoid setting both `follow: true` and `parallel: true` for commands or hooks, as this can lead to messy and unreadable output. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/follow.md#follow:L12:14)

- When a command or script requires user interaction, explicitly set `interactive: true` to ensure Lefthook connects to the TTY and forwards stdin/stdout, enabling proper user input. [source](./.skilld/references/lefthook@2.1.9/docs/usage/features/interactive.md#using-an-interactive-command-or-script)

- When a command or script needs to read data from stdin (e.g., from Git for `pre-push` hooks), explicitly set `use_stdin: true` to ensure the data is correctly piped. [source](./.skilld/references/lefthook@2.1.9/docs/usage/features/pass-stdin.md#pass-stdin-to-a-command-or-script)

- Utilize `lefthook-local.yml` for local-only overrides and extensions of your main `lefthook.yml` configuration, and add it to `.gitignore` to prevent committing local-specific changes. [source](./.skilld/references/lefthook@2.1.9/docs/examples/lefthook-local.md#lefthook-local.yml)

- For monorepos with multiple independent projects, centralize hook configurations in the root `lefthook.yml` by extending project-specific `lefthook.yml` files, and use the `root` option within jobs or groups to define the working directory for project-specific commands. [source](./.skilld/repos/evilmartians/lefthook/discussions/discussion-1078.md#accepted-answer)

- To ensure a Git commit fails if any individual command within a parallel execution fails, organize your commands into `jobs` within a `group`. The `group` will collectively fail if any of its `jobs` do, preventing the commit. [source](./.skilld/repos/evilmartians/lefthook/discussions/discussion-961.md#accepted-answer)

- To execute platform-specific scripts, use the `only` option within a job, conditionally running a simple command (e.g., `uname` for Unix-like systems or `cmd /c ver` for Windows) to detect the operating system and then run the appropriate script. [source](./.skilld/repos/evilmartians/lefthook/discussions/discussion-999.md#accepted-answer)

- To ensure a hook fails if files are modified during its execution, especially when using auto-fixing linters, configure `fail_on_changes: ci` for CI environments to enforce clean states while maintaining a smoother local developer experience, and use a grouped job with `git diff --exit-code` after all other potential file-modifying jobs for local checks. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/fail_on_changes.md#fail_on_changes) and [source](./.skilld/repos/evilmartians/lefthook/discussions/discussion-954.md#accepted-answer)

- To prevent Lefthook from automatically installing or synchronizing Git hooks (e.g., in CI environments or for developers who prefer manual control), set `no_auto_install: true` in your `lefthook.yml`. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/no_auto_install.md#no_auto_install)

- When using the `lefthook` NPM package in a CI environment, ensure `CI=true` is set during package installation (`npm install`, `yarn install`, `pnpm install`) to prevent automatic installation of Git hooks via postinstall scripts, unless you specifically intend to override this behavior with `LEFTHOOK=true`. [source](./.skilld/references/lefthook@2.1.9/docs/usage/envs/CI.md#ci)

- To mitigate slow startup times in projects utilizing Git LFS, especially if LFS hooks are not critical for your specific `lefthook` configuration, consider setting `skip_lfs: true` in your `lefthook.yml`. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/skip_lfs.md#skip_lfs) and [source](./.skilld/repos/evilmartians/lefthook/discussions/discussion-939.md#slow-startup-time-because-of-git-lfs)

- To reduce redundancy in command definitions and facilitate local overrides, utilize the `templates` configuration option. Define reusable command snippets or wrappers that can be referenced in `run` values, allowing for cleaner configurations and easy customization via `lefthook-local.yml`. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/templates.md#templates)

- When defining scripts within Lefthook, explicitly specify a `runner` for each script. This ensures the script is executed correctly with the appropriate interpreter or command (e.g., `node` for JavaScript, `go run` for Go), providing clarity and preventing execution issues. [source](./.skilld/references/lefthook@2.1.9/docs/configuration/runner.md#runner)
<!-- /skilld:best-practices -->
