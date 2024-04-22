import { ProcessEssayAssessmentUsecase } from "@/domain/essay/application/usecases/process-essay-assessment-usecase"
import { PrismaCompetenceRepository } from "../database/prisma/repositories/prisma-competence-repository"
import { PrismaEssayAssessmentRepository } from "../database/prisma/repositories/prisma-essay-assessment-repository"
import { MockAiGateway } from "../gateways/ai/mock-ai-gateway"
// import { GeminiAiGateway } from "../gateways/ai/gemini-ai-gateway"

export class MakeProcessEssayAssessment {
  static make() {
    const aiGateway = new MockAiGateway()
    const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
    const competenceRepository = new PrismaCompetenceRepository()
    const processEssayAssessmentUsecase = new ProcessEssayAssessmentUsecase(
      essayAssessmentRepository,
      competenceRepository,
      aiGateway  
    )
    return processEssayAssessmentUsecase
  }
}