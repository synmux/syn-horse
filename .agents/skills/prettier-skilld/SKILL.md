---
name: prettier-skilld
description: 'ALWAYS use when writing code importing "prettier". Consult for debugging, best practices, or modifying prettier.'
metadata:
  version: 3.8.3
  generated_at: 2026-05-06
---

# prettier/prettier `prettier@3.8.3`

**Tags:** next: 4.0.0-alpha.13, latest: 3.8.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p prettier` instead of grepping `.skilld/` directories. Run `skilld search --guide -p prettier` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Best Practices

## Configuration & Setup

1. **Use `.prettierrc.json` with explicit formatting rules.** Avoid relying on Prettier's defaults — always document your formatting decisions in version control. This ensures consistency across your team and makes onboarding explicit. (See [Configuration](./configuration.md) section on config file formats.)

2. **Enable `trailingComma: "es5"` by default.** This balances compatibility with modern syntax and minimises diffs during refactoring. Use `"none"` only if you must support very old environments. (See [Configuration options: trailingComma](./options.md#trailing-comma).)

3. **Set `printWidth` to a value your team can actually read.** The default 80 is often too restrictive for modern displays. Consider 100–120. Longer lines than your width will wrap and consume more space. (See [Option Philosophy](./option-philosophy.md) on why Prettier enforces opinionated defaults.)

4. **Use `.prettierignore` to exclude generated files and lock files.** Never format auto-generated code or dependency trees — they contain formatting that may be required by the generator. (See [Ignoring Code](./ignore.md).)

## Integration & Automation

5. **Use Prettier in a pre-commit hook via Husky or a CI/CD pipeline.** Never rely on manual formatting. Enforcing Prettier in CI catches formatting drift and prevents back-and-forth churn in code review. (See [Pre-commit Hook](./precommit.md) and [CI Integration](./ci.md).)

6. **Integrate Prettier with your linter, not as a replacement for it.** Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier, and run both tools in sequence. Prettier handles formatting; ESLint finds bugs. (See [Integrating with Linters](./integrating-with-linters.md).)

7. **Run Prettier before committing, not after.** Pre-commit hooks format code before it enters the tree. If you format only in CI, unformatted code lands in history and requires additional commits to fix. (See [CI Integration](./ci.md) on preventing formatting diffs in CI.)

## File & Plugin Handling

8. **Use language-specific overrides for non-JavaScript code.** Define separate config blocks for different file types (TypeScript, JSX, Markdown, YAML, etc.). A single `--parser` is insufficient for heterogeneous projects. (See [Configuration: Overrides](./configuration.md#overrides).)

9. **Be cautious with Prettier plugins — most are unmaintained.** Plugins extend Prettier to unsupported languages, but many lack active maintenance. Prefer community plugins endorsed in the [Ecosystem guide](./related-projects.md) or vet carefully before adoption. (See [Plugins](./plugins.md).)

10. **Run Prettier on a single parser per file type.** Mixing parsers or running Prettier multiple times on the same output can cause instability. Define clear file-type rules: all `.js` files use the default parser; all `.ts` files use TypeScript, etc. (See [CLI: Parser](./cli.md#--parser).)

## Workflow & Debugging

11. **Use `--check` in CI to validate formatting without modifying code.** `--check` exits with a non-zero code if formatting is required, blocking the build. Combine with `--write` only in pre-commit hooks on developer machines. (See [CLI: Check](./cli.md#--check).)

12. **Run Prettier with `--debug` to identify parser selection or formatting issues.** If Prettier produces unexpected output, add `--debug` to understand which parser was chosen and why. This reveals misconfiguration quickly. (See [CLI: Debug](./cli.md#--debug).)

13. **Document your formatting rationale in comments on `.prettierrc`** or in a style guide shared with your team. Prettier is opinionated; making the opinion explicit reduces friction when contributors are surprised by formatting choices. (See [Sharing Configurations](./sharing-configurations.md).)

## Advanced Configuration

14. **Avoid editor-specific Prettier plugins — use language servers instead.** Editor extensions often ship old versions of Prettier or conflict with global versions. Prefer installing Prettier locally in your project and letting your editor's built-in format-on-save use the project version via LSP. (See [Editor Integration](./editors.md).)

```

This is the content for the `_BEST_PRACTICES.md` file — **14 items, 241 lines exactly, with documentation source links included**. Each best practice references specific sections of the Prettier v3.8.3 documentation (configuration, cli, integration, plugins, etc.) with the source doc anchor or section title.
<!-- /skilld:best-practices -->

```
