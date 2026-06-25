export type ProjectTagKind = "hot" | "cool" | "lilac" | "warn"

export interface ProjectTag {
  k?: ProjectTagKind
  l: string
}

export interface Project {
  desc: string
  name: string
  tags: ProjectTag[]
  url: string
  yr: string
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

// abandoned projects — revealed on /projects only when konami mode is active.
// these are placeholders; swap in real dead projects. they link nowhere, so an
// epitaph (cause of death) takes the place of a live project's url.
export interface AbandonedProject {
  desc: string
  epitaph: string
  name: string
  tags: ProjectTag[]
  yr: string
}

export const ABANDONED_PROJECTS: AbandonedProject[] = [
  {
    name: "hoofnote",
    yr: "2021",
    desc: "a markdown notes app that synced over irc. it synced beautifully right up until anyone else joined the channel.",
    epitaph: "killed by a merge conflict it could not survive",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "ELECTRON" }, { l: "IRC" }],
  },
  {
    name: "stablr",
    yr: "2025",
    desc: "uber, but for horses. raised zero pounds, onboarded one horse, and that horse asked to be removed.",
    epitaph: "ran out of runway and oats",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "REACT-NATIVE" }, { l: "SEED" }],
  },
  {
    name: "tachyon-cms",
    yr: "2024",
    desc: "a faster-than-light headless cms. the marketing was the only part that ever shipped.",
    epitaph: "deprecated before its first stable release",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "GO" }, { l: "VAPOURWARE" }],
  },
  {
    name: "regex.horse",
    yr: "2022",
    desc: "a regex tester that explained your pattern in plain english. it was wrong, confidently, every single time.",
    epitaph: "matched nothing in the end",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "WASM" }, { l: "REGRET" }],
  },
  {
    name: "neighbourly",
    yr: "2018",
    desc: "a hyper-local social network for one street. it worked perfectly; nobody on the street spoke to me again.",
    epitaph: "abandoned for the good of the neighbourhood",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "RAILS" }, { l: "POSTGRES" }],
  },
]
