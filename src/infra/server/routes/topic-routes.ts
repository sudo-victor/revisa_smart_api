import { Router } from "express"

import { CreateTopicUsecase } from "@/domain/essay/application/usecases/create-topic-usecase"
import { PrismaTopicRepository } from "../../database/prisma/repositories/prisma-topic-repository"
import { CreateTopicController } from "../../controllers/essay/create-topic-controller"

const topicRepository = new PrismaTopicRepository()
const createTopicUsecase = new CreateTopicUsecase(topicRepository)
const createTopicController = new CreateTopicController(createTopicUsecase)

const topicRoutes = Router()

topicRoutes.post("/", createTopicController.handler.bind(createTopicController))

export { topicRoutes }