export type Command = {
  id: string
  label: string
  ic: string
  desc: string
  ext?: string
}

export const COMMANDS: Command[] = [
  { id: "home", label: "go home", ic: "~", desc: "/ index" },
  { id: "now", label: "/now", ic: ">", desc: "what i'm doing this month" },
  { id: "projects", label: "projects", ic: ">", desc: "things i made" },
  { id: "blog", label: "blog index", ic: ">", desc: "all the words" },
  { id: "cv", label: "cv", ic: ">", desc: "work history, talks, side projects" },
  { id: "contact", label: "contact", ic: ">", desc: "how to reach me. (politely.)" },
  { id: "domains", label: "domains", ic: ">", desc: "the syn.* family" },
  { id: "404", label: "404", ic: "!", desc: "the hostile one" },
  {
    id: "github",
    label: "open github",
    ic: "↗",
    desc: "github.com/synmux",
    ext: "https://github.com/synmux",
  },
  {
    id: "mast",
    label: "open mastodon",
    ic: "↗",
    desc: "basilisk.gallery/@dave",
    ext: "https://basilisk.gallery/@dave",
  },
  {
    id: "bsky",
    label: "open bluesky",
    ic: "↗",
    desc: "bsky.app/profile/syn.horse",
    ext: "https://bsky.app/profile/syn.horse",
  },
]
