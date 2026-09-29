import { describe, expect, it } from "vitest"

import {
  createRevalidationGate,
  decodeContentDump,
  matchContentQueryCollection,
  parseContentDump,
  resolveContentTarget,
  synchroniseContentCollection,
} from "../../server/utils/content-sync"
import type { ContentSyncStatement } from "../../server/utils/content-sync"
import {
  buildFixtureDump,
  currentDump,
  DATABASE_VERSION,
  encodeFixtureDump,
  FIXTURE_POSTS,
  FIXTURE_SLICED_POST,
  fixtureTarget,
} from "../support/content-dump"
import { SqliteD1 } from "../support/sqlite-d1"

const ALL_POST_IDS = [...FIXTURE_POSTS.map((post) => post.id), FIXTURE_SLICED_POST.id].sort()

const postIds = (database: SqliteD1): string[] =>
  database.query("SELECT id FROM _content_blog ORDER BY id").map((row) => String(row.id))

const infoRow = (database: SqliteD1): Record<string, unknown> | undefined =>
  database.query("SELECT version, structureVersion, ready FROM _content_info WHERE id = 'checksum_blog'")[0]

const isWrite = (sql: string): boolean => /^\s*(INSERT|UPDATE|DELETE|DROP|CREATE)\b/i.test(sql)

/** Applies a dump directly, bypassing the code under test, to stage a database state. */
const stageDump = (database: SqliteD1, lines: readonly string[]): void => {
  for (const entry of parseContentDump(lines)) {
    database.sqlite.exec(entry.statement)
  }
}

const synchronise = (database: SqliteD1, dumpLines: readonly string[] = currentDump()) =>
  synchroniseContentCollection({ database, dumpLines, target: fixtureTarget() })

describe("matchContentQueryCollection", () => {
  it("returns the collection for a content query", () => {
    expect(matchContentQueryCollection("POST", "/__nuxt_content/blog/query")).toBe("blog")
  })

  it("ignores other methods and paths, including the dump the sync itself fetches", () => {
    expect(matchContentQueryCollection("GET", "/__nuxt_content/blog/query")).toBeUndefined()
    expect(matchContentQueryCollection("POST", "/__nuxt_content/blog/sql_dump.txt")).toBeUndefined()
    expect(matchContentQueryCollection("POST", "/__nuxt_content/blog/query/extra")).toBeUndefined()
    expect(matchContentQueryCollection("POST", "/blog/query")).toBeUndefined()
  })
})

describe("resolveContentTarget", () => {
  const manifest = {
    checksums: { blog: "v3.5.0--current" },
    checksumsStructure: { blog: "structure-current" },
    tables: { blog: "_content_blog", info: "_content_info" },
  }

  it("builds the target for a known collection", () => {
    expect(resolveContentTarget("blog", manifest)).toEqual({
      collection: "blog",
      collectionTable: "_content_blog",
      infoTable: "_content_info",
      version: "v3.5.0--current",
      structureVersion: "structure-current",
    })
  })

  it("returns nothing for an unknown collection or the checksum table itself", () => {
    expect(resolveContentTarget("notes", manifest)).toBeUndefined()
    expect(resolveContentTarget("info", manifest)).toBeUndefined()
  })
})

describe("decodeContentDump", () => {
  it("decodes the gzipped, base64-encoded JSON served by sql_dump.txt", async () => {
    const lines = currentDump()
    await expect(decodeContentDump(encodeFixtureDump(lines))).resolves.toEqual(lines)
  })

  it("rejects a payload that is not a JSON array of strings", async () => {
    const encoded = encodeFixtureDump(["fine", 42] as unknown as string[])
    await expect(decodeContentDump(encoded)).rejects.toThrow(/array of strings/)
  })

  it("rejects an empty payload rather than treating it as an empty collection", async () => {
    await expect(decodeContentDump("")).rejects.toThrow(/empty/)
  })
})

describe("parseContentDump", () => {
  it("splits on the last ' -- ' so dashes inside content survive", () => {
    const [entry] = parseContentDump([`INSERT INTO t VALUES ('a -- b; c?'); -- hash-1`])
    expect(entry).toEqual({ statement: `INSERT INTO t VALUES ('a -- b; c?');`, tag: "hash-1" })
  })

  it("rejects a line with no tag", () => {
    expect(() => parseContentDump(["SELECT 1;"])).toThrow(/malformed/)
  })
})

describe("synchroniseContentCollection", () => {
  it("builds an empty database from the dump, including sliced rows", async () => {
    const database = new SqliteD1()

    const outcome = await synchronise(database)

    expect(outcome.rebuilt).toBe(true)
    expect(outcome.drift).toContain("collection table missing")
    expect(postIds(database)).toEqual(ALL_POST_IDS)
    expect(infoRow(database)).toEqual({
      version: fixtureTarget().version,
      structureVersion: fixtureTarget().structureVersion,
      ready: 1,
    })
    const [longPost] = database.query(`SELECT body, __hash__ FROM _content_blog WHERE id = '${FIXTURE_SLICED_POST.id}'`)
    expect(longPost).toEqual({
      body: FIXTURE_SLICED_POST.firstSlice + FIXTURE_SLICED_POST.secondSlice,
      __hash__: FIXTURE_SLICED_POST.hash,
    })
  })

  it("leaves an in-sync database alone without writing anything", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.executedStatements.length = 0

    const outcome = await synchronise(database)

    expect(outcome).toEqual({ rebuilt: false, drift: [] })
    expect(database.executedStatements.filter(isWrite)).toEqual([])
  })

  it("repairs a table that is marked ready but is missing rows (the 2026-09-29 incident)", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.sqlite.exec(`DELETE FROM _content_blog WHERE id NOT IN ('${FIXTURE_POSTS[0]?.id}')`)
    expect(infoRow(database)?.ready).toBe(1)

    const outcome = await synchronise(database)

    expect(outcome.rebuilt).toBe(true)
    expect(outcome.drift).toContain("3 rows missing")
    expect(postIds(database)).toEqual(ALL_POST_IDS)
  })

  it("removes rows that are no longer in the dump", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.sqlite.exec(`INSERT INTO _content_blog VALUES ('blog/blog/9999_deleted.md', 'gone', '{}', 'hash-gone')`)

    const outcome = await synchronise(database)

    expect(outcome.drift).toContain("1 stale rows")
    expect(postIds(database)).toEqual(ALL_POST_IDS)
  })

  it("replaces content from a previous build", async () => {
    const database = new SqliteD1()
    const previousPosts = FIXTURE_POSTS.map((post) => ({
      ...post,
      title: `old ${post.title}`,
      hash: `old-${post.hash}`,
    }))
    stageDump(
      database,
      buildFixtureDump({
        version: `${DATABASE_VERSION}--previous`,
        structureVersion: fixtureTarget().structureVersion,
        posts: previousPosts,
      }),
    )

    const outcome = await synchronise(database)

    expect(outcome.drift).toContain(`content version differs (stored ${DATABASE_VERSION}--previous)`)
    expect(postIds(database)).toEqual(ALL_POST_IDS)
    expect(database.query("SELECT title FROM _content_blog WHERE title LIKE 'old %'")).toEqual([])
    expect(infoRow(database)?.version).toBe(fixtureTarget().version)
  })

  it("recreates the table when the collection schema changes", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    const target = fixtureTarget({
      version: `${DATABASE_VERSION}--with-subtitle`,
      structureVersion: "structure-with-subtitle",
    })
    const dumpLines = buildFixtureDump({ ...target, posts: FIXTURE_POSTS, withSubtitleColumn: true })

    const outcome = await synchroniseContentCollection({ database, dumpLines, target })

    expect(outcome.drift).toContain("structure version differs")
    expect(database.query("SELECT DISTINCT subtitle FROM _content_blog")).toEqual([{ subtitle: "sub" }])
  })

  it("drops a checksum table left behind by an older @nuxt/content database version", async () => {
    const database = new SqliteD1()
    database.sqlite.exec(`CREATE TABLE _content_info (id TEXT PRIMARY KEY, "ready" BOOLEAN, "version" VARCHAR)`)
    database.sqlite.exec(`INSERT INTO _content_info VALUES ('checksum_blog', true, 'v2.0.0--ancient')`)

    const outcome = await synchronise(database)

    expect(outcome.rebuilt).toBe(true)
    expect(postIds(database)).toEqual(ALL_POST_IDS)
    expect(infoRow(database)?.version).toBe(fixtureTarget().version)
  })

  it("drops an outdated checksum table even when it has no row for this collection", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.sqlite.exec("DROP TABLE _content_info")
    database.sqlite.exec(`CREATE TABLE _content_info (id TEXT PRIMARY KEY, "ready" BOOLEAN, "version" VARCHAR)`)
    database.sqlite.exec(`INSERT INTO _content_info VALUES ('checksum_notes', true, 'v2.0.0--ancient')`)

    const outcome = await synchronise(database)

    expect(outcome.drift).toEqual(["checksum table schema differs", "checksum row missing"])
    expect(infoRow(database)?.version).toBe(fixtureTarget().version)
    expect(postIds(database)).toEqual(ALL_POST_IDS)
  })

  it("rebuilds a collection table whose schema differs even though the checksum row claims it is current", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.sqlite.exec("DROP TABLE _content_blog")
    database.sqlite.exec(`CREATE TABLE _content_blog (id TEXT PRIMARY KEY, "title" VARCHAR, "body" TEXT)`)

    const outcome = await synchronise(database)

    expect(outcome.drift).toEqual(["collection table schema differs"])
    expect(postIds(database)).toEqual(ALL_POST_IDS)
  })

  it("rolls back completely when a statement fails mid-rebuild", async () => {
    const database = new SqliteD1()
    const previousDump = buildFixtureDump({
      version: `${DATABASE_VERSION}--previous`,
      structureVersion: fixtureTarget().structureVersion,
      posts: FIXTURE_POSTS,
    })
    stageDump(database, previousDump)
    const snapshot = database.query("SELECT * FROM _content_blog ORDER BY id")
    const infoSnapshot = infoRow(database)
    database.failWhen = (sql) => sql.includes(FIXTURE_SLICED_POST.id)

    await expect(synchronise(database)).rejects.toThrow(/internal error/)

    expect(database.query("SELECT * FROM _content_blog ORDER BY id")).toEqual(snapshot)
    expect(infoRow(database)).toEqual(infoSnapshot)
  })

  it("fails loudly, without dropping anything, when the checksum row cannot be read", async () => {
    const database = new SqliteD1()
    stageDump(database, currentDump())
    database.failWhen = (sql) => sql.startsWith("SELECT") && sql.includes("_content_info")
    database.executedStatements.length = 0

    await expect(synchronise(database)).rejects.toThrow(/internal error/)

    expect(database.executedStatements.filter(isWrite)).toEqual([])
    expect(postIds(database)).toEqual(ALL_POST_IDS)
  })

  it("refuses a dump without the checksum table definition", async () => {
    const database = new SqliteD1()
    const dumpLines = currentDump().filter((line) => !line.startsWith("CREATE TABLE IF NOT EXISTS _content_info"))

    await expect(synchronise(database, dumpLines)).rejects.toThrow(/_content_info/)
    expect(database.executedStatements.filter(isWrite)).toEqual([])
  })

  it("throws if the database is still out of sync after the rebuild commits", async () => {
    // A batch that reports success but changes nothing stands in for a concurrent writer
    // undoing the rebuild between commit and verification.
    class SilentlyIgnoringD1 extends SqliteD1 {
      override async batch(statements: ContentSyncStatement[]): Promise<unknown[]> {
        return statements.map(() => ({ results: [] }))
      }
    }
    const database = new SilentlyIgnoringD1()

    await expect(synchronise(database)).rejects.toThrow(/still out of sync/)
  })
})

describe("createRevalidationGate", () => {
  const createClock = () => {
    let current = 0
    return {
      now: () => current,
      advance: (milliseconds: number) => {
        current += milliseconds
      },
    }
  }

  it("runs the task once, then skips it until the revalidation window passes", async () => {
    const clock = createClock()
    const runGated = createRevalidationGate({ revalidateAfterMs: 1000, now: clock.now })
    let runs = 0
    const task = async () => {
      runs += 1
    }

    await runGated("blog", task)
    await runGated("blog", task)
    clock.advance(999)
    await runGated("blog", task)
    expect(runs).toBe(1)

    clock.advance(1)
    await runGated("blog", task)
    expect(runs).toBe(2)
  })

  it("tracks each key separately", async () => {
    const runGated = createRevalidationGate({ revalidateAfterMs: 1000, now: () => 0 })
    const seen: string[] = []

    await runGated("blog", async () => {
      seen.push("blog")
    })
    await runGated("notes", async () => {
      seen.push("notes")
    })

    expect(seen).toEqual(["blog", "notes"])
  })

  it("never makes a caller wait on another caller's run, even one that never settles", async () => {
    // In Workers, a run started by a request that is then cancelled never settles.
    const runGated = createRevalidationGate({ revalidateAfterMs: 1000, now: () => 0 })
    const stuckRun = runGated("blog", () => new Promise<void>(() => {}))
    let secondRan = false

    await runGated("blog", async () => {
      secondRan = true
    })

    expect(secondRan).toBe(true)
    await runGated("blog", () => Promise.reject(new Error("the successful run is remembered, so this never runs")))
    expect(stuckRun).toBeInstanceOf(Promise)
  })

  it("does not remember a failure, so the next call retries", async () => {
    const runGated = createRevalidationGate({ revalidateAfterMs: 1000, now: () => 0 })
    let attempts = 0
    const flakyTask = async () => {
      attempts += 1
      if (attempts === 1) {
        throw new Error("D1_ERROR: internal error")
      }
    }

    await expect(runGated("blog", flakyTask)).rejects.toThrow(/internal error/)
    await runGated("blog", flakyTask)

    expect(attempts).toBe(2)
  })

  it("retries on the next call when the task throws synchronously", async () => {
    const runGated = createRevalidationGate({ revalidateAfterMs: 1000, now: () => 0 })
    let attempts = 0
    const task = (): Promise<void> => {
      attempts += 1
      if (attempts === 1) {
        throw new Error("synchronous failure")
      }
      return Promise.resolve()
    }

    await expect(runGated("blog", task)).rejects.toThrow(/synchronous failure/)
    await runGated("blog", task)
    expect(attempts).toBe(2)
  })
})
