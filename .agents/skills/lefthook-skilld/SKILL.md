---
name: lefthook-skilld
description: "ALWAYS use when writing code importing \"lefthook\". Consult for debugging, best practices, or modifying lefthook."
metadata:
  version: 2.1.10
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# evilmartians/lefthook `lefthook@2.1.10`
**Tags:** latest: 2.1.10

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p lefthook` instead of grepping `.skilld/` directories. Run `skilld search --guide -p lefthook` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for lefthook v2.1.10 — focused on recent major/minor releases.

### Recent Changes (v2.1.x series)

- NEW: `setup` hook option — runs instructions before any job in a hook, introduced in v2.1.2, supports templates and Git args like `run` [source](./.skilld/releases/v2.1.2.md#changelog)

- NEW: `install_non_git_hooks` — ability to install non-git hooks in v2.1.0, expanding lefthook's scope beyond git-managed hooks [source](./.skilld/releases/v2.1.0.md#changelog)

- NEW: `core.hooksPath` detection — v2.1.0 now checks git's `core.hooksPath` setting during `lefthook install` to respect custom hook directories [source](./.skilld/releases/v2.1.0.md#changelog)

- BREAKING: `{lefthook_job_name}` template — removed in v2.1.0 but restored in v2.1.4 due to user feedback; if using pre-v2.1.4, this template is unavailable [source](./.skilld/releases/v2.1.4.md#changelog)

### Major Migration: v2.0.0 Breaking Changes

- BREAKING: `skip_output` option removed — use `output` option instead; old config entries using `skip_output` will fail validation [source](./.skilld/CHANGELOG.md:L182-186)

- BREAKING: `exclude` option glob syntax changed — no longer accepts regular expressions, only glob patterns; regexes in `exclude` will be interpreted as literal globs and may not match intended files [source](./.skilld/CHANGELOG.md:L182-186)

- BREAKING: CLI argument names standardised — some `lefthook run` arguments renamed for consistency; check `lefthook run -h` for the current command-line interface [source](./.skilld/CHANGELOG.md:L182-186)

- BREAKING: `run` shell executor changed for conditional scripts — commands in `only` and `skip` options with `- run: '...'` syntax now use Bourne Shell (sh) instead of the previously configured shell, affecting syntax compatibility [source](./.skilld/CHANGELOG.md:L182-186)

### New Features (v2.0.x series)

- NEW: `timeout` argument — added in v2.0.16 to set command execution timeout limits; allows preventing hooks from hanging indefinitely [source](./.skilld/releases/v2.0.16.md#changelog)

- NEW: `output` option — introduced in v2.0.2+ as the modern replacement for deprecated `skip_output`; controls whether hook output is displayed [source](./.skilld/CHANGELOG.md:L183)

- NEW: JSONC configuration support — v2.0.14 added support for `.jsonc` files (JSON with Comments) in addition to `.yml` and `.json` formats [source](./.skilld/releases/v2.0.14.md#changelog)

- NEW: `file_types` string values — v2.0.16 now accepts `file_types` as a single string (e.g. `file_types: text`) in addition to array format, improving config readability [source](./.skilld/releases/v2.0.16.md#changelog)

- NEW: `no_auto_install` option — v2.0.10 added ability to disable automatic lefthook installation, useful for CI/CD environments where manual control is required [source](./.skilld/releases/v2.0.10.md#changelog)

### Behavioural Changes (Silent Breaking Changes)

- BREAKING: Ghost hook skip optimisation — v2.0.16 silently skips the ghost hook when hooks are already configured, a performance optimisation that changes behaviour for workflows relying on ghost hook side effects [source](./.skilld/releases/v2.0.16.md#changelog)

**Also changed:** `install_non_git_hooks` available · `core.hooksPath` detection · `setup` hook runs before jobs · `{push_files}` template stable · `fail_on_changes` option · `stage_fixed` option · `refetch` option for remotes · `jobs` option
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use named jobs for mergeable configurations across `extends` and `lefthook-local.yml` — unnamed jobs append sequentially and cannot be overridden by local configs, defeating shared workflow intent [source](./.skilld/docs/configuration/jobs.md#example)

- Enable `stage_fixed: true` on lint/format jobs to auto-stage fixed files without manual `git add` calls — requires at least one linter that modifies files in-place [source](./.skilld/docs/configuration/stage_fixed.md)

- Use `parallel: true` for independent linters and checks in the same hook — they share no output and can run concurrently, halving pre-commit latency [source](./.skilld/docs/configuration/parallel.md)

- Use `piped: true` for sequential setup workflows (database migrations, dependency installs) where one step depends on the prior step's completion [source](./.skilld/docs/configuration/piped.md)

- Define `templates` at the hook level to enable local environment overrides without rewriting every job — teams working in Docker can swap wrapper commands via `lefthook-local.yml` [source](./.skilld/docs/configuration/templates.md#reduce-redundancy)

- Skip hooks on merge/rebase states with `skip: merge` and `skip: rebase` rather than disabling the entire pre-commit — prevents lint errors during conflict resolution [source](./.skilld/docs/configuration/skip.md#example)

- Use `exclude_tags` in `lefthook-local.yml` to skip expensive checks locally (full test suite, security scans) while keeping the shared config strict — faster development cycle without drift [source](./.skilld/docs/configuration/exclude_tags.md)

- Filter files precisely with `file_types: text`, `file_types: executable`, and MIME type lists (`text/x-sh`, `text/x-python`) to avoid linting binary or symlink files [source](./.skilld/docs/configuration/file_types.md#example)

- Use `root: directory/` on monorepo jobs to execute commands in the correct working directory and filter staged files by path — globs remain relative to repo root [source](./.skilld/docs/configuration/root.md#example)

- Set `min_version` to block hook installation on older lefthook binaries that lack features your config requires — prevents silent failures on CI systems with stale binaries [source](./.skilld/docs/configuration/min_version.md)

- Share configurations across projects with `remotes` instead of copy-pasting config files — keep jobs independent within the remote config to avoid merge conflicts with local extends [source](./.skilld/docs/configuration/remotes.md)

- Use `setup` instructions to check for and install missing CLI tools before jobs run — avoids 'command not found' failures in fresh environments [source](./.skilld/docs/configuration/setup.md#example)

- Define config merge order explicitly: `lefthook.yml` → `extends` → `remotes` → `lefthook-local.yml`, so local overrides always win [source](./.skilld/docs/configuration/extends.md)

- Add `lefthook-local.yml` to `.gitignore` so developers can override hooks locally (skip expensive checks, run in Docker, use custom CLI tools) without affecting team config [source](./.skilld/docs/examples/lefthook-local.md)
<!-- /skilld:best-practices -->
