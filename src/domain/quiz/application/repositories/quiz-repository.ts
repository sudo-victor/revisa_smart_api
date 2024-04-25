import { Quiz } from "../../enterprise/entities/quiz";

export abstract class QuizRepository {
  abstract create(quiz: Quiz): Promise<void>
}