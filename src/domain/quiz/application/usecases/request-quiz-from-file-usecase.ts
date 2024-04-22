import { Storage } from "@/core/storage/storage"
import { FilenameService } from "@/domain/essay/enterprise/services/filename-service"
import { QuizRequest } from "../../enterprise/entities/quiz-request"
import { QuizRequestRepository } from "../repositories/quiz-request-repository"
import { Queue } from "@/domain/essay/application/queue/queue"
import DomainEvent from "@/core/domain/domain-event"

export class RequestQuizFromFileUsecase {
  constructor(
    private quizRequestRepository: QuizRequestRepository,
    private storage: Storage,
    private queue: Queue
  ) {}

  async execute(props: Input): Promise<Output> {
    const filename = FilenameService.generate(props.mimetype)
    await this.storage.upload({
      filename: filename,
      mimetype: props.mimetype,
      content: props.file_as_buffer,
    })
    const quizRequest = QuizRequest.create({
      file_path: filename,
      quiz_id: null
    })
    quizRequest.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    await this.quizRequestRepository.create(quizRequest)
    return { id: quizRequest.id.value }
  }
}

type Input = {
  mimetype: string
  file_as_buffer: Buffer
}

type Output = {
  id: string
}
