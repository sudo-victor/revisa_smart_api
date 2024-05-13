import { GetQuizByIdUsecase } from "@/domain/quiz/application/usecases/get-quiz-by-id-usecase";
import { GetQuizByIdController } from "../controllers/quiz/get-quiz-by-id-controller";
import { PrismaQuizRepository } from "../database/prisma/repositories/prisma-quiz-repository";

export class MakeGetQuizById {
  static make() {
    const repository = new PrismaQuizRepository()
    const usecase = new GetQuizByIdUsecase(repository)
    const controller = new GetQuizByIdController(usecase)
    return controller
  }
}