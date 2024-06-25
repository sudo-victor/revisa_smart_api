import { RequestEvaluateConsumer } from "./request-evaluate-consumer";
import { MakeProcessEssayAssessment } from "@/infra/factories/make-process-essay-assessment";
import { SQSQueue } from "../sqs/sqs-queue";

const queue = SQSQueue.getInstance()

const processEssayAssessmentUsecase = MakeProcessEssayAssessment.make()

new RequestEvaluateConsumer(queue, processEssayAssessmentUsecase).handler()