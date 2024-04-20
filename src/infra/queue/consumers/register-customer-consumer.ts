import { StudentCreatedEvent } from "@/domain/account/enterprise/events/student-created-event";
import { Queue } from "@/domain/essay/application/queue/queue";
import { RegisterSubscriptionReferenceUsecase } from "@/domain/subscription/application/usecases/register-subscription-reference-usecase";

export class RegisterCustomerConsumer {
  constructor(
    private queue: Queue,
    private registerSubscriptionReferenceUsecase: RegisterSubscriptionReferenceUsecase
  ) { }

  async handler() {
    this.queue.consume(StudentCreatedEvent.name, async (data: string) => {
      try {
        const input = JSON.parse(data)
        if (input.name !== StudentCreatedEvent.name) return
        await this.registerSubscriptionReferenceUsecase.execute({
          user_id: input.id
        })
      } catch (err: any) {
        console.log(err.message)
      }
    })
    console.log(`👂🏽 Starting listening: ${StudentCreatedEvent.name}`)
  }
}