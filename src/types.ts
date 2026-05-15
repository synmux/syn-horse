export type Notification = {
  channel: string
  content: string
}
export interface Adapter {
  name: string
  send(message: Notification): Promise<boolean>
}
