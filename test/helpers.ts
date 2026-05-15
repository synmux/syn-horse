import { env } from "cloudflare:test"
import type { Message } from "../src/schema.ts"

export function makeMessageId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function makeMessage(overrides: Partial<Message> = {}): Message {
  return {
    channel: "red",
    contact: "alerts@example.com",
    message: "Test page",
    source: "10.0.0.1",
    ...overrides,
  }
}

export async function queryLog(id: string): Promise<Record<string, unknown> | null> {
  const result = await env.DB.prepare("SELECT * FROM log WHERE id = ?").bind(id).first()
  return result as Record<string, unknown> | null
}
