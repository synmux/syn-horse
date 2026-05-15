export interface Adapter {
  name: string
  send(message: Message): Promise<boolean>
}
