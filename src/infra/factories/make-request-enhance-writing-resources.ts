import { RequestEnhanceWritingResourcesUsecase } from "@/domain/essay/application/usecases/request-enhance-writing-resouces-usecase"
import { RequestEnhanceWritingResourcesController } from "../controllers/essay/request-enhance-writing-resources-controller"
import { PrismaWritingResourceRepository } from "../database/prisma/repositories/prisma-writing-resource-repository"
import { RedisQueue } from "../queue/redis/redis-queue"

export class MakeRequestEnhanceWritingResource {
  static make() {
    const writingResourceRepository = new PrismaWritingResourceRepository()
    const requestEnhanceWritingResourcesUsecase = new RequestEnhanceWritingResourcesUsecase(writingResourceRepository, RedisQueue.getInstance())
    const requestEnhanceWritingResourcesController = new RequestEnhanceWritingResourcesController(requestEnhanceWritingResourcesUsecase)
    return requestEnhanceWritingResourcesController
  }
}