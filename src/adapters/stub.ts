import { Adapter, Notification } from "../types.ts"

/**
 * No-op delivery adapter used in development and tests.
 *
 * Always reports success without performing any network I/O. Selected by
 * the delivery stage today while the real adapters are still stubs.
 */
const stub: Adapter = {
  name: "stub",
  send: async (_message: Notification): Promise<boolean> => true,
}

export default stub
