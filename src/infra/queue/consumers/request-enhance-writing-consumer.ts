import { Queue } from "@/domain/essay/application/queue/queue";
import { ProcessEnhanceWritingResourcesUsecase } from "@/domain/essay/application/usecases/process-enhance-writing-resources-usecase";
import { EnhanceWritingEvent } from "@/domain/essay/enterprise/events/enhance-writing-event";

export class RequestEnhanceWritingConsumer {
  constructor(
    private queue: Queue,
    private processEnhanceWritingResourcesUsecase: ProcessEnhanceWritingResourcesUsecase
  ) { }

  async hander() {
    this.queue.consume(EnhanceWritingEvent.name, async (data: string) => {
      try {
        const input = JSON.parse(data)
        if (input.name !== EnhanceWritingEvent.name) return
        await this.processEnhanceWritingResourcesUsecase.execute({
          id: input.id
        })
      } catch (err: any) {
        console.log(err.message)
      }
    })
    console.log(`👂🏽 Starting listening: ${EnhanceWritingEvent.name}`)
  }
}