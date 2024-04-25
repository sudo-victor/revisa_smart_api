import { Router } from "express"
import { essayRoutes } from "./essay-routes"
import { studentRoutes } from "./student-routes"
import { topicRoutes } from "./topic-routes"
import { apiKeyRoutes } from "./api-key-routes"
import { quizRoutes } from "./quiz-routes"

const routes = Router()

routes.use("/students", studentRoutes)
routes.use("/api-keys", apiKeyRoutes)
routes.use("/essays", essayRoutes)
routes.use("/topics", topicRoutes)
routes.use("/quizzes", quizRoutes)

export { routes }