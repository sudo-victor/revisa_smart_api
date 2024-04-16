import { TextCaptureRecordRepository } from "../repositories/text-capture-record-repository"

export class GetTextCaptureRecordByIdUsecase {
  constructor(
    private textCaptureRecordRepository: TextCaptureRecordRepository
  ) {}
  
  async execute(props: Input): Promise<Output> {
    const textCaptureRecord = await this.textCaptureRecordRepository.getById(props.id)
    if (!textCaptureRecord) throw new Error('Text not found')
    return {
      id: textCaptureRecord.id.value,
      status: textCaptureRecord.status.toValue(),
      content: textCaptureRecord.content ?? "",
      created_at: textCaptureRecord.createdAt
    }
  }
}

type Input = {
  id: string
}

type Output = {
  id: string,
  status: string,
  content: string,
  created_at: Date
}