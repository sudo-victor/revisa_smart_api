import { ListEssaysByStudentIdUsecase } from "@/domain/essay/application/usecases/list-essays-by-student-id-usecase"
import { ListEssaysByStudentIdController } from "../controllers/essay/list-essays-by-student-id-controller"
import { PrismaEssayAssessmentRepository } from "../database/prisma/repositories/prisma-essay-assessment-repository"

export class ListEssaysByStudentId {
  static make() {
    const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
    const listEssaysByStudentIdUsecase = new ListEssaysByStudentIdUsecase(essayAssessmentRepository)
    const listEssaysByStudentIdController = new ListEssaysByStudentIdController(listEssaysByStudentIdUsecase)
    return listEssaysByStudentIdController
  }
}