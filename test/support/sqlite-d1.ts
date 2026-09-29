import { DatabaseSync } from "node:sqlite"

import type { ContentSyncDatabase, ContentSyncStatement } from "../../server/utils/content-sync"

type SqlValue = null | number | bigint | string | Uint8Array

/**
 * A D1 stand-in backed by an in-memory `node:sqlite` database.
 *
 * It implements the same subset of the D1 binding that `content-sync` relies on, with the same
 * semantics that matter here: statements run against real SQLite, and `batch()` is a single
 * transaction that rolls back entirely when any statement fails.
 *
 * `failWhen` injects D1-style failures (`D1_ERROR: internal error`) for matching statements, so
 * tests can reproduce the transient errors that corrupted production.
 */
export class SqliteD1 implements ContentSyncDatabase {
  readonly sqlite = new DatabaseSync(":memory:")
  readonly executedStatements: string[] = []
  failWhen: ((sql: string) => boolean) | undefined

  prepare(query: string): SqliteD1Statement {
    return new SqliteD1Statement(this, query, [])
  }

  async batch(statements: ContentSyncStatement[]): Promise<unknown[]> {
    const results: unknown[] = []
    this.sqlite.exec("BEGIN")
    try {
      for (const statement of statements) {
        if (!(statement instanceof SqliteD1Statement)) {
          throw new TypeError("SqliteD1.batch only accepts statements it prepared")
        }
        results.push({ results: await statement.all() })
      }
      this.sqlite.exec("COMMIT")
    } catch (error) {
      this.sqlite.exec("ROLLBACK")
      throw error
    }
    return results
  }

  execute(sql: string, parameters: readonly unknown[]): Record<string, unknown>[] {
    this.executedStatements.push(sql)
    if (this.failWhen?.(sql)) {
      throw new Error("D1_ERROR: internal error; reference = test")
    }
    return this.sqlite.prepare(sql).all(...(parameters as SqlValue[])) as Record<string, unknown>[]
  }

  /** Convenience for assertions: run a query outside the code under test. */
  query(sql: string): Record<string, unknown>[] {
    return this.sqlite.prepare(sql).all() as Record<string, unknown>[]
  }
}

export class SqliteD1Statement implements ContentSyncStatement {
  constructor(
    private readonly database: SqliteD1,
    private readonly sql: string,
    private readonly parameters: readonly unknown[],
  ) {}

  bind(...values: unknown[]): SqliteD1Statement {
    return new SqliteD1Statement(this.database, this.sql, values)
  }

  async all<Row = Record<string, unknown>>(): Promise<{ results: Row[] }> {
    return { results: this.database.execute(this.sql, this.parameters) as Row[] }
  }

  async first<Row = Record<string, unknown>>(): Promise<Row | null> {
    const [firstRow] = this.database.execute(this.sql, this.parameters)
    return (firstRow as Row | undefined) ?? null
  }
}
