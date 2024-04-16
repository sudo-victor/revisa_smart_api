import { Router } from "express"

import { CreateTopicUsecase } from "@/domain/essay/application/usecases/create-topic-usecase"
import { PrismaTopicRepository } from "../../database/prisma/repositories/prisma-topic-repository"
import { CreateTopicController } from "../../controllers/essay/create-topic-controller"
import { JwtAutorizationMiddleware } from "@/infra/middlewares/autorization/jwt-autorization-middleware"

const topicRepository = new PrismaTopicRepository()
const createTopicUsecase = new CreateTopicUsecase(topicRepository)
const createTopicController = new CreateTopicController(createTopicUsecase)

const topicRoutes = Router()

topicRoutes.use(JwtAutorizationMiddleware.handler)
topicRoutes.post("/", createTopicController.handler.bind(createTopicController))

export { topicRoutes }