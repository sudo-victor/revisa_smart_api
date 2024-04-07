import { ProcessEssayAssessmentUsecase } from "@/domain/essay/application/usecases/process-essay-assessment-usecase";
import { RedisQueue } from "../redis/redis-queue";
import { RequestEvaluateConsumer } from "./request-evaluate-consumer";
import { PrismaEssayAssessmentRepository } from "@/infra/database/prisma/repositories/prisma-essay-assessment-repository";
import { PrismaCompetenceRepository } from "@/infra/database/prisma/repositories/prisma-competence-repository";
import { MockAiGateway } from "@/infra/gateways/ai/mock-ai-gateway";
import { ChatptAiGateway } from "@/infra/gateways/ai/chatgpt-ai-gateway";

const queue = RedisQueue.getInstance()
const aiGateway = new ChatptAiGateway()
const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
const competenceRepository = new PrismaCompetenceRepository()
const processEssayAssessmentUsecase = new ProcessEssayAssessmentUsecase(
  essayAssessmentRepository,
  competenceRepository,
  aiGateway  
)

new RequestEvaluateConsumer(
  queue,
  processEssayAssessmentUsecase
).hander()
