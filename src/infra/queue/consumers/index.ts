import { ProcessEssayAssessmentUsecase } from "@/domain/essay/application/usecases/process-essay-assessment-usecase";
import { RedisQueue } from "../redis/redis-queue";
import { RequestEvaluateConsumer } from "./request-evaluate-consumer";
import { PrismaEssayAssessmentRepository } from "@/infra/database/prisma/repositories/prisma-essay-assessment-repository";
import { PrismaCompetenceRepository } from "@/infra/database/prisma/repositories/prisma-competence-repository";
import { MockAiGateway } from "@/infra/gateways/ai/mock-ai-gateway";
import { ChatptAiGateway } from "@/infra/gateways/ai/chatgpt-ai-gateway";
import { RequestEnhanceWritingConsumer } from "./request-enhance-writing-consumer";
import { ProcessEnhanceWritingResourcesUsecase } from "@/domain/essay/application/usecases/process-enhance-writing-resources-usecase";
import { PrismaWritingResourceRepository } from "@/infra/database/prisma/repositories/prisma-writing-resource-repository";
import { PrismaResourceReferenceRepository } from "@/infra/database/prisma/repositories/prisma-resource-reference-repository";

const queue = RedisQueue.getInstance()
const aiGateway = new MockAiGateway()

const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
const competenceRepository = new PrismaCompetenceRepository()
const processEssayAssessmentUsecase = new ProcessEssayAssessmentUsecase(
  essayAssessmentRepository,
  competenceRepository,
  aiGateway  
)

const writingResouceRepository = new PrismaWritingResourceRepository()
const resourceReferenceRepository = new PrismaResourceReferenceRepository()
const processEnhanceWritingResourcesUsecase = new ProcessEnhanceWritingResourcesUsecase(
  writingResouceRepository,
  resourceReferenceRepository,
  aiGateway,
)

new RequestEnhanceWritingConsumer(queue, processEnhanceWritingResourcesUsecase).hander()
new RequestEvaluateConsumer(queue, processEssayAssessmentUsecase).hander()
