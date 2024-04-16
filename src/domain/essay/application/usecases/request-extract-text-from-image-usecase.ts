import DomainEvent from "@/core/domain/domain-event"
import { Queue } from "../queue/queue"
import { Storage } from "../storage/storage";
import { TextCaptureRecord } from "../../enterprise/entities/text-capture-record";
import { TextCaptureRecordRepository } from "../repositories/text-capture-record-repository";
import { FilenameService } from "../../enterprise/services/filename-service";
import { EntityId } from "@/core/domain/entity-id";
import { StudentRepostory } from "@/domain/account/application/repositories/student-repository";

export class RequestExtractTextFromImageUsecase {
  constructor(
    private textCaptureRecordRepository: TextCaptureRecordRepository,
    private studentRepository: StudentRepostory,
    private queue: Queue,
    private storage: Storage
  ) {}

  async execute(props: Input): Promise<Output> {
    const student = await this.studentRepository.findById(new EntityId(props.author_id))
    if (!student) throw new Error('Student not found')
    const filename = FilenameService.generate(props.mimetype)
    await this.storage.upload({
      filename: filename,
      mimetype: props.mimetype,
      content: props.file_as_buffer,
    })
    const textCaptureRecord = TextCaptureRecord.create({
      photo_path: filename,
      author_id: new EntityId(props.author_id)
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
  author_id: string,
  file_as_buffer: Buffer,
}

type Output = {
  id: string
}
