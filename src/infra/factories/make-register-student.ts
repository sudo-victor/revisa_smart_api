import { RegisterStudentUsecase } from "@/domain/account/application/usecases/register-student-usecase"
import { Hasher } from "../cryptography/hasher"
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository"
import { RegisterStudentController } from "../controllers/account/register-student-controller"
import { RedisQueue } from "../queue/redis/redis-queue"

export class MakeRegisterStudent {
  static make() {
    const studentRepository = new PrismaStudentRepository()
    const hasher = new Hasher()
    const registerStudentUsecase = new RegisterStudentUsecase(studentRepository, hasher, RedisQueue.getInstance())
    const registerStudentController = new RegisterStudentController(registerStudentUsecase)
    return registerStudentController
  }
}