import { describe, expect, it } from "vitest"
import { z } from "zod"

import { checkContentRows, expectedContentIds, loadDumpRows, refineContentRow } from "../../modules/content-integrity"
import { buildFixtureDump, FIXTURE_POSTS, FIXTURE_SLICED_POST, fixtureTarget } from "../support/content-dump"

// Field types as @nuxt/content records them for the fixture table's columns.
const FIXTURE_FIELDS = { id: "string", title: "string", body: "json", __hash__: "string" }

const fixtureSchema = z.object({
  title: z.string().min(3),
  body: z.object({ text: z.string() }),
})

const ALL_FIXTURE_IDS = [...FIXTURE_POSTS.map((post) => post.id), FIXTURE_SLICED_POST.id]

const fixtureDump = (extraRows: readonly string[] = []): string[] => {
  const lines = buildFixtureDump({
    version: fixtureTarget().version,
    structureVersion: fixtureTarget().structureVersion,
    posts: FIXTURE_POSTS,
    slicedPost: FIXTURE_SLICED_POST,
  })
  // Keep the checksum update last, as in a real dump.
  return [...lines.slice(0, -1), ...extraRows, ...lines.slice(-1)]
}

const checkFixture = (expectedIds: readonly string[], dumpLines: readonly string[]) =>
  checkContentRows({
    expectedIds,
    rows: loadDumpRows(dumpLines, "_content_blog"),
    fields: FIXTURE_FIELDS,
    schema: fixtureSchema,
  })

describe("expectedContentIds", () => {
  it("builds ids the way @nuxt/content does: collection name, source prefix, then the key", () => {
    expect(expectedContentIds("blog", "/blog", ["0000_first.md", "nested/0001_second.md"])).toEqual([
      "blog/blog/0000_first.md",
      "blog/blog/nested/0001_second.md",
    ])
  })

  it("handles a source without a prefix", () => {
    expect(expectedContentIds("notes", undefined, ["one.md"])).toEqual(["notes/one.md"])
  })
})

describe("loadDumpRows", () => {
  it("replays the dump and returns every stored row, sliced rows reassembled", () => {
    const rows = loadDumpRows(fixtureDump(), "_content_blog")

    expect(rows.map((row) => row.id).sort()).toEqual([...ALL_FIXTURE_IDS].sort())
    const longPost = rows.find((row) => row.id === FIXTURE_SLICED_POST.id)
    expect(longPost?.body).toBe(FIXTURE_SLICED_POST.firstSlice + FIXTURE_SLICED_POST.secondSlice)
  })

  it("fails loudly for a table the dump does not create", () => {
    expect(() => loadDumpRows(fixtureDump(), "_content_notes")).toThrow(/no such table/)
  })
})

describe("refineContentRow", () => {
  it("converts stored values back to what pages receive, as @nuxt/content does", () => {
    const refined = refineContentRow(
      { tags: '["a","b"]', future: 0, featured: 1, subtitle: "NULL", date: null, title: "kept" },
      { tags: "json", future: "boolean", featured: "boolean", subtitle: "string", date: "string", title: "string" },
    )

    expect(refined).toEqual({
      tags: ["a", "b"],
      future: false,
      featured: true,
      subtitle: undefined,
      date: null,
      title: "kept",
    })
  })
})

describe("checkContentRows", () => {
  it("reports nothing when every file has a row that matches the schema", () => {
    expect(checkFixture(ALL_FIXTURE_IDS, fixtureDump())).toEqual([])
  })

  it("reports a file that @nuxt/content left out of the dump", () => {
    const problems = checkFixture([...ALL_FIXTURE_IDS, "blog/blog/0099_dropped.md"], fixtureDump())

    expect(problems).toEqual([
      { id: "blog/blog/0099_dropped.md", problems: ["missing from the build: @nuxt/content could not parse it"] },
    ])
  })

  it("reports each field of a row that fails the schema, including values stored as NULL", () => {
    const badRow = `INSERT INTO _content_blog VALUES ('blog/blog/0099_bad.md', 'x', NULL, 'hash-bad'); -- hash-bad`

    const problems = checkFixture([...ALL_FIXTURE_IDS, "blog/blog/0099_bad.md"], fixtureDump([badRow]))

    expect(problems).toHaveLength(1)
    expect(problems[0]?.id).toBe("blog/blog/0099_bad.md")
    expect(problems[0]?.problems.map((problem) => problem.split(":")[0])).toEqual(["title", "body"])
  })
})
