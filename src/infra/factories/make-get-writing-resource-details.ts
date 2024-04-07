import { GetWritingResourcesDetailsUsecase } from "@/domain/essay/application/usecases/get-writing-resources-details-usecase"
import { GetWritingResourcesDetailsController } from "../controllers/essay/get-writing-resources-details-controller"
import { PrismaWritingResourceRepository } from "../database/prisma/repositories/prisma-writing-resource-repository"

export class MakeGetWritingResourceDetails {
  static make() {
    const writingResourceRepository = new PrismaWritingResourceRepository()
    const getWritingResourcesDetailsUsecase = new GetWritingResourcesDetailsUsecase(writingResourceRepository)
    const getWritingResourcesDetailsController = new GetWritingResourcesDetailsController(getWritingResourcesDetailsUsecase)
    return getWritingResourcesDetailsController
  }
}