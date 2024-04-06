import { ValueObject } from "@/core/domain/value-object";

export type EssayAssessmentStatusValues = 'pending' | 'processing' | 'completed' | 'error'

export class EssayAssessmentStatus extends ValueObject<EssayAssessmentStatusValues> {
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