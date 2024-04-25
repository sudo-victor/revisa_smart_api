import { EntityId } from "@/core/domain/entity-id";
import { QuizRequest } from "../../enterprise/entities/quiz-request";

export abstract class QuizRequestRepository {
  abstract create(quizRequest: QuizRequest): Promise<void>
  abstract save(quizRequest: QuizRequest): Promise<void>
  abstract getById(id: EntityId): Promise<QuizRequest | null>
}