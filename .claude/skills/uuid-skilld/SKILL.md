---
name: uuid-skilld
description: 'ALWAYS use when writing code importing "uuid". Consult for debugging, best practices, or modifying uuid.'
metadata:
  version: 14.0.0
  generated_at: 2026-05-06
---

# uuidjs/uuid `uuid@14.0.0`

**Tags:** latest: 14.0.0, legacy-13: 13.0.2, legacy-12: 12.0.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p uuid` instead of grepping `.skilld/` directories. Run `skilld search --guide -p uuid` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## UUID v14.0.0 Best Practices

## Overview

The `uuid` package implements RFC9562 UUID generation and manipulation with support for multiple UUID versions and utility functions. This guide provides 14 evidence-based best practices for working with UUIDs in modern applications.

## Best Practices

1. **Use v4 for unstructured random UUIDs** — When you need a random identifier without any structural meaning or namespace, generate v4 UUIDs using the cryptographically secure `v4()` function. This is the most commonly recommended UUID version for general-purpose identification. RFC9562 Section 6.4

2. **Use v5 for deterministic namespace-based UUIDs** — Generate reproducible UUIDs from a namespace and name using the `v5()` function with SHA-1 hashing. Choose v5 over v3 in new applications for better collision resistance. RFC9562 Section 6.5

3. **Always validate before processing** — Call the `validate()` function on incoming UUID strings to ensure correctness before using them in application logic. Invalid UUIDs can silently cause downstream errors. Package docs

4. **Prefer v7 for new timestamp-based applications** — The v7 UUID version combines Unix timestamps with random data for sortable, time-ordered identifiers. Use `v7()` for database primary keys and other ordered identifiers in new projects. RFC9562 Section 6.7

5. **Convert legacy v1 identifiers using v1ToV6** — When working with systems using v1 UUIDs, convert them to v6 format with the `v1ToV6()` function for improved sortability while preserving the underlying timestamp data. Package docs

6. **Use parse/stringify for format conversion** — Convert between string and binary representations using `parse()` and `stringify()` functions. Always use these utilities rather than manual string manipulation to avoid encoding errors. Package docs

7. **Use v6 for backward-compatible sortable identifiers** — The v6 UUID version reorders v1 timestamp bits to create sortable identifiers compatible with RFC9562. Use `v6()` when you need sortability but must remain RFC-compliant. RFC9562 Section 6.6

8. **Call version() to identify UUID variants** — Use the `version()` function to determine which UUID version was used to generate a given identifier. This is essential when processing UUIDs from external systems. Package docs

9. **Avoid v1 in new applications** — Version 1 UUIDs contain MAC address information and rely on monotonic timestamps. For new development, prefer v6, v7, or v4 depending on your sortability requirements. v1 exists only for backward compatibility. RFC9562 Section 6.1

10. **Use v3 only when SHA-1 compatibility is required** — The v3 UUID version uses MD5 hashing for deterministic namespace-based generation. Only use `v3()` when interoperating with systems that explicitly require MD5-based UUIDs; prefer v5 otherwise. RFC9562 Section 6.3

11. **Leverage v6ToV1 for reverse conversion** — When you need to recover v1 timestamp information from a v6 UUID, use the `v6ToV1()` function. This enables safe conversion between the two time-based formats. Package docs

12. **Reference NIL and MAX constants for boundary operations** — The `NIL` and `MAX` constants represent the minimum and maximum possible UUID values. Use these for range queries, sorting comparisons, or special sentinel values in your application logic. RFC9562 Section 6.2.6

13. **Specify namespaces explicitly for deterministic generation** — When using `v3()` or `v5()` for namespace-based UUIDs, always pass the namespace parameter explicitly rather than relying on defaults. Document which namespace your application uses to enable coordination with other systems. Package docs

14. **Understand sortability trade-offs when choosing versions** — Versions 1, 6, and 7 produce time-ordered, sortable UUIDs suitable for database primary keys. Versions 3, 4, and 5 are not sortable. Choose based on whether your application requires efficient range queries or index ordering. RFC9562 Introduction

## Conclusion

The uuid library provides a comprehensive suite of RFC9562-compliant functions for generating and manipulating UUIDs. Select the appropriate UUID version based on your requirements for randomness, determinism, and sortability, and use the utility functions to safely convert between representations.

<!-- /skilld:best-practices -->
