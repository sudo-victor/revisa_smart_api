import { EntityId } from "@/core/domain/entity-id";
import { QuizRequest } from "@/domain/quiz/enterprise/entities/quiz-request";
import { QuizRequest as PrismaQuizRequest } from "@prisma/client";

export class PrismaQuizRequestMapper {
  static toDomain(quizRequest: PrismaQuizRequest): QuizRequest {
    return QuizRequest.create({
      creator_id: new EntityId(quizRequest.creator_id),
      file_id: new EntityId(quizRequest.file_id),
      status: quizRequest.status,
      created_at: quizRequest.created_at,
      quiz_id: quizRequest.quiz_id ? new EntityId(quizRequest.quiz_id) : null,
    }, new EntityId(quizRequest.id))
  }

  static toPrisma(quizRequest: QuizRequest): PrismaQuizRequest {
    return {
      id: quizRequest.id.value,
      file_id: quizRequest.fileId.value,
      creator_id: quizRequest.creatorId.value,
      status: quizRequest.status,
      created_at: quizRequest.createdAt,
      quiz_id: quizRequest.quizId?.value ?? null
    }
  }
}