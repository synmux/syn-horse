export type DomainStatus = "ok" | "warn" | "park"
export type DomainCls = "" | "alt" | "alt2" | "alt3"

export type Domain = {
  base: string
  tld: string
  cls: DomainCls
  desc: string
  status: DomainStatus
  statusText: string
}

export const DOMAINS: Domain[] = [
  {
    base: "syn",
    tld: "horse",
    cls: "",
    desc: "the main one. you're on it. blog, cv, projects, this whole mess.",
    status: "ok",
    statusText: "live · primary",
  },
  {
    base: "syn",
    tld: "as",
    cls: "alt",
    desc: "redirects here. mostly. used as a personal short-domain for everything.",
    status: "ok",
    statusText: "redirect 301",
  },
  {
    base: "syn",
    tld: "haus",
    cls: "alt2",
    desc: "germany doesn't allow umlauts in tlds, so this is the next best thing. also redirects.",
    status: "ok",
    statusText: "redirect 301",
  },
  {
    base: "syn",
    tld: "pink",
    cls: "alt3",
    desc: "a colour. an aesthetic. eventually a small landing page that exclusively shouts.",
    status: "park",
    statusText: "parked",
  },
  {
    base: "dcw",
    tld: "soy",
    cls: "alt2",
    desc: "a duck or a soy. it's a question. there is a wrong answer.",
    status: "warn",
    statusText: "live · niche",
  },
]
