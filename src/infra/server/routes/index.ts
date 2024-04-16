import { Router } from "express"
import { essayRoutes } from "./essay-routes"
import { studentRoutes } from "./student-routes"
import { topicRoutes } from "./topic-routes"

const routes = Router()

routes.use("/students", studentRoutes)
routes.use("/essays", essayRoutes)
routes.use("/topics", topicRoutes)

export { routes }