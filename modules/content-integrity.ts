/**
 * Fails a production build when content would reach the site broken or not at all.
 *
 * @nuxt/content does neither check for you. Frontmatter it cannot parse still becomes a row,
 * with the raw YAML as the title and NULL for the fields it could not read, and nothing is
 * validated against the collection's schema. A file that makes the parser throw is dropped
 * with only a warning. Either way the build succeeds and the site breaks.
 *
 * So after the dumps are generated, this replays each collection's dump into an in-memory
 * SQLite database (the same rows D1 will hold), converts them the way pages receive them, and
 * checks that every source file has a row and every row matches the collection's schema from
 * `collectionSchemas` in `content.config.ts`.
 */
import { readFile } from "node:fs/promises"
import { join, posix, relative } from "node:path"
import { DatabaseSync } from "node:sqlite"
import { pathToFileURL } from "node:url"

import { defineNuxtModule, useLogger } from "nuxt/kit"
import type { ZodType } from "zod"

import { decodeContentDump, parseContentDump } from "../server/utils/content-sync"

/** Column types as @nuxt/content records them: "string", "json", "boolean", "number" or "date". */
type ContentFieldTypes = Readonly<Record<string, string>>

type ContentRow = Record<string, unknown>

/** The parts of a resolved @nuxt/content source used here. */
interface ContentSource {
  include?: string
  prefix?: string
  repository?: unknown
  cwd?: string
  prepare?: (context: { rootDir: string }) => Promise<void> | void
  getKeys?: () => Promise<string[]>
}

interface ContentCollectionDefinition {
  source?: ContentSource | ContentSource[]
  fields?: ContentFieldTypes
}

interface ContentConfigModule {
  default: { collections: Record<string, ContentCollectionDefinition> }
  collectionSchemas?: Record<string, ZodType>
}

export interface ContentProblem {
  id: string
  problems: string[]
}

const MISSING_FROM_BUILD = "missing from the build: @nuxt/content could not parse it"

/** Row ids for a source's keys, built the way @nuxt/content builds them. */
export const expectedContentIds = (collection: string, prefix: string | undefined, keys: readonly string[]): string[] =>
  keys.map((key) => posix.join(collection, prefix ?? "", key))

/** Replays a collection's dump into an in-memory SQLite database and returns its rows. */
export const loadDumpRows = (dumpLines: readonly string[], table: string): ContentRow[] => {
  const database = new DatabaseSync(":memory:")
  try {
    for (const { statement } of parseContentDump(dumpLines)) {
      database.exec(statement)
    }
    return database.prepare(`SELECT * FROM ${table}`).all() as ContentRow[]
  } finally {
    database.close()
  }
}

/**
 * Converts a stored row to the values pages receive, as @nuxt/content's `refineContentFields`
 * does at query time. A SQL NULL stays null, just as it reaches the page.
 */
export const refineContentRow = (row: ContentRow, fields: ContentFieldTypes): ContentRow => {
  const refined: ContentRow = {}
  for (const [key, value] of Object.entries(row)) {
    let converted: unknown = value
    if (fields[key] === "json" && typeof value === "string" && value !== "undefined") {
      converted = JSON.parse(value)
    } else if (fields[key] === "boolean" && value !== "undefined") {
      converted = Boolean(value)
    }
    refined[key] = converted === "NULL" ? undefined : converted
  }
  return refined
}

/** Every expected file without a row, and every row that fails the schema. */
export const checkContentRows = ({
  expectedIds,
  rows,
  fields,
  schema,
}: {
  expectedIds: readonly string[]
  rows: readonly ContentRow[]
  fields: ContentFieldTypes
  schema: ZodType
}): ContentProblem[] => {
  const problems: ContentProblem[] = []
  const rowIds = new Set(rows.map((row) => String(row.id)))
  for (const id of expectedIds) {
    if (!rowIds.has(id)) {
      problems.push({ id, problems: [MISSING_FROM_BUILD] })
    }
  }
  for (const row of rows) {
    const result = schema.safeParse(refineContentRow(row, fields))
    if (!result.success) {
      problems.push({
        id: String(row.id),
        problems: result.error.issues.map((issue) => `${issue.path.map(String).join(".")}: ${issue.message}`),
      })
    }
  }
  return problems
}

const sourcesOf = (definition: ContentCollectionDefinition): ContentSource[] => {
  if (!definition.source) {
    return []
  }
  return Array.isArray(definition.source) ? definition.source : [definition.source]
}

const describeProblems = (problems: readonly ContentProblem[], fileById: ReadonlyMap<string, string>): string =>
  problems
    .map(({ id, problems: details }) => {
      const lines = details.map((detail) => `      - ${detail}`).join("\n")
      return `  ${fileById.get(id) ?? id}\n${lines}`
    })
    .join("\n")

const checkContent = async (rootDir: string, buildDir: string): Promise<string[]> => {
  const contentConfigUrl = pathToFileURL(join(rootDir, "content.config.ts")).href
  const { default: contentConfig, collectionSchemas = {} } = (await import(contentConfigUrl)) as ContentConfigModule
  const reports: string[] = []

  for (const [collection, definition] of Object.entries(contentConfig.collections)) {
    const sources = sourcesOf(definition)
    if (sources.length === 0) {
      continue
    }
    const schema = collectionSchemas[collection]
    if (!schema || !definition.fields) {
      throw new Error(`content-integrity: add the "${collection}" schema to collectionSchemas in content.config.ts`)
    }

    const expectedIds: string[] = []
    const fileById = new Map<string, string>()
    for (const source of sources) {
      if (source.repository !== undefined || !source.getKeys || !source.include) {
        throw new Error(`content-integrity cannot check the source of collection "${collection}"`)
      }
      await source.prepare?.({ rootDir })
      const keys = await source.getKeys()
      // @nuxt/content resolves keys relative to the fixed part of `include` (before any `*`).
      const [fixedPart = ""] = source.include.includes("*") ? source.include.split("*") : [""]
      const sourceDir = join(source.cwd ?? join(rootDir, "content"), fixedPart)
      const ids = expectedContentIds(collection, source.prefix, keys)
      ids.forEach((id, index) => {
        expectedIds.push(id)
        fileById.set(id, relative(rootDir, join(sourceDir, keys[index] ?? "")))
      })
    }

    const dumpPath = join(buildDir, "content", "raw", `dump.${collection}.sql`)
    const dumpLines = await decodeContentDump((await readFile(dumpPath, "utf8")).trim())
    const problems = checkContentRows({
      expectedIds,
      rows: loadDumpRows(dumpLines, `_content_${collection}`),
      fields: definition.fields,
      schema,
    })
    if (problems.length > 0) {
      reports.push(describeProblems(problems, fileById))
    }
  }
  return reports
}

export default defineNuxtModule({
  meta: { name: "content-integrity" },
  setup(_options, nuxt) {
    if (nuxt.options.dev || nuxt.options._prepare) {
      return
    }
    const logger = useLogger("content-integrity")
    // The dumps are written with the other templates, before Vite and Nitro build, so broken
    // content fails the build quickly.
    nuxt.hook("app:templatesGenerated", async () => {
      const reports = await checkContent(nuxt.options.rootDir, nuxt.options.buildDir)
      if (reports.length > 0) {
        throw new Error(`content would reach the site broken, so the build stopped:\n${reports.join("\n")}`)
      }
      logger.success("every content file is in the build and matches its schema")
    })
  },
})
