import { RequestEvaluateEssayUsecase } from "@/domain/essay/application/usecases/request-evaluate-essay-usecase"
import { PrismaEssayAssessmentRepository } from "../database/prisma/repositories/prisma-essay-assessment-repository"
import { PrismaTopicRepository } from "../database/prisma/repositories/prisma-topic-repository"
import { RequestEvaluateEssayController } from "../controllers/essay/request-evaluate-essay-controller"
import { SNSQueue } from "../queue/sns/sns-queue"

export class RequestEvaluateEssay {
  static make() {
    const topicRepository = new PrismaTopicRepository()
    const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
    const requestEvaluateEssayUsecase = new RequestEvaluateEssayUsecase(essayAssessmentRepository, topicRepository, SNSQueue.getInstance())
    const requestEvaluateEssayController = new RequestEvaluateEssayController(requestEvaluateEssayUsecase)
    return requestEvaluateEssayController
  }
}