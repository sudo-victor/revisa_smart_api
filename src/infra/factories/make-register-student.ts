import { RegisterStudentUsecase } from "@/domain/account/application/usecases/register-student-usecase"
import { Hasher } from "../cryptography/hasher"
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository"
import { RegisterStudentController } from "../controllers/account/register-student-controller"

export class MakeRegisterStudent {
  static make() {
    const studentRepository = new PrismaStudentRepository()
    const hasher = new Hasher()
    const registerStudentUsecase = new RegisterStudentUsecase(studentRepository, hasher)
    const registerStudentController = new RegisterStudentController(registerStudentUsecase)
    return registerStudentController
  }
}