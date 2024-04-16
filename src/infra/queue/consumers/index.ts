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
import { RequestExtractFromImageConsumer } from "./request-text-capture-from-image-consumer";
import { ProcessExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/process-extract-text-from-image-usecase";
import { PrismaTextCaptureRecordRepository } from "@/infra/database/prisma/repositories/prisma-text-capture-record-repository";

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

const textCaptureRecordRepository = new PrismaTextCaptureRecordRepository()
const processExtractTextFromImageUsecase = new ProcessExtractTextFromImageUsecase(
  textCaptureRecordRepository,
  aiGateway
)

new RequestEnhanceWritingConsumer(queue, processEnhanceWritingResourcesUsecase).handler()
new RequestEvaluateConsumer(queue, processEssayAssessmentUsecase).handler()
// new RequestExtractFromImageConsumer(queue, processExtractTextFromImageUsecase).handler()
