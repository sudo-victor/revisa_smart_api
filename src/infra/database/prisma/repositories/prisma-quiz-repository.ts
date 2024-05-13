import { QuizRepository } from "@/domain/quiz/application/repositories/quiz-repository";
import { Quiz } from "@/domain/quiz/enterprise/entities/quiz";
import { prismaClient } from "../client";
import { PrismaQuizMapper } from "../mappers/prisma-quiz-mapper";
import { EntityId } from "@/core/domain/entity-id";
import { Question } from "@/domain/quiz/enterprise/entities/question";

export class PrismaQuizRepository implements QuizRepository {
  async getById(id: EntityId): Promise<Quiz | null> {
    const quiz = await prismaClient.quiz.findUnique({
      where: { id: id.value },
      include: { questions: true }
    })
    return quiz ? PrismaQuizMapper.toDomain(quiz) : null
  }

  async create(quiz: Quiz): Promise<void> {
    await prismaClient.quiz.create({
      data: PrismaQuizMapper.toPrisma(quiz)
    })
  }
}