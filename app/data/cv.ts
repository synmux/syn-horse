export type CvRole = {
  dt: string
  place: string
  loc: string
  title: string
  desc: string
  stack: string[]
}

export type Talk = {
  yr: string
  title: string
  venue: string
}

export type SideProject = {
  name: string
  desc: string
  yr: string
}

export const CV_ROLES: CvRole[] = [
  {
    dt: "2023 — now",
    place: "ambio.systems",
    loc: "remote · uk",
    title: "staff devops engineer",
    desc: "platform team-of-one. cloudflare workers, terraform, nomad, a small mountain of yaml. shipped the auth platform that everyone now politely complains about.",
    stack: ["terraform", "nomad", "cloudflare", "rust", "typescript"],
  },
  {
    dt: "2021 — 2023",
    place: "tecapps",
    loc: "remote",
    title: "senior site reliability engineer",
    desc: "on-call rotation, kubernetes, prometheus, grafana. wrote the runbook nobody wanted. then they wanted it.",
    stack: ["kubernetes", "prometheus", "grafana", "aws", "go"],
  },
  {
    dt: "2019 — 2021",
    place: "a fintech you've heard of",
    loc: "london · uk",
    title: "devops engineer",
    desc: "turned a hand-rolled jenkins farm into something that occasionally finished. paged at 3am for a year. learned what tolerable means.",
    stack: ["jenkins", "aws", "python", "ansible"],
  },
  {
    dt: "2016 — 2019",
    place: "a startup that died gracefully",
    loc: "london · uk",
    title: "sysadmin / generalist",
    desc: "racked servers in a colo. wrote the deploy script. answered the support email. all in one tuesday.",
    stack: ["debian", "bash", "postgres", "nginx"],
  },
]

export const TALKS: Talk[] = [
  {
    yr: "2025",
    title: "meshtastic for people who already have too many hobbies",
    venue: "emfcamp · uk",
  },
  { yr: "2024", title: "metrics or it didn't happen", venue: "srecon emea" },
  {
    yr: "2024",
    title: "i ran a blog on notion (do not do this)",
    venue: "state of the web · london",
  },
  {
    yr: "2023",
    title: "cloudflare workers without losing your mind",
    venue: "devopsdays london",
  },
  { yr: "2022", title: "on-call is a culture problem", venue: "sre lounge meetup" },
]

export const SIDE: SideProject[] = [
  {
    name: "meshtastic node FOXP1",
    desc: "a heltec v3 in a sandwich box on a ridge. relays for ~12km. mostly relays jokes.",
    yr: "ongoing",
  },
  {
    name: "a homelab",
    desc: "three intel nucs, a synology, more wireguard than is strictly necessary.",
    yr: "ongoing",
  },
  {
    name: "a small zine",
    desc: "one issue a year. essays + photographs. printed at home on a riso clone.",
    yr: "2024 — now",
  },
  {
    name: "community organising",
    desc: "a local mutual-aid mesh + a small queer tech reading group.",
    yr: "2022 — now",
  },
]
