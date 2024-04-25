import { Storage } from "@/core/storage/storage"
import DomainEvent from "@/core/domain/domain-event"
import { EntityId } from "@/core/domain/entity-id"
import { Queue } from "@/domain/essay/application/queue/queue"
import { QuizRequestRepository } from "../repositories/quiz-request-repository"
import { FileRepository } from "../repositories/file-repository"
import { File } from "../../enterprise/entities/file"
import { QuizRequest } from "../../enterprise/entities/quiz-request"

export class RequestQuizFromFileUsecase {
  constructor(
    private quizRequestRepository: QuizRequestRepository,
    private fileRepository: FileRepository,
    private storage: Storage,
    private queue: Queue
  ) {}

  async execute(props: Input): Promise<Output> {
    const file = File.create({ mimetype: props.mimetype })
    await this.storage.upload({
      filename: file.filename,
      mimetype: file.mimetype,
      content: props.file_as_buffer,
    })
    await this.fileRepository.create(file)
    const quizRequest = QuizRequest.create({
      file_id: file.id,
      quiz_id: null,
      creator_id: new EntityId(props.creator_id)
    })
    quizRequest.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    quizRequest.process()
    await this.quizRequestRepository.create(quizRequest)
    return { id: quizRequest.id.value }
  }
}

type Input = {
  creator_id: string
  mimetype: string
  file_as_buffer: Buffer
}

type Output = {
  id: string
}
