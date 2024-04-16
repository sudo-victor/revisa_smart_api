import { TextCaptureRecord } from "../../enterprise/entities/text-capture-record";

export abstract class TextCaptureRecordRepository {
  abstract create(textCaptureRecord: TextCaptureRecord): Promise<void>
  abstract save(textCaptureRecord: TextCaptureRecord): Promise<void>
  abstract getById(id: string): Promise<TextCaptureRecord | null>
}