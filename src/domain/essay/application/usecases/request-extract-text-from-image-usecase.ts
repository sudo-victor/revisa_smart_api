import DomainEvent from "@/core/domain/domain-event"
import { Queue } from "../queue/queue"
import { TextCaptureRecord } from "../../enterprise/entities/text-capture-record";
import { TextCaptureRecordRepository } from "../repositories/text-capture-record-repository";

export class RequestExtractTextFromImageUsecase {
  constructor(
    private textCaptureRecordRepository: TextCaptureRecordRepository,
    private queue: Queue
  ) {}

  async execute(props: Input): Promise<Output> {
    const textCaptureRecord = TextCaptureRecord.create({})
    textCaptureRecord.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    textCaptureRecord.process(props.file_as_buffer)
    await this.textCaptureRecordRepository.create(textCaptureRecord)
    return { id: textCaptureRecord.id.value }
  }
}

type Input = {
  file_as_buffer: Buffer
}

type Output = {
  id: string
}
