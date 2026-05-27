/**
 * The payload accepted by every {@link Adapter}.
 *
 * `channel` is the logical destination (e.g. the paging channel a message
 * originated on); adapters MAY map it to a provider-specific concept such as
 * an ntfy topic or a Pushover sound.
 */
export type Notification = {
  channel: string
  content: string
}

/**
 * Contract implemented by every delivery backend (ntfy, Pushover, the
 * in-development stub, ...).
 *
 * Each adapter translates a {@link Notification} into a provider-specific
 * API call and reports whether the provider accepted it.
 */
export interface Adapter {
  /**
   * Stable identifier used by `getAdapter` to look this adapter up at
   * runtime. Must match one of the cases in `src/adapters/index.ts`.
   */
  name: string

  /**
   * Deliver a notification through the underlying provider.
   *
   * @param env - Worker environment used to access the provider's API.
   * @param message - The notification to deliver.
   * @returns `true` when the provider accepted the message, `false` when it
   *   refused. Network and protocol errors SHOULD be thrown so the caller
   *   can decide whether to retry the queue message.
   */
  send(env: Env, message: Notification): Promise<boolean>
}
