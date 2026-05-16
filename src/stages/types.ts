/**
 * Signal returned by every pipeline stage.
 *
 * `continue` means the queue handler should run the next stage. `stop` means
 * the stage has already taken terminal action (typically: writing a
 * `dropped` row and letting the caller ack the queue message) and no
 * further stages should run for this message.
 */
export type StageResult = { kind: "continue" } | { kind: "stop" }

/** Singleton `continue` result; reuse to avoid per-message allocations. */
export const CONTINUE: StageResult = { kind: "continue" }

/** Singleton `stop` result; reuse to avoid per-message allocations. */
export const STOP: StageResult = { kind: "stop" }
