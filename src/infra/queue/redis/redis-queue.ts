import { Queue } from "@/domain/essay/application/queue/queue";
import Redis from "ioredis"

export class RedisQueue implements Queue {
  private static instance: RedisQueue | null = null
  private subClient: Redis
  private pubClient: Redis

  private constructor() {
    this.subClient = new Redis()
    this.pubClient = new Redis()

  }

  static getInstance(): RedisQueue {
    if (!this.instance) {
      this.instance = new RedisQueue()
    }
    return this.instance
  }

  async consume(name: string, callback: any): Promise<void> {
    this.subClient.subscribe(name)
    this.subClient.on('message', async (_, message) => {
      await callback(message)
    })
  }

  async publish(name: string, data: string): Promise<void> {
    this.pubClient.publish(name, data)
  }
}
