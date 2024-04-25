import { ProcessQuizFromFileUsecase } from "@/domain/quiz/application/usecases/process-quiz-from-file-usecase";
import { PrismaQuizRequestRepository } from "../database/prisma/repositories/prisma-quiz-request-repository";
import { GeminiAiGateway } from "../gateways/ai/gemini-ai-gateway";
import { PrismaFileRepository } from "../database/prisma/repositories/prisma-file-repository";
import { PrismaQuizRepository } from "../database/prisma/repositories/prisma-quiz-repository";

export class MakeProcessQuizFromFile {
  static make() {
    const quizRepository = new PrismaQuizRepository()
    const quizRequestRepository = new PrismaQuizRequestRepository()
    const fileRepository = new PrismaFileRepository()
    const aiGateway = new GeminiAiGateway()
    const usecase = new ProcessQuizFromFileUsecase(
      quizRepository,
      quizRequestRepository,
      fileRepository,
      aiGateway
    )
    return usecase
  }
}