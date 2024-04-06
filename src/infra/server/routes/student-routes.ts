import { Router } from "express"

import { RedisQueue } from "../../queue/redis/redis-queue"
import { RegisterStudentController } from "../../controllers/account/register-student-controller"
import { RegisterStudentUsecase } from "@/domain/account/application/usecases/register-student-usecase"
import { PrismaStudentRepository } from "../../database/prisma/repositories/prisma-student-repository"
import { Hasher } from "../../cryptography/hasher"

const studentRepository = new PrismaStudentRepository()
const hasher = new Hasher()
const registerStudentUsecase = new RegisterStudentUsecase(studentRepository, hasher, RedisQueue.getInstance())
const registerStudentController = new RegisterStudentController(registerStudentUsecase)

const studentRoutes = Router()

studentRoutes.post("/", registerStudentController.handler.bind(registerStudentController))

export { studentRoutes }