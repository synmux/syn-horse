export interface Command {
  desc: string
  ext?: string
  ic: string
  id: string
  joke?: { kind: "toast" | "shake-toast" | "descend"; message: string }
  konamiNote?: string
  label: string
}

export const COMMANDS: Command[] = [
  { id: "home", label: "/home", ic: "~", desc: "/ index" },
  { id: "now", label: "/now", ic: ">", desc: "what i'm doing this month" },
  {
    id: "projects",
    label: "/projects",
    ic: ">",
    desc: "things i made",
    konamiNote: "hidden secrets revealed",
  },
  { id: "blog", label: "/blog", ic: ">", desc: "all the words" },
  {
    id: "cv",
    label: "/cv",
    ic: ">",
    desc: "work history, talks, side projects",
  },
  {
    id: "contact",
    label: "/contact",
    ic: ">",
    desc: "how to reach me. (politely.)",
  },
  { id: "domains", label: "/domains", ic: ">", desc: "the syn.* family" },
  {
    id: "panic",
    label: "/panic",
    ic: "!",
    desc: "page syn. emergency or otherwise.",
  },
  { id: "404", label: "/404", ic: "!", desc: "the hostile one" },
  {
    id: "github",
    label: "/github",
    ic: "↗",
    desc: "github.com/synmux",
    ext: "https://github.com/synmux",
  },
  {
    id: "mast",
    label: "/mastodon",
    ic: "↗",
    desc: "basilisk.gallery/@dave",
    ext: "https://basilisk.gallery/@dave",
  },
  {
    id: "bsky",
    label: "/bluesky",
    ic: "↗",
    desc: "bsky.app/profile/syn.horse",
    ext: "https://bsky.app/profile/syn.horse",
  },
]

export const KONAMI_COMMANDS: Command[] = [
  {
    id: "feed-horse",
    label: "/feed-horse",
    ic: "★",
    desc: "the horse is hungry.",
    joke: { kind: "toast", message: "horse fed. mood: smug." },
  },
  {
    id: "kick-the-can",
    label: "/kick-the-can",
    ic: "★",
    desc: "punt today's problem to next quarter.",
    joke: { kind: "toast", message: "the can sails into the abyss." },
  },
  {
    id: "rm-rf-feelings",
    label: "/rm-rf-feelings",
    ic: "★",
    desc: "remove all emotional state.",
    joke: {
      kind: "shake-toast",
      message: "operation not permitted: too late.",
    },
  },
  {
    id: "cd-null",
    label: "/cd-null",
    ic: "★",
    desc: "descend into the void.",
    joke: { kind: "descend", message: "" },
  },
]
