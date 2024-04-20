import { ProcessEnhanceWritingResourcesUsecase } from "@/domain/essay/application/usecases/process-enhance-writing-resources-usecase"
import { PrismaResourceReferenceRepository } from "../database/prisma/repositories/prisma-resource-reference-repository"
import { PrismaWritingResourceRepository } from "../database/prisma/repositories/prisma-writing-resource-repository"
import { MockAiGateway } from "../gateways/ai/mock-ai-gateway"

export class MakeProcessEnhanceWritingResources {
  static make() {
    const aiGateway = new MockAiGateway()
    const writingResouceRepository = new PrismaWritingResourceRepository()
    const resourceReferenceRepository = new PrismaResourceReferenceRepository()
    const processEnhanceWritingResourcesUsecase = new ProcessEnhanceWritingResourcesUsecase(
      writingResouceRepository,
      resourceReferenceRepository,
      aiGateway,
    )
    return processEnhanceWritingResourcesUsecase
  }
}