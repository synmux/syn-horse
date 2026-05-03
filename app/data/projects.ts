export type ProjectTagKind = "hot" | "cool" | "lilac" | "warn"

export type ProjectTag = { l: string; k?: ProjectTagKind }

export type Project = {
  name: string
  yr: string
  desc: string
  url: string
  tags: ProjectTag[]
}

export const PROJECTS: Project[] = [
  {
    name: "syn.horse",
    yr: "2026",
    desc: "this site. nuxt 4 on cloudflare workers. the third rewrite. the last one. probably.",
    url: "syn.horse",
    tags: [{ l: "PRIMARY", k: "hot" }, { l: "NUXT", k: "cool" }, { l: "OSS" }],
  },
  {
    name: "genderbase",
    yr: "2025",
    desc: "a directory of gender-affirming resources. low ui, high index. pulls from a few good sources, refuses to pull from bad ones.",
    url: "genderbase.com",
    tags: [{ l: "LIVE", k: "hot" }, { l: "NUXT" }, { l: "WIKI" }],
  },
  {
    name: "rhymepass",
    yr: "2024",
    desc: "generates rhyming passwords. yes, really. yes, secure. yes, you can give the support engineer a poem.",
    url: "github.com/synmux/rhymepass",
    tags: [{ l: "OSS", k: "cool" }, { l: "CLI" }],
  },
  {
    name: "recon",
    yr: "2024",
    desc: "resize and convert images on iOS. a small, opinionated, genuinely fast tool. no subscription. it just runs.",
    url: "apps.apple.com/recon",
    tags: [{ l: "iOS", k: "lilac" }, { l: "INDIE" }],
  },
  {
    name: "lics",
    yr: "2024",
    desc: "manage your licence keys at the cli with notion. notion is the database, the cli is the cope.",
    url: "github.com/synmux/lics",
    tags: [{ l: "OSS", k: "cool" }, { l: "CLI" }, { l: "NOTION" }],
  },
  {
    name: "noti",
    yr: "2023",
    desc: "monitor a process and trigger a notification. for when you start `pnpm build` and walk away to despair.",
    url: "github.com/synmux/noti",
    tags: [{ l: "OSS" }, { l: "CLI" }],
  },
  {
    name: "dcw.soy",
    yr: "2024",
    desc: "a duck or a soy? a static site that asks the only question that matters. ssl by cloudflare, vibes by no one.",
    url: "dcw.soy",
    tags: [{ l: "WEIRD", k: "warn" }, { l: "STATIC" }],
  },
  {
    name: "tabby",
    yr: "2023",
    desc: "a personal new tab dashboard. todos, weather, RSS, the lot. for the kind of person who hates speed dial.",
    url: "github.com/synmux/tabby",
    tags: [{ l: "OSS" }, { l: "WEB" }],
  },
]
