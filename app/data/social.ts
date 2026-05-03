export type Social = {
  k: string
  v: string
  href: string
}

export const SOCIAL: Social[] = [
  { k: "github", v: "github.com/synmux", href: "https://github.com/synmux" },
  { k: "mastodon", v: "basilisk.gallery/@dave", href: "https://basilisk.gallery/@dave" },
  { k: "bluesky", v: "bsky.app/profile/syn.horse", href: "https://bsky.app/profile/syn.horse" },
  { k: "facebook", v: "facebook.com/synmux", href: "https://facebook.com/synmux" },
  { k: "threads", v: "@synmux", href: "https://threads.com/@synmux" },
  { k: "instagram", v: "@synmux", href: "https://instagram.com/synmux" },
  { k: "email", v: "hi@syn.horse", href: "mailto:hi@syn.horse" },
  { k: "rss", v: "/feed.xml", href: "/feed.xml" },
]
