import { Queue } from "@/domain/essay/application/queue/queue";
import { ProcessEssayAssessmentUsecase } from "@/domain/essay/application/usecases/process-essay-assessment-usecase";
import { EvaluateEssayEvent } from "@/domain/essay/enterprise/events/evaluate-essay-event";

export class RequestEvaluateConsumer {
  constructor(
    private queue: Queue,
    private processEssayAssessmentUsecase: ProcessEssayAssessmentUsecase
  ) { }

  async hander() {
    this.queue.consume(EvaluateEssayEvent.name, async (data: string) => {
      try {
        const input = JSON.parse(data)
        await this.processEssayAssessmentUsecase.execute({
          id: input.id
        })
      } catch (err: any) {
        console.log(err.message)
      }
    })
    console.log(`👂🏽 Starting listening: ${EvaluateEssayEvent.name}`)
  }
}