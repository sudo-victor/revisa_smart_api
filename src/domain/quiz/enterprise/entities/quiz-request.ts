import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { GenerateQuizFromFileEvent } from "../events/generate-quiz-from-file-event";

export interface QuizRequestProps {
  status: string
  file_path: string
  created_at: Date
  quiz_id: EntityId | null
}

export class QuizRequest extends Entity<QuizRequestProps> {
  static create(props: Optional<QuizRequestProps, 'created_at' | 'status'>, id?: EntityId) {
    const quizRequest = new QuizRequest({
      created_at: new Date(),
      status: props.status ?? 'pendente',
      ...props,
    }, id)
    quizRequest.notify(new GenerateQuizFromFileEvent(quizRequest.id.value))
    return quizRequest
  }
}