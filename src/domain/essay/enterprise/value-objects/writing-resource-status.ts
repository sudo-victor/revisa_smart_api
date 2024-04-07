import { ValueObject } from "@/core/domain/value-object";

export type WritingResourceStatusOptions = 'pending' | 'processing' | 'completed' | 'error'

export class WritingResourceStatus extends ValueObject<WritingResourceStatusOptions> {
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