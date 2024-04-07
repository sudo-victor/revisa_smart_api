import { Router } from "express"

import { RequestEvaluateEssay } from "@/infra/factories/make-request-evaluate-essay"
import { ListEssaysByStudentId } from "@/infra/factories/make-list-essays-by-student-id"
import { GetEssayDetail } from "@/infra/factories/make-get-essay-details"
import { MakeRequestEnhanceWritingResource } from "@/infra/factories/make-request-enhance-writing-resources"
import { MakeGetWritingResourceDetails } from "@/infra/factories/make-get-writing-resource-details"

const requestEvaluateEssay = RequestEvaluateEssay.make()
const requestEnhanceWritingResource = MakeRequestEnhanceWritingResource.make()
const listEssaysByStudentId = ListEssaysByStudentId.make()
const getEssayDetails = GetEssayDetail.make()
const getWritingResourceDetails = MakeGetWritingResourceDetails.make()

const essayRoutes = Router()

essayRoutes.post("/evaluate", requestEvaluateEssay.handler.bind(requestEvaluateEssay))
essayRoutes.post("/themes/resources", requestEnhanceWritingResource.handler.bind(requestEnhanceWritingResource))
essayRoutes.get("/themes/resources/:id", getWritingResourceDetails.handler.bind(getWritingResourceDetails))
essayRoutes.get("/of/:student_id", listEssaysByStudentId.handler.bind(listEssaysByStudentId))
essayRoutes.get("/:id", getEssayDetails.handler.bind(getEssayDetails))

export { essayRoutes }