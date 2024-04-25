import { QuizRequestRepository } from "@/domain/quiz/application/repositories/quiz-request-repository";
import { QuizRequest } from "@/domain/quiz/enterprise/entities/quiz-request";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";
import { PrismaQuizRequestMapper } from "../mappers/prisma-quiz-request-mapper";

export class PrismaQuizRequestRepository implements QuizRequestRepository {
  async getById(id: EntityId): Promise<QuizRequest | null> {
    const quizRequest = await prismaClient.quizRequest.findUnique({
      where: { id: id.value }
    })
    return quizRequest ? PrismaQuizRequestMapper.toDomain(quizRequest) : null
  }

  async create(quizRequest: QuizRequest): Promise<void> {
    await prismaClient.quizRequest.create({
      data: PrismaQuizRequestMapper.toPrisma(quizRequest)
    })
  }

  async save(quizRequest: QuizRequest): Promise<void> {
    await prismaClient.quizRequest.update({
      where: { id: quizRequest.id.value },
      data: PrismaQuizRequestMapper.toPrisma(quizRequest)
    })
  }
}