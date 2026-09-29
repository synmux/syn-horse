/**
 * Keeps the `@nuxt/content` D1 database in step with the content bundled into this build.
 *
 * Why this exists: in production, server-rendered pages query D1, while client-side navigation
 * queries the browser's own copy of the bundled dump. `@nuxt/content`'s built-in importer fills
 * D1 lazily, one statement at a time, logs and skips any statement that fails, treats a failed
 * checksum read as an empty database (and drops the table), and marks the import `ready` anyway.
 * One burst of transient D1 errors therefore left production with 5 of 15 posts, permanently
 * flagged as complete. Deep links then 404'd while in-app navigation worked.
 *
 * This replaces that importer (disabled via `integrityCheck` in `nuxt.config.ts`):
 * - the database is compared against the dump table by table and row by row, not just by
 *   checksum, so drift is detected and repaired whatever caused it;
 * - repairs apply the whole dump in one D1 `batch()`, which is a transaction, so readers only
 *   ever see the old state or the complete new one;
 * - any failure is thrown, never skipped, so the caller can fail the request and retry later.
 */

/** The subset of D1's prepared statement API used here. `D1PreparedStatement` satisfies it. */
export interface ContentSyncStatement {
  bind(...values: unknown[]): ContentSyncStatement
  all<Row = Record<string, unknown>>(): Promise<{ results: Row[] }>
  first<Row = Record<string, unknown>>(): Promise<Row | null>
}

/** The subset of the D1 binding used here. `D1Database` satisfies it. */
export interface ContentSyncDatabase {
  prepare(query: string): ContentSyncStatement
  batch(statements: ContentSyncStatement[]): Promise<unknown[]>
}

/** Where a collection lives and which build of it the database should hold. */
export interface ContentCollectionTarget {
  collection: string
  collectionTable: string
  infoTable: string
  /** `checksums[collection]` from `#content/manifest`: `<databaseVersion>--<content hash>`. */
  version: string
  /** `checksumsStructure[collection]` from `#content/manifest`. */
  structureVersion: string
}

/** The parts of `#content/manifest` needed to resolve a target. */
export interface ContentManifest {
  checksums: Readonly<Record<string, string | undefined>>
  checksumsStructure: Readonly<Record<string, string | undefined>>
  tables: Readonly<Record<string, string | undefined>>
}

/** One statement from the dump, with the tag `@nuxt/content` appends as a trailing comment. */
export interface ContentDumpEntry {
  statement: string
  /** `structure` (DDL), `meta` (checksum bookkeeping), or the hash of the row it writes. */
  tag: string
}

export interface ContentSyncOutcome {
  rebuilt: boolean
  /** Human-readable reasons the database was out of sync; empty when it was not. */
  drift: string[]
}

interface ChecksumRow {
  version: string
  structureVersion: string
  ready: boolean
}

/** How a table in the database compares with the definition in the dump. */
type TableStatus = "missing" | "outdated" | "current"

interface ContentDatabaseState {
  collectionTable: TableStatus
  infoTable: TableStatus
  checksum: ChecksumRow | undefined
  rowHashes: Set<string>
}

interface ContentTableDefinitions {
  collectionTable: string
  infoTable: string
}

const TAG_SEPARATOR = " -- "
const STRUCTURE_TAG = "structure"
const META_TAG = "meta"
const CONTENT_QUERY_PATH = /^\/__nuxt_content\/([^/]+)\/query$/
const CREATE_TABLE_IF_NOT_EXISTS = /^CREATE TABLE IF NOT EXISTS /
const TRAILING_SEMICOLON = /;$/

/**
 * The collection a request queries, when it is a `@nuxt/content` query: every server-side
 * `queryCollection()` (SSR included) is a POST to `/__nuxt_content/<collection>/query`, as is the
 * client's fallback when it cannot run the WASM database.
 */
export const matchContentQueryCollection = (method: string, pathname: string): string | undefined =>
  method === "POST" ? CONTENT_QUERY_PATH.exec(pathname)?.[1] : undefined

/** The sync target for a collection, or `undefined` if the manifest does not know it. */
export const resolveContentTarget = (
  collection: string,
  manifest: ContentManifest,
): ContentCollectionTarget | undefined => {
  const version = manifest.checksums[collection]
  const structureVersion = manifest.checksumsStructure[collection]
  const collectionTable = manifest.tables[collection]
  const infoTable = manifest.tables.info
  if (!version || !structureVersion || !collectionTable || !infoTable) {
    return undefined
  }
  return { collection, collectionTable, infoTable, version, structureVersion }
}

/**
 * Decodes the payload served by `/__nuxt_content/<collection>/sql_dump.txt`: base64 of a
 * gzipped JSON array of SQL lines.
 */
export const decodeContentDump = async (encoded: string): Promise<string[]> => {
  if (encoded.length === 0) {
    throw new Error("content dump is empty")
  }
  const compressed = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0))
  const decompressed = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"))
  const parsed: unknown = JSON.parse(await new Response(decompressed).text())
  if (!Array.isArray(parsed) || !parsed.every((line) => typeof line === "string")) {
    throw new Error("content dump is not a JSON array of strings")
  }
  return parsed
}

/**
 * Splits each dump line into its statement and tag. The tag is stripped rather than sent to D1
 * because D1 mishandles a statement's trailing semicolon followed by a comment
 * (https://github.com/cloudflare/workers-sdk/issues/3892).
 */
export const parseContentDump = (lines: readonly string[]): ContentDumpEntry[] =>
  lines.map((line) => {
    const separatorIndex = line.lastIndexOf(TAG_SEPARATOR)
    if (separatorIndex === -1) {
      throw new Error(`malformed content dump line (no tag): ${line.slice(0, 120)}`)
    }
    return {
      statement: line.slice(0, separatorIndex),
      tag: line.slice(separatorIndex + TAG_SEPARATOR.length),
    }
  })

const isRowTag = (tag: string): boolean => tag !== STRUCTURE_TAG && tag !== META_TAG

const checksumId = (collection: string): string => `checksum_${collection}`

/**
 * Puts a `CREATE TABLE` statement into the form SQLite stores in `sqlite_master.sql`, which drops
 * `IF NOT EXISTS` and the trailing semicolon, so dump and database definitions compare directly.
 */
const normaliseTableDefinition = (definition: string): string =>
  definition.trim().replace(CREATE_TABLE_IF_NOT_EXISTS, "CREATE TABLE ").replace(TRAILING_SEMICOLON, "").trim()

const findTableDefinition = (entries: readonly ContentDumpEntry[], table: string, collection: string): string => {
  const definition = entries.find(
    (entry) => entry.tag === STRUCTURE_TAG && entry.statement.startsWith(`CREATE TABLE IF NOT EXISTS ${table} `),
  )
  if (!definition) {
    throw new Error(`content dump for "${collection}" does not define ${table}`)
  }
  return definition.statement
}

/**
 * Reads what the database currently holds. Every read error propagates: a failed read says
 * nothing about the database's contents, so it must never be mistaken for an empty one.
 */
const readContentState = async (
  database: ContentSyncDatabase,
  target: ContentCollectionTarget,
  definitions: ContentTableDefinitions,
): Promise<ContentDatabaseState> => {
  const { results: existingTables } = await database
    .prepare("SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)")
    .bind(target.infoTable, target.collectionTable)
    .all<{ name: string; sql: string | null }>()
  const storedDefinitions = new Map(existingTables.map((table) => [table.name, table.sql ?? ""]))
  const tableStatus = (table: string, expectedDefinition: string): TableStatus => {
    const storedDefinition = storedDefinitions.get(table)
    if (storedDefinition === undefined) {
      return "missing"
    }
    return normaliseTableDefinition(storedDefinition) === normaliseTableDefinition(expectedDefinition)
      ? "current"
      : "outdated"
  }
  const collectionTable = tableStatus(target.collectionTable, definitions.collectionTable)
  const infoTable = tableStatus(target.infoTable, definitions.infoTable)

  let checksum: ChecksumRow | undefined
  if (infoTable !== "missing") {
    // `SELECT *` rather than named columns: an outdated checksum table may lack some of them.
    const row = await database
      .prepare(`SELECT * FROM ${target.infoTable} WHERE id = ?`)
      .bind(checksumId(target.collection))
      .first()
    if (row) {
      checksum = {
        version: String(row.version ?? ""),
        structureVersion: String(row.structureVersion ?? ""),
        ready: Number(row.ready) === 1,
      }
    }
  }

  // Only a table matching the dump's definition is guaranteed to have a `__hash__` column; any
  // other collection table is rebuilt regardless.
  const rowHashes = new Set<string>()
  if (collectionTable === "current") {
    const { results } = await database
      .prepare(`SELECT __hash__ FROM ${target.collectionTable}`)
      .all<{ __hash__: string }>()
    for (const { __hash__: rowHash } of results) {
      rowHashes.add(rowHash)
    }
  }

  return { collectionTable, infoTable, checksum, rowHashes }
}

const describeDrift = (
  state: ContentDatabaseState,
  target: ContentCollectionTarget,
  expectedRowHashes: ReadonlySet<string>,
): string[] => {
  if (state.collectionTable === "missing") {
    return ["collection table missing"]
  }
  const drift: string[] = []
  if (state.collectionTable === "outdated") {
    drift.push("collection table schema differs")
  }
  if (state.infoTable === "outdated") {
    drift.push("checksum table schema differs")
  }
  if (!state.checksum) {
    drift.push("checksum row missing")
    return drift
  }
  if (state.checksum.version !== target.version) {
    drift.push(`content version differs (stored ${state.checksum.version})`)
  }
  if (state.checksum.structureVersion !== target.structureVersion) {
    drift.push("structure version differs")
  }
  if (!state.checksum.ready) {
    drift.push("previous import never completed")
  }
  if (state.collectionTable === "current") {
    const missingRows = [...expectedRowHashes].filter((rowHash) => !state.rowHashes.has(rowHash)).length
    const staleRows = [...state.rowHashes].filter((rowHash) => !expectedRowHashes.has(rowHash)).length
    if (missingRows > 0) {
      drift.push(`${missingRows} rows missing`)
    }
    if (staleRows > 0) {
      drift.push(`${staleRows} stale rows`)
    }
  }
  return drift
}

/**
 * The full rebuild, in order. The dump already drops and recreates the collection table, inserts
 * the checksum row as not ready, fills the table and finally marks the checksum ready; this only
 * adds what the dump assumes: a checksum table in the current format, without a row for this
 * collection.
 */
const buildRebuildStatements = (
  database: ContentSyncDatabase,
  entries: readonly ContentDumpEntry[],
  target: ContentCollectionTarget,
  state: ContentDatabaseState,
  definitions: ContentTableDefinitions,
): ContentSyncStatement[] => {
  const statements: ContentSyncStatement[] = []
  if (state.infoTable === "outdated") {
    // Left in place, `CREATE TABLE IF NOT EXISTS` would keep the old columns and the dump's
    // checksum insert would fail on every attempt.
    statements.push(database.prepare(`DROP TABLE IF EXISTS ${target.infoTable}`))
  }
  statements.push(
    database.prepare(definitions.infoTable),
    database.prepare(`DELETE FROM ${target.infoTable} WHERE id = ?`).bind(checksumId(target.collection)),
  )
  for (const entry of entries) {
    statements.push(database.prepare(entry.statement))
  }
  return statements
}

/**
 * Makes the database hold exactly the given dump for one collection. Does nothing when it
 * already does; otherwise rebuilds the collection in a single transaction and verifies the
 * result. Throws on any failure, leaving the database as it was.
 */
export const synchroniseContentCollection = async ({
  database,
  dumpLines,
  target,
}: {
  database: ContentSyncDatabase
  dumpLines: readonly string[]
  target: ContentCollectionTarget
}): Promise<ContentSyncOutcome> => {
  const entries = parseContentDump(dumpLines)
  const definitions: ContentTableDefinitions = {
    collectionTable: findTableDefinition(entries, target.collectionTable, target.collection),
    infoTable: findTableDefinition(entries, target.infoTable, target.collection),
  }
  const expectedRowHashes = new Set(entries.filter((entry) => isRowTag(entry.tag)).map((entry) => entry.tag))

  const state = await readContentState(database, target, definitions)
  const drift = describeDrift(state, target, expectedRowHashes)
  if (drift.length === 0) {
    return { rebuilt: false, drift }
  }

  await database.batch(buildRebuildStatements(database, entries, target, state, definitions))

  const remainingDrift = describeDrift(await readContentState(database, target, definitions), target, expectedRowHashes)
  if (remainingDrift.length > 0) {
    throw new Error(
      `content collection "${target.collection}" is still out of sync after rebuilding: ${remainingDrift.join("; ")}`,
    )
  }
  return { rebuilt: true, drift }
}

/**
 * Runs a task at most once per `revalidateAfterMs` for each key, counted from its last success;
 * a failure is not remembered, so the next call retries.
 *
 * It deliberately keeps only plain data between calls and never hands one caller a promise
 * another caller started. In Workers, a promise's I/O belongs to the request that started it:
 * if that request is cancelled (a client disconnect, say), the promise never settles and every
 * request awaiting it would hang. Concurrent callers therefore each run the task, so the task
 * must be idempotent.
 */
export const createRevalidationGate = ({
  revalidateAfterMs,
  now = Date.now,
}: {
  revalidateAfterMs: number
  now?: () => number
}) => {
  const lastSucceededAt = new Map<string, number>()

  return async (key: string, task: () => Promise<void>): Promise<void> => {
    const succeededAt = lastSucceededAt.get(key)
    if (succeededAt !== undefined && now() - succeededAt < revalidateAfterMs) {
      return
    }
    await task()
    lastSucceededAt.set(key, now())
  }
}
