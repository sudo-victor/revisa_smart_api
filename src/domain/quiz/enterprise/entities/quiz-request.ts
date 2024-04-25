import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { GenerateQuizFromFileEvent } from "../events/generate-quiz-from-file-event";

export interface QuizRequestProps {
  status: string
  file_id: EntityId
  created_at: Date
  creator_id: EntityId
  quiz_id: EntityId | null
}

export class QuizRequest extends Entity<QuizRequestProps> {
  get status() {
    return this.props.status
  }

  get fileId() {
    return this.props.file_id
  }

  get createdAt() {
    return this.props.created_at
  }

  get creatorId() {
    return this.props.creator_id
  }

  get quizId() {
    return this.props.quiz_id
  }

  static create(props: Optional<QuizRequestProps, 'created_at' | 'status'>, id?: EntityId) {
    const quizRequest = new QuizRequest({
      created_at: new Date(),
      status: props.status ?? 'pending',
      ...props,
    }, id)
    return quizRequest
  }
  
  process() {
    this.props.status = "process"
    this.notify(new GenerateQuizFromFileEvent(this.id.value))
  }

  complete(quizId: EntityId) {
    this.props.quiz_id = quizId
    this.props.status = "complete"
  }

}