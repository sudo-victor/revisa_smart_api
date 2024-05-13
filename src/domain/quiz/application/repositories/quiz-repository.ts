import { EntityId } from "@/core/domain/entity-id";
import { Quiz } from "../../enterprise/entities/quiz";

export abstract class QuizRepository {
  abstract create(quiz: Quiz): Promise<void>
  abstract getById(id: EntityId): Promise<Quiz | null>
}