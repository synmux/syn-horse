/* syn.horse — content data */

const REAL_POSTS = [
  {
    slug: "0x5f3759df-a-true-magic-number",
    date: "2025.01.13",
    title: "0x5f3759df: a true magic number",
    desc: "fast inverse square root, the line of code that taught a generation of game devs to fear math.",
    tags: ["nerd"],
    read: "6 min",
    real: true
  },
  {
    slug: "getting-started-with-meshtastic",
    date: "2025.01.14",
    title: "getting started with meshtastic",
    desc: "lora radios, $40, and a small mesh of friends pretending the internet doesn't exist.",
    tags: ["hardware"],
    read: "7 min",
    real: true
  },
  {
    slug: "we-have-to-call-the-police-flying-with-flipper-zero",
    date: "2025.01.15",
    title: "we have to call the police: flying with a flipper zero",
    desc: "TSA does not have a sense of humour. neither do i, anymore.",
    tags: ["rant"],
    read: "5 min",
    real: true
  },
  {
    slug: "prometheus-is-cool-and-good",
    date: "2025.01.16",
    title: "prometheus is cool and good",
    desc: "metrics, dashboards, and the sweet sound of a homelab finally telling on itself.",
    tags: ["ops"],
    read: "12 min",
    real: true
  },
  {
    slug: "how-i-turned-notion-into-a-blog",
    date: "2025.01.20",
    title: "how i turned notion into a blog",
    desc: "the original sin. before this very rewrite. cron jobs and webhooks. would not recommend.",
    tags: ["build"],
    read: "18 min",
    real: true
  },
  {
    slug: "reproductiverights-gov",
    date: "2025.01.23",
    title: "reproductiverights.gov",
    desc: "a domain that became a battleground. on what disappears when an administration decides it should.",
    tags: ["rant", "politics"],
    read: "14 min",
    real: true
  },
  {
    slug: "genderbase",
    date: "2025.03.27",
    title: "genderbase",
    desc: "why i built a directory of gender-affirming resources. the tech is the easy part.",
    tags: ["build", "politics"],
    read: "6 min",
    real: true
  },
  {
    slug: "good-times-in-the-shell",
    date: "2025.04.11",
    title: "good times in the shell",
    desc: "fish, fisher, tide, atuin, eza, fzf, mise, opencommit. the cull, the survivors. a long love letter.",
    tags: ["shell", "nerd"],
    read: "20 min",
    real: true
  },
  {
    slug: "microcommissioning",
    date: "2025.04.15",
    title: "microcommissioning",
    desc: "paying $20 for a small weird thing that didn't exist yesterday. the best money i spend.",
    tags: ["rant"],
    read: "4 min",
    real: true
  },
  {
    slug: "ai-knows-just-how-to-manipulate-you",
    date: "2025.04.28",
    title: "ai knows just how to manipulate you",
    desc: "on the slow normalisation of having a chatbot grade your homework / your therapist / your day.",
    tags: ["rant"],
    read: "9 min",
    real: true
  },
  {
    slug: "not-everyone-can-use-a-vpn",
    date: "2025.08.21",
    title: "not everyone can use a vpn",
    desc: 'a reminder that the threat model behind "just use mullvad" is privileged on its face.',
    tags: ["rant", "politics"],
    read: "5 min",
    real: true
  },
  {
    slug: "neurakink",
    date: "2025.08.26",
    title: "neurakink",
    desc: "a survey of consumer eeg headsets and the people doing weird things with them. yes that includes me.",
    tags: ["hardware", "nerd"],
    read: "15 min",
    real: true
  },
  {
    slug: "taming-mcp-madness-with-metamcp-and-tailscale",
    date: "2025.09.06",
    title: "taming mcp madness with metamcp and tailscale",
    desc: "one mcp server to rule them all. plus a tailnet. plus a bad mood.",
    tags: ["ops", "build"],
    read: "17 min",
    real: true
  },
  {
    slug: "sdam-and-living-without-recall",
    date: "2025.09.08",
    title: "sdam, and living without recall",
    desc: "severely deficient autobiographical memory. what it's like to remember the facts but not the moment.",
    tags: ["personal"],
    read: "21 min",
    real: true
  },
  {
    slug: "i-am-not-an-ms-warrior",
    date: "2025.09.20",
    title: "i am not an ms warrior",
    desc: "on the language of chronic illness. i am not battling anything. i am just tired.",
    tags: ["personal"],
    read: "11 min",
    real: true
  }
]

const FAKE_POSTS = [
  {
    slug: "computers-got-too-polite",
    date: "2026.04.18",
    title: "computers got too polite",
    desc: "every interface now sounds like a flight attendant who has been instructed never to say anything useful.",
    tags: ["rant"],
    read: "6 min",
    real: false
  },
  {
    slug: "against-the-engagement-metric",
    date: "2026.02.11",
    title: "against the engagement metric",
    desc: "on running a personal site with one number that goes up sometimes. (it is the uptime counter.)",
    tags: ["rant", "meta"],
    read: "5 min",
    real: false
  }
]

const POSTS = [...FAKE_POSTS, ...REAL_POSTS].sort((a, b) => b.date.localeCompare(a.date))

const TAG_COUNTS = (() => {
  const m = {}
  POSTS.forEach((p) => p.tags.forEach((t) => (m[t] = (m[t] || 0) + 1)))
  return Object.entries(m).sort((a, b) => b[1] - a[1])
})()

const PROJECTS = [
  {
    name: "syn.horse",
    yr: "2026",
    desc: "this site. nuxt 4 on cloudflare workers. the third rewrite. the last one. probably.",
    url: "syn.horse",
    tags: [{ l: "PRIMARY", k: "hot" }, { l: "NUXT", k: "cool" }, { l: "OSS" }]
  },
  {
    name: "genderbase",
    yr: "2025",
    desc: "a directory of gender-affirming resources. low ui, high index. pulls from a few good sources, refuses to pull from bad ones.",
    url: "genderbase.com",
    tags: [{ l: "LIVE", k: "hot" }, { l: "NUXT" }, { l: "WIKI" }]
  },
  {
    name: "rhymepass",
    yr: "2024",
    desc: "generates rhyming passwords. yes, really. yes, secure. yes, you can give the support engineer a poem.",
    url: "github.com/synmux/rhymepass",
    tags: [{ l: "OSS", k: "cool" }, { l: "CLI" }]
  },
  {
    name: "recon",
    yr: "2024",
    desc: "resize and convert images on iOS. a small, opinionated, genuinely fast tool. no subscription. it just runs.",
    url: "apps.apple.com/recon",
    tags: [{ l: "iOS", k: "lilac" }, { l: "INDIE" }]
  },
  {
    name: "lics",
    yr: "2024",
    desc: "manage your licence keys at the cli with notion. notion is the database, the cli is the cope.",
    url: "github.com/synmux/lics",
    tags: [{ l: "OSS", k: "cool" }, { l: "CLI" }, { l: "NOTION" }]
  },
  {
    name: "noti",
    yr: "2023",
    desc: "monitor a process and trigger a notification. for when you start `pnpm build` and walk away to despair.",
    url: "github.com/synmux/noti",
    tags: [{ l: "OSS" }, { l: "CLI" }]
  },
  {
    name: "dcw.soy",
    yr: "2024",
    desc: "a duck or a soy? a static site that asks the only question that matters. ssl by cloudflare, vibes by no one.",
    url: "dcw.soy",
    tags: [{ l: "WEIRD", k: "warn" }, { l: "STATIC" }]
  },
  {
    name: "tabby",
    yr: "2023",
    desc: "a personal new tab dashboard. todos, weather, RSS, the lot. for the kind of person who hates speed dial.",
    url: "github.com/synmux/tabby",
    tags: [{ l: "OSS" }, { l: "WEB" }]
  }
]

const DOMAINS = [
  {
    base: "syn",
    tld: "horse",
    cls: "",
    desc: "the main one. you're on it. blog, cv, projects, this whole mess.",
    status: "ok",
    statusText: "live · primary"
  },
  {
    base: "syn",
    tld: "as",
    cls: "alt",
    desc: "redirects here. mostly. used as a personal short-domain for everything.",
    status: "ok",
    statusText: "redirect 301"
  },
  {
    base: "syn",
    tld: "haus",
    cls: "alt2",
    desc: "germany doesn't allow umlauts in tlds, so this is the next best thing. also redirects.",
    status: "ok",
    statusText: "redirect 301"
  },
  {
    base: "syn",
    tld: "pink",
    cls: "alt3",
    desc: "a colour. an aesthetic. eventually a small landing page that exclusively shouts.",
    status: "park",
    statusText: "parked"
  },
  {
    base: "dcw",
    tld: "soy",
    cls: "alt2",
    desc: "a duck or a soy. it's a question. there is a wrong answer.",
    status: "warn",
    statusText: "live · niche"
  }
]

const SOCIAL = [
  { k: "github", v: "github.com/synmux", href: "https://github.com/synmux" },
  { k: "mastodon", v: "basilisk.gallery/@dave", href: "https://basilisk.gallery/@dave" },
  { k: "bluesky", v: "bsky.app/profile/syn.horse", href: "https://bsky.app/profile/syn.horse" },
  { k: "facebook", v: "facebook.com/synmux", href: "https://facebook.com/synmux" },
  { k: "threads", v: "@synmux", href: "https://threads.com/@synmux" },
  { k: "instagram", v: "@synmux", href: "https://instagram.com/synmux" },
  { k: "email", v: "hi@syn.horse", href: "mailto:hi@syn.horse" },
  { k: "rss", v: "/feed.xml", href: "/feed.xml" }
]

const IM = [
  { name: "signal", note: "preferred. ask for my number.", ok: true },
  { name: "whatsapp", note: "works. ask for my number.", ok: true },
  { name: "telegram", note: "fine. ask for my number.", ok: true },
  { name: "messenger", note: "sigh. ask anyway.", ok: true }
]

const CV_ROLES = [
  {
    dt: "2023 — now",
    place: "ambio.systems",
    loc: "remote · uk",
    title: "staff devops engineer",
    desc: "platform team-of-one. cloudflare workers, terraform, nomad, a small mountain of yaml. shipped the auth platform that everyone now politely complains about.",
    stack: ["terraform", "nomad", "cloudflare", "rust", "typescript"]
  },
  {
    dt: "2021 — 2023",
    place: "tecapps",
    loc: "remote",
    title: "senior site reliability engineer",
    desc: "on-call rotation, kubernetes, prometheus, grafana. wrote the runbook nobody wanted. then they wanted it.",
    stack: ["kubernetes", "prometheus", "grafana", "aws", "go"]
  },
  {
    dt: "2019 — 2021",
    place: "a fintech you've heard of",
    loc: "london · uk",
    title: "devops engineer",
    desc: "turned a hand-rolled jenkins farm into something that occasionally finished. paged at 3am for a year. learned what tolerable means.",
    stack: ["jenkins", "aws", "python", "ansible"]
  },
  {
    dt: "2016 — 2019",
    place: "a startup that died gracefully",
    loc: "london · uk",
    title: "sysadmin / generalist",
    desc: "racked servers in a colo. wrote the deploy script. answered the support email. all in one tuesday.",
    stack: ["debian", "bash", "postgres", "nginx"]
  }
]

const TALKS = [
  { yr: "2025", title: "meshtastic for people who already have too many hobbies", venue: "emfcamp · uk" },
  { yr: "2024", title: "metrics or it didn't happen", venue: "srecon emea" },
  { yr: "2024", title: "i ran a blog on notion (do not do this)", venue: "state of the web · london" },
  { yr: "2023", title: "cloudflare workers without losing your mind", venue: "devopsdays london" },
  { yr: "2022", title: "on-call is a culture problem", venue: "sre lounge meetup" }
]

const SIDE = [
  {
    name: "meshtastic node FOXP1",
    desc: "a heltec v3 in a sandwich box on a ridge. relays for ~12km. mostly relays jokes.",
    yr: "ongoing"
  },
  {
    name: "a homelab",
    desc: "three intel nucs, a synology, more wireguard than is strictly necessary.",
    yr: "ongoing"
  },
  {
    name: "a small zine",
    desc: "one issue a year. essays + photographs. printed at home on a riso clone.",
    yr: "2024 — now"
  },
  {
    name: "community organising",
    desc: "a local mutual-aid mesh + a small queer tech reading group.",
    yr: "2022 — now"
  }
]

const COMMANDS = [
  { id: "home", label: "go home", ic: "~", desc: "/ index" },
  { id: "now", label: "/now", ic: ">", desc: "what i'm doing this month" },
  { id: "projects", label: "projects", ic: ">", desc: "things i made" },
  { id: "blog", label: "blog index", ic: ">", desc: "all the words" },
  { id: "cv", label: "cv", ic: ">", desc: "work history, talks, side projects" },
  { id: "contact", label: "contact", ic: ">", desc: "how to reach me. (politely.)" },
  { id: "domains", label: "domains", ic: ">", desc: "the syn.* family" },
  { id: "404", label: "404", ic: "!", desc: "the hostile one" },
  { id: "github", label: "open github", ic: "↗", desc: "github.com/synmux", ext: "https://github.com/synmux" },
  {
    id: "mast",
    label: "open mastodon",
    ic: "↗",
    desc: "basilisk.gallery/@dave",
    ext: "https://basilisk.gallery/@dave"
  },
  {
    id: "bsky",
    label: "open bluesky",
    ic: "↗",
    desc: "bsky.app/profile/syn.horse",
    ext: "https://bsky.app/profile/syn.horse"
  }
]

Object.assign(window, {
  POSTS,
  REAL_POSTS,
  FAKE_POSTS,
  TAG_COUNTS,
  PROJECTS,
  DOMAINS,
  SOCIAL,
  IM,
  CV_ROLES,
  TALKS,
  SIDE,
  COMMANDS
})
