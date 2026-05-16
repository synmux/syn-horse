export type StageResult = { kind: "continue" } | { kind: "stop" }

export const CONTINUE: StageResult = { kind: "continue" }
export const STOP: StageResult = { kind: "stop" }
