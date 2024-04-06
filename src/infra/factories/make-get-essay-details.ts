import { GetEssayDetailsUsecase } from "@/domain/essay/application/usecases/get-essay-details-usecase"
import { PrismaCompetenceRepository } from "../database/prisma/repositories/prisma-competence-repository"
import { GetEssayDetailsController } from "../controllers/essay/get-essay-details-controller"
import { PrismaEssayAssessmentRepository } from "../database/prisma/repositories/prisma-essay-assessment-repository"

export class GetEssayDetail {
  static make() {
    const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
    const competenceRepository = new PrismaCompetenceRepository()
    const getEssayDetailsUsecase = new GetEssayDetailsUsecase(essayAssessmentRepository, competenceRepository)
    const getEssayDetailsController = new GetEssayDetailsController(getEssayDetailsUsecase)
    return getEssayDetailsController
  }
}