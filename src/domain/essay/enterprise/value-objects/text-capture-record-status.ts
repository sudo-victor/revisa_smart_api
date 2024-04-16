import { ValueObject } from "@/core/domain/value-object";

export type TextCaptureRecordStatusValues = 'pending' | 'processing' | 'completed' | 'error'

export class TextCaptureRecordStatus extends ValueObject<TextCaptureRecordStatusValues> {
  process() {
    this.value = 'processing'
  }

  completeWithSuccess() {
    this.value = 'completed'
  }

  completeWithError() {
    this.value = 'error'
  }
}