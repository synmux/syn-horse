import getAdapter from "../adapters/index.ts";
import { type Result, updateDelivery } from "../db.ts";
import type { Payload } from "../schema.ts";
import { CONTINUE, type StageResult } from "./types.ts";

/**
 * What to do when an adapter in the chain reports failure.
 *
 * - `stop` — abort the remaining adapters and record the message as
 *   `failed`. If the failing adapter *threw* (signalling a transient error
 *   per the {@link Adapter} contract) the error is re-thrown so the queue
 *   handler retries the message; a `false` return (the provider refused
 *   the message) is treated as terminal and not retried.
 * - `skip` — record the failure and continue to the next adapter, so a
 *   later adapter still has a chance to deliver. The terminal result is
 *   `delivered` if at least one adapter accepted, otherwise `failed`.
 */
export type DeliveryFailureMode = "stop" | "skip";

/** Paging channel → delivery adapter. */
const ADAPTER_BY_CHANNEL: Record<Payload["channel"], string> = {
  green: "ntfy",
  red: "pushover",
};

/**
 * Run the delivery stage: hand the message to each requested
 * {@link Adapter} in order and record the outcome on the log row.
 *
 * Adapters are resolved by name via {@link getAdapter} so this stage stays
 * consistent with the rest of the codebase, where adapters are referenced
 * by their stable string identifier.
 *
 * "Failure" covers both a `false` return from {@link Adapter.send} (the
 * provider refused the message) and a thrown exception (a transient error
 * worth retrying). `onFailure` chooses between aborting the chain and
 * falling through to the next adapter in either case.
 *
 * The log row records every attempted adapter as a comma-separated list
 * in the `adapter` column, and any failures are surfaced in
 * `result_reason` so an operator can see exactly which adapter rejected
 * the message.
 *
 * @param env - Worker environment used to update the log row.
 * @param id - Message id (the log row primary key).
 * @param payload - The validated message to deliver. The paging channel
 *   selects the adapter: `green` → ntfy, `red` → pushover.
 * @param onFailure - How to react to an adapter failure (see
 *   {@link DeliveryFailureMode}).
 * @returns A {@link StageResult}. Always {@link CONTINUE} — there is no
 *   stage after delivery, but returning a uniform result keeps the stage
 *   signature consistent for the queue handler.
 * @throws If an adapter throws while `onFailure` is `"stop"` (re-thrown so
 *   the queue retries the message).
 */
export async function runDelivery(
  env: Env,
  id: string,
  payload: Payload,
  onFailure: DeliveryFailureMode
): Promise<StageResult> {
  const adapters = [ADAPTER_BY_CHANNEL[payload.channel]];

  const attempted: string[] = [];
  const failures: string[] = [];
  const notification = {
    channel: payload.channel,
    content: payload.message,
    id,
  };

  for (const name of adapters) {
    const adapter = getAdapter(name);
    attempted.push(adapter.name);

    try {
      if (await adapter.send(env, notification)) {
        continue;
      }
      failures.push(`${adapter.name}: refused`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      failures.push(`${adapter.name}: ${reason}`);
      if (onFailure === "stop") {
        // Record the failure then re-throw so the queue retries — a thrown
        // error is the adapter contract's signal for a transient fault.
        await updateDelivery(
          env,
          id,
          attempted.join(","),
          "failed",
          failures.join("; ")
        );
        throw err;
      }
      continue;
    }

    // Reaching here means the adapter returned `false` (refusal). In `stop`
    // mode that is the terminal outcome; refusal is not transient so we do
    // not re-throw — let the queue handler `ack` the message.
    if (onFailure === "stop") {
      await updateDelivery(
        env,
        id,
        attempted.join(","),
        "failed",
        failures.join("; ")
      );
      return CONTINUE;
    }
  }

  const allFailed = failures.length === attempted.length;
  const result: Result = allFailed ? "failed" : "delivered";
  const reason = failures.length > 0 ? failures.join("; ") : undefined;
  await updateDelivery(env, id, attempted.join(","), result, reason);
  return CONTINUE;
}
