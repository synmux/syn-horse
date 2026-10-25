// goodies - files published at public.syn.horse and listed on /goodies.
// sizes are decorative approximations; refresh them when the files
// change upstream.
export interface Goody {
  desc: string
  path: string
  size: string
  url: string
}

export const GOODIES: Goody[] = [
  {
    path: "ctrld.tar.zst",
    size: "~2k",
    desc: "controld block page root ca. includes install scripts.",
    url: "https://public.syn.horse/files/ctrld.tar.zst",
  },
  {
    path: "cv.pdf",
    size: "~243k",
    desc: "my cv. once again: hire me.",
    url: "https://public.syn.horse/files/cv.pdf",
  },
  {
    path: "gpg",
    size: "~12k",
    desc: "my public gpg keys. encrypt things to me, verify things from me.",
    url: "https://public.syn.horse/gpg",
  },
  {
    path: "nf.tar.zst",
    size: "~2.2g",
    desc: "nerd fonts; just the font files. includes ioskeley as a bonus.",
    url: "https://public.syn.horse/files/nf.tar.zst",
  },
  {
    path: "ssh",
    size: "~1k",
    desc: "my public ssh keys. drop them in authorized_keys and we're flatmates.",
    url: "https://public.syn.horse/ssh",
  },
  {
    path: "sudo",
    size: "~88b",
    desc: "one line of sudoers, should you wish to give me root.",
    url: "https://public.syn.horse/sudo",
  },
]

// secret goodies - revealed on /goodies only while konami mode is active.
// these are placeholders; swap in real files once they exist at the urls
// (they 404 on public.syn.horse until then). their size renders as the
// classified stamp, so keep it a word rather than a number.
export const SECRET_GOODIES: Goody[] = [
  {
    path: "avf.tar.zst",
    size: "classified",
    desc: "access virus firmware. for use with ostirus.",
    url: "https://public.syn.horse/files/avf.tar.zst",
  },
  {
    path: "doof.tar.zst",
    size: "classified",
    desc: "music. gay ebm and industrial goodness.",
    url: "https://public.syn.horse/files/doof.tar.zst",
  },
  {
    path: "bugs.tar.zst",
    size: "classified",
    desc: "bugs (1995). the whole series. keep an eye out for my favourite prop, the password entry terminal at the end of 'manna from heaven'.",
    url: "https://public.syn.horse/files/bugs.tar.zst",
  },
]
