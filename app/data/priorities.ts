export type PriorityCode = "P0" | "P1" | "P2" | "P3" | "P4" | "P5"
export type Channel = "red" | "green"

export type Priority = {
  code: PriorityCode
  channel: Channel
  title: string
  body: string
}

export const PRIORITIES: Priority[] = [
  {
    code: "P0",
    channel: "red",
    title: "DROP EVERYTHING, THIS IS AN EMERGENCY",
    body: "prod is down. people are screaming. it does not matter what time it is.",
  },
  {
    code: "P1",
    channel: "red",
    title: "really bad, right now",
    body: "something critical is on fire. not all-hands, but right-this-minute.",
  },
  {
    code: "P2",
    channel: "green",
    title: "important — but i can finish my coffee",
    body: "needs eyes today. not blocking everything. coffee is allowed first.",
  },
  {
    code: "P3",
    channel: "green",
    title: "today, please",
    body: "annoying but not urgent. pencil it in.",
  },
  {
    code: "P4",
    channel: "green",
    title: "this week, ideally",
    body: "low. nice-to-have. won't ruin anyone's day if it slips.",
  },
  {
    code: "P5",
    channel: "green",
    title: "lowest priority",
    body: "fix it when bored. or never. whatever.",
  },
]

export const PRIORITY_CODES = PRIORITIES.map((priority) => priority.code) as [PriorityCode, ...PriorityCode[]]

export const RED_CODES: PriorityCode[] = PRIORITIES.filter((priority) => priority.channel === "red").map(
  (priority) => priority.code,
)

export const GREEN_CODES: PriorityCode[] = PRIORITIES.filter((priority) => priority.channel === "green").map(
  (priority) => priority.code,
)

export const priorityIsRed = (code: PriorityCode): boolean => RED_CODES.includes(code)
export const priorityIsGreen = (code: PriorityCode): boolean => GREEN_CODES.includes(code)
