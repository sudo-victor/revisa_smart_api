import DomainEvent from "@/core/domain/domain-event"
import { Queue } from "../queue/queue"
import { Storage } from "../storage/storage";
import { TextCaptureRecord } from "../../enterprise/entities/text-capture-record";
import { TextCaptureRecordRepository } from "../repositories/text-capture-record-repository";
import { FilenameService } from "../../enterprise/services/filename-service";

export class RequestExtractTextFromImageUsecase {
  constructor(
    private textCaptureRecordRepository: TextCaptureRecordRepository,
    private queue: Queue,
    private storage: Storage
  ) {}

  async execute(props: Input): Promise<Output> {
    const filename = FilenameService.generate(props.mimetype)
    await this.storage.upload({
      filename: filename,
      mimetype: props.mimetype,
      content: props.file_as_buffer,
    })
    const textCaptureRecord = TextCaptureRecord.create({
      photo_path: filename
    })
    textCaptureRecord.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    textCaptureRecord.process()
    await this.textCaptureRecordRepository.create(textCaptureRecord)
    return { id: textCaptureRecord.id.value }
  }
}

type Input = {
  mimetype: string
  file_as_buffer: Buffer
}

type Output = {
  id: string
}
