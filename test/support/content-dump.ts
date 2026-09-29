import { gzipSync } from "node:zlib"

import type { ContentCollectionTarget } from "../../server/utils/content-sync"

export const DATABASE_VERSION = "v3.5.0"

export interface FixturePost {
  id: string
  title: string
  body: string
  hash: string
}

/**
 * A post whose body is inserted in two slices, the way `@nuxt/content` splits rows that would
 * exceed D1's 100 KB statement limit: an `INSERT` carrying a provisional `__hash__`, then an
 * `UPDATE … CONCAT(…)` that appends the rest and sets the final hash. Both lines are tagged with
 * the final row hash.
 */
export interface FixtureSlicedPost {
  id: string
  title: string
  firstSlice: string
  secondSlice: string
  hash: string
}

export interface FixtureDumpOptions {
  version: string
  structureVersion: string
  posts: readonly FixturePost[]
  slicedPost?: FixtureSlicedPost
  /** Adds a `subtitle` column, standing in for a schema change between builds. */
  withSubtitleColumn?: boolean
}

const escapeSql = (value: string): string => value.replaceAll("'", "''")

/** Builds dump lines in exactly the format `@nuxt/content` serves from `sql_dump.txt`. */
export const buildFixtureDump = (options: FixtureDumpOptions): string[] => {
  const { version, structureVersion, posts, slicedPost, withSubtitleColumn = false } = options
  const subtitleColumn = withSubtitleColumn ? ', "subtitle" VARCHAR' : ""
  const subtitleValue = withSubtitleColumn ? ", 'sub'" : ""
  const lines = [
    `CREATE TABLE IF NOT EXISTS _content_info (id TEXT PRIMARY KEY, "ready" BOOLEAN, "structureVersion" VARCHAR, "version" VARCHAR, "__hash__" TEXT UNIQUE); -- structure`,
    `INSERT INTO _content_info VALUES ('checksum_blog', false, '${structureVersion}', '${version}', 'info-${version}'); -- meta`,
    `DROP TABLE IF EXISTS _content_blog; -- structure`,
    `CREATE TABLE IF NOT EXISTS _content_blog (id TEXT PRIMARY KEY, "title" VARCHAR, "body" TEXT${subtitleColumn}, "__hash__" TEXT UNIQUE); -- structure`,
  ]
  for (const post of posts) {
    lines.push(
      `INSERT INTO _content_blog VALUES ('${escapeSql(post.id)}', '${escapeSql(post.title)}', '${escapeSql(post.body)}'${subtitleValue}, '${post.hash}'); -- ${post.hash}`,
    )
  }
  if (slicedPost) {
    const provisionalHash = `${slicedPost.hash}-${slicedPost.firstSlice.length}`
    lines.push(
      `INSERT INTO _content_blog VALUES ('${escapeSql(slicedPost.id)}', '${escapeSql(slicedPost.title)}', '${escapeSql(slicedPost.firstSlice)}'${subtitleValue}, '${provisionalHash}'); -- ${slicedPost.hash}`,
      `UPDATE _content_blog SET body = CONCAT(body, '${escapeSql(slicedPost.secondSlice)}'), "__hash__" = '${slicedPost.hash}' WHERE id = '${escapeSql(slicedPost.id)}' AND "__hash__" = '${provisionalHash}'; -- ${slicedPost.hash}`,
    )
  }
  lines.push(`UPDATE _content_info SET ready = true WHERE id = 'checksum_blog'; -- meta`)
  return lines
}

/** Encodes dump lines the way the `sql_dump.txt` route serves them: JSON, gzipped, base64. */
export const encodeFixtureDump = (lines: readonly string[]): string =>
  gzipSync(Buffer.from(JSON.stringify(lines), "utf8")).toString("base64")

export const fixtureTarget = (overrides: Partial<ContentCollectionTarget> = {}): ContentCollectionTarget => ({
  collection: "blog",
  collectionTable: "_content_blog",
  infoTable: "_content_info",
  version: `${DATABASE_VERSION}--current`,
  structureVersion: "structure-current",
  ...overrides,
})

/** Posts whose text deliberately contains `--`, `;`, `?` and quotes, which trip naive SQL handling. */
export const FIXTURE_POSTS: readonly FixturePost[] = [
  { id: "blog/blog/0000_first.md", title: "first -- post", body: '{"text":"a; b?"}', hash: "hash-first" },
  { id: "blog/blog/0001_second.md", title: "second's post", body: '{"text":"-- not a comment"}', hash: "hash-second" },
  { id: "blog/blog/0002_third.md", title: "third", body: '{"text":"why?"}', hash: "hash-third" },
]

export const FIXTURE_SLICED_POST: FixtureSlicedPost = {
  id: "blog/blog/0003_long.md",
  title: "a very long post",
  firstSlice: '{"text":"the first half',
  secondSlice: ' and the second half"}',
  hash: "hash-long",
}

export const currentDump = (): string[] =>
  buildFixtureDump({
    version: fixtureTarget().version,
    structureVersion: fixtureTarget().structureVersion,
    posts: FIXTURE_POSTS,
    slicedPost: FIXTURE_SLICED_POST,
  })
