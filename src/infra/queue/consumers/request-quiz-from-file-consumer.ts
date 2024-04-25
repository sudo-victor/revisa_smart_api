import { Queue } from "@/domain/essay/application/queue/queue";
import { ProcessQuizFromFileUsecase } from "@/domain/quiz/application/usecases/process-quiz-from-file-usecase";
import { GenerateQuizFromFileEvent } from "@/domain/quiz/enterprise/events/generate-quiz-from-file-event";

export class RequestQuizFromFileConsumer {
  constructor(
    private queue: Queue,
    private processQuizFromFileUsecase: ProcessQuizFromFileUsecase
  ) { }

  async handler() {
    this.queue.consume(GenerateQuizFromFileEvent.name, async (data: string, event: string) => {
      try {
        const input = JSON.parse(data)
        if (input.name !== GenerateQuizFromFileEvent.name) return
        await this.processQuizFromFileUsecase.execute({
          id: input.id
        })
      } catch (err: any) {
        console.log(err.message)
      }
    })
    console.log(`👂🏽 Starting listening: ${GenerateQuizFromFileEvent.name}`)
  }
}