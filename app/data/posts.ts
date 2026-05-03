export type PostTag = string

export type Post = {
  slug: string
  date: string
  title: string
  desc: string
  tags: PostTag[]
  read: string
  real: boolean
}

export const REAL_POSTS: Post[] = [
  {
    slug: "0x5f3759df-a-true-magic-number",
    date: "2025.01.13",
    title: "0x5f3759df: a true magic number",
    desc: "fast inverse square root, the line of code that taught a generation of game devs to fear math.",
    tags: ["nerd"],
    read: "6 min",
    real: true,
  },
  {
    slug: "getting-started-with-meshtastic",
    date: "2025.01.14",
    title: "getting started with meshtastic",
    desc: "lora radios, $40, and a small mesh of friends pretending the internet doesn't exist.",
    tags: ["hardware"],
    read: "7 min",
    real: true,
  },
  {
    slug: "we-have-to-call-the-police-flying-with-flipper-zero",
    date: "2025.01.15",
    title: "we have to call the police: flying with a flipper zero",
    desc: "TSA does not have a sense of humour. neither do i, anymore.",
    tags: ["rant"],
    read: "5 min",
    real: true,
  },
  {
    slug: "prometheus-is-cool-and-good",
    date: "2025.01.16",
    title: "prometheus is cool and good",
    desc: "metrics, dashboards, and the sweet sound of a homelab finally telling on itself.",
    tags: ["ops"],
    read: "12 min",
    real: true,
  },
  {
    slug: "how-i-turned-notion-into-a-blog",
    date: "2025.01.20",
    title: "how i turned notion into a blog",
    desc: "the original sin. before this very rewrite. cron jobs and webhooks. would not recommend.",
    tags: ["build"],
    read: "18 min",
    real: true,
  },
  {
    slug: "reproductiverights-gov",
    date: "2025.01.23",
    title: "reproductiverights.gov",
    desc: "a domain that became a battleground. on what disappears when an administration decides it should.",
    tags: ["rant", "politics"],
    read: "14 min",
    real: true,
  },
  {
    slug: "genderbase",
    date: "2025.03.27",
    title: "genderbase",
    desc: "why i built a directory of gender-affirming resources. the tech is the easy part.",
    tags: ["build", "politics"],
    read: "6 min",
    real: true,
  },
  {
    slug: "good-times-in-the-shell",
    date: "2025.04.11",
    title: "good times in the shell",
    desc: "fish, fisher, tide, atuin, eza, fzf, mise, opencommit. the cull, the survivors. a long love letter.",
    tags: ["shell", "nerd"],
    read: "20 min",
    real: true,
  },
  {
    slug: "microcommissioning",
    date: "2025.04.15",
    title: "microcommissioning",
    desc: "paying $20 for a small weird thing that didn't exist yesterday. the best money i spend.",
    tags: ["rant"],
    read: "4 min",
    real: true,
  },
  {
    slug: "ai-knows-just-how-to-manipulate-you",
    date: "2025.04.28",
    title: "ai knows just how to manipulate you",
    desc: "on the slow normalisation of having a chatbot grade your homework / your therapist / your day.",
    tags: ["rant"],
    read: "9 min",
    real: true,
  },
  {
    slug: "not-everyone-can-use-a-vpn",
    date: "2025.08.21",
    title: "not everyone can use a vpn",
    desc: 'a reminder that the threat model behind "just use mullvad" is privileged on its face.',
    tags: ["rant", "politics"],
    read: "5 min",
    real: true,
  },
  {
    slug: "neurakink",
    date: "2025.08.26",
    title: "neurakink",
    desc: "a survey of consumer eeg headsets and the people doing weird things with them. yes that includes me.",
    tags: ["hardware", "nerd"],
    read: "15 min",
    real: true,
  },
  {
    slug: "taming-mcp-madness-with-metamcp-and-tailscale",
    date: "2025.09.06",
    title: "taming mcp madness with metamcp and tailscale",
    desc: "one mcp server to rule them all. plus a tailnet. plus a bad mood.",
    tags: ["ops", "build"],
    read: "17 min",
    real: true,
  },
  {
    slug: "sdam-and-living-without-recall",
    date: "2025.09.08",
    title: "sdam, and living without recall",
    desc: "severely deficient autobiographical memory. what it's like to remember the facts but not the moment.",
    tags: ["personal"],
    read: "21 min",
    real: true,
  },
  {
    slug: "i-am-not-an-ms-warrior",
    date: "2025.09.20",
    title: "i am not an ms warrior",
    desc: "on the language of chronic illness. i am not battling anything. i am just tired.",
    tags: ["personal"],
    read: "11 min",
    real: true,
  },
]

export const FAKE_POSTS: Post[] = [
  {
    slug: "computers-got-too-polite",
    date: "2026.04.18",
    title: "computers got too polite",
    desc: "every interface now sounds like a flight attendant who has been instructed never to say anything useful.",
    tags: ["rant"],
    read: "6 min",
    real: false,
  },
  {
    slug: "against-the-engagement-metric",
    date: "2026.02.11",
    title: "against the engagement metric",
    desc: "on running a personal site with one number that goes up sometimes. (it is the uptime counter.)",
    tags: ["rant", "meta"],
    read: "5 min",
    real: false,
  },
]

export const POSTS: Post[] = [...FAKE_POSTS, ...REAL_POSTS].sort((a, b) => b.date.localeCompare(a.date))

export const TAG_COUNTS: Array<[PostTag, number]> = (() => {
  const map = new Map<PostTag, number>()
  for (const p of POSTS) {
    for (const t of p.tags) {
      map.set(t, (map.get(t) ?? 0) + 1)
    }
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
})()
