import { QuizRequest } from "../../enterprise/entities/quiz-request";

export abstract class QuizRequestRepository {
  abstract create(quizRequest: QuizRequest): Promise<void>
}