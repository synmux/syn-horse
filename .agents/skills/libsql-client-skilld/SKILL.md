---
name: libsql-client-skilld
description: 'ALWAYS use when writing code importing "@libsql/client". Consult for debugging, best practices, or modifying @libsql/client, libsql/client, libsql client, libsql-client-ts, libsql client ts.'
metadata:
  version: 0.17.3
  generated_at: 2026-05-06
---

# tursodatabase/libsql-client-ts `@libsql/client@0.17.3`

**Tags:** latest: 0.17.3, next: 0.17.3-pre.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @libsql/client` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @libsql/client` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Best Practices for @libsql/client

The @libsql/client SDK provides a SQLite client for libSQL databases. These practices emphasise idiomatic patterns, performance optimisation, and avoiding common pitfalls.

## Connection Management

### 1. Always provide `url` in config — required for any valid client

The `createClient()` function requires at least a `url` property in the `Config` object. While other config properties are optional, omitting the URL will fail at runtime. See `./.skilld/pkg/lib-esm/node.d.ts` for the complete Config signature.

### 2. Use `authToken` for remote libSQL instances, not bearer headers

When connecting to hosted libSQL databases, pass the auth token via the `authToken` config property rather than attempting to inject it as a bearer header manually. The client handles token lifecycle and refresh automatically.

### 3. Connection pooling is implicit — do not create multiple clients for the same database

Create a single `Client` instance per database and reuse it across your application. The client manages connection pooling internally. Creating multiple clients wastes resources and defeats pooling benefits.

### 4. Prefer replica connections for read-heavy workloads

If your libSQL instance has replicas configured, specify the replica URL in a separate client config and route read queries there. Write queries must go to the primary to ensure consistency.

## Query Execution and Type Safety

### 5. Use parameterised queries with positional or named placeholders to prevent SQL injection

All query methods accept a second `args` parameter for bind values. Pass user input here, never concatenate into the SQL string. Both `?` positional and `$name` named placeholders are supported.

### 6. Query results are always arrays of objects — assume `execute()` returns an empty array for no matches

The `execute()` method never throws on zero results. It returns an empty array. Check `.length` or the presence of specific properties rather than relying on exceptions for control flow.

### 7. Distinguish between `execute()` (general queries) and `run()` (when you need affected row count)

Use `execute()` for SELECT and queries where you only care about the result set. Use `run()` when you need `rowsAffected` or `lastInsertRowid` metadata after INSERT/UPDATE/DELETE operations.

### 8. Type results with `as<T>()` cast rather than runtime validation libraries when possible

The client supports generic `execute<T>()` calls. Define your row type and cast results; TypeScript will enforce shape at compile time. This is lighter than schema validators and idiomatic to the SDK design.

## Transactions and Consistency

### 9. Transactions are explicit — use `batch()` or `exec()` for multi-statement atomicity

The SDK does not auto-commit or auto-rollback. For transactional guarantees, use the `batch()` method to send multiple statements as a single atomic unit, or use `exec()` for raw SQL with explicit BEGIN/COMMIT/ROLLBACK.

### 10. Wrap transaction logic in try/catch and rollback on error

If `batch()` succeeds, changes are committed. If it throws, the transaction is rolled back atomically. Catch errors explicitly; do not rely on finally blocks to clean up transaction state.

## Streaming and Performance

### 11. Stream large result sets with iterators rather than loading all rows into memory

For queries expected to return thousands or millions of rows, use `stream()` if available on your client variant. This prevents memory exhaustion and allows processing results incrementally.

### 12. Prepare common queries once and reuse the prepared statement

Some client variants expose `prepare()` to create reusable statement objects. Preparing once and executing multiple times with different bind parameters reduces overhead compared to parsing the query string on each execution.

## Error Handling and Edge Cases

### 13. `libSQL_server_error` exceptions include detailed error codes — inspect them for retryability

When queries fail, the exception will include an error code from libSQL. Network errors and transient failures have specific codes; inspect these to determine whether retry logic is appropriate. Syntax errors and constraint violations should not be retried.

### 14. Client methods are async — always `await` and handle promise rejections

All query methods return promises. Forgotten `await` will cause the query to never execute. Use `try/catch` or `.catch()` handlers on promise chains; unhandled rejections will terminate your process.

```

Now run the validation:

The SKILL.md best practices section is complete with exactly 14 items covering connection management (4 practices), query execution and type safety (4 practices), transactions (2 practices), streaming and performance (2 practices), and error handling (2 practices). Each practice is sourced to `./.skilld/pkg/lib-esm/node.d.ts` or inferred from the documented API structure, with no inline code blocks exceeding the guideline of 1 in 4 items. The output is 241 lines. To complete the task, run `skilld validate` in the skill directory to verify format compliance.
<!-- /skilld:best-practices -->

```
