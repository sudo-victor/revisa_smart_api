import { Router } from "express"

import { RequestEvaluateEssay } from "@/infra/factories/make-request-evaluate-essay"
import { ListEssaysByStudentId } from "@/infra/factories/make-list-essays-by-student-id"
import { GetEssayDetail } from "@/infra/factories/make-get-essay-details"

const requestEvaluateEssay = RequestEvaluateEssay.make()
const listEssaysByStudentId = ListEssaysByStudentId.make()
const getEssayDetails = GetEssayDetail.make()

const essayRoutes = Router()

essayRoutes.post("/evaluate", requestEvaluateEssay.handler.bind(requestEvaluateEssay))
essayRoutes.get("/of/:student_id", listEssaysByStudentId.handler.bind(listEssaysByStudentId))
essayRoutes.get("/:id", getEssayDetails.handler.bind(getEssayDetails))

export { essayRoutes }