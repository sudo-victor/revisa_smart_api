import { QuizRepository } from "@/domain/quiz/application/repositories/quiz-repository";
import { Quiz } from "@/domain/quiz/enterprise/entities/quiz";
import { prismaClient } from "../client";
import { PrismaQuizMapper } from "../mappers/prisma-quiz-mapper";

export class PrismaQuizRepository implements QuizRepository {
  async create(quiz: Quiz): Promise<void> {
    await prismaClient.quiz.create({
      data: PrismaQuizMapper.toPrisma(quiz)
    })
  }
}