export abstract class Queue {
  abstract publish(name: string, data: any): Promise<void>
  abstract consume(name: string, callback: Function): Promise<void>
}