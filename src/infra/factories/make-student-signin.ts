import { StudentSigninUsecase } from "@/domain/account/application/usecases/student-signin-usecase"
import { StudentSigninController } from "../controllers/account/student-signin-controller"
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository"
import { Hasher } from "../cryptography/hasher"
import { JWTToken } from "../token/jwt-token"

export class MakeStudentSignin {
  static make() {
    const hasher = new Hasher()
    const token = new JWTToken()
    const studentRepository = new PrismaStudentRepository()
    const studentSigninUsecase = new StudentSigninUsecase(
      studentRepository,
      hasher,
      token
    )
    const studentSigninController = new StudentSigninController(studentSigninUsecase)
    return studentSigninController
  }
}