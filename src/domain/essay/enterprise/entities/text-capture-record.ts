import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { TextCaptureRecordStatus } from "../value-objects/text-capture-record-status";
import { ExtractTextFromImageEvent } from "../events/extract-text-from-image-event";

export interface TextCaptureRecordProps {
  status: TextCaptureRecordStatus
  content: string | null
  photo_path: string | null
  created_at: Date
  author_id: EntityId
}

export class TextCaptureRecord extends Entity<TextCaptureRecordProps> {
  get content() {
    return this.props.content
  }

  get photoPath() {
    return this.props.photo_path
  }

  get createdAt() {
    return this.props.created_at
  }

  get status() {
    return this.props.status
  }

  get authorId() {
    return this.props.author_id
  }

  static create(props: Optional<TextCaptureRecordProps, 'status' | 'photo_path' | 'created_at' | 'content'>, id?: EntityId) {
    const textCaptureRecord = new TextCaptureRecord({
      status:  props.status ?? new TextCaptureRecordStatus('pending'),
      photo_path: props.photo_path ?? null,
      content: props.content ?? null,
      created_at: new Date(),
      ...props,
    }, id)
    return textCaptureRecord
  }

  process() {
    this.status.process()
    this.notify(new ExtractTextFromImageEvent(
      this.id.value
    ))
  }

  putContent(text: string) {
    this.status.completeWithSuccess()
    this.props.content = text
  }
}