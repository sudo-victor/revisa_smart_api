import { Queue } from "@/domain/essay/application/queue/queue";
import { ProcessExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/process-extract-text-from-image-usecase";
import { ExtractTextFromImageEvent } from "@/domain/essay/enterprise/events/extract-text-from-image-event";

export class RequestExtractFromImageConsumer {
  constructor(
    private queue: Queue,
    private processExtractTextFromImageUsecase: ProcessExtractTextFromImageUsecase
  ) { }

  async handler() {
    this.queue.consume(ExtractTextFromImageEvent.name, async (data: string, event: string) => {
      try {
        const input = JSON.parse(data)
        if (input.name !== ExtractTextFromImageEvent.name) return
        await this.processExtractTextFromImageUsecase.execute({
          id: input.id,
          image_buffer: input.image_buffer
        })
      } catch (err: any) {
        console.log(err.message)
      }
    })
    console.log(`👂🏽 Starting listening: ${ExtractTextFromImageEvent.name}`)
  }
}