import { MakeGetQuizById } from "@/infra/factories/make-get-quiz-by-id";
import { MakeQuizFromFile } from "@/infra/factories/make-quiz-from-file";
import { JwtAutorizationMiddleware } from "@/infra/middlewares/autorization/jwt-autorization-middleware";
import { uploadMiddleware } from "@/infra/middlewares/storage/upload-middleware";
import { Router } from "express";

const quizFromFile = MakeQuizFromFile.make()
const getQuizById = MakeGetQuizById.make()

const quizRoutes = Router()

quizRoutes.use(JwtAutorizationMiddleware.handler)
quizRoutes.post("/from/file", uploadMiddleware.single('file'), quizFromFile.handler.bind(quizFromFile))
quizRoutes.get("/:id", getQuizById.handler.bind(getQuizById))

export { quizRoutes }