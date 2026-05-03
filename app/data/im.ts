export type IMEntry = {
  name: string
  note: string
  ok: boolean
}

export const IM: IMEntry[] = [
  { name: "signal", note: "preferred. ask for my number.", ok: true },
  { name: "whatsapp", note: "works. ask for my number.", ok: true },
  { name: "telegram", note: "fine. ask for my number.", ok: true },
  { name: "messenger", note: "sigh. ask anyway.", ok: true },
]
