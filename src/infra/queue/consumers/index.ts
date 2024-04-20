import { RedisQueue } from "../redis/redis-queue";
import { RequestEvaluateConsumer } from "./request-evaluate-consumer";
import { RequestEnhanceWritingConsumer } from "./request-enhance-writing-consumer";
import { MakeProcessEssayAssessment } from "@/infra/factories/make-process-essay-assessment";
import { MakeProcessEnhanceWritingResources } from "@/infra/factories/make-process-enhance-writing-resources";
import { MakeProcessExtractTextFromImage } from "@/infra/factories/make-process-extract-text-from-image";
import { RequestExtractFromImageConsumer } from "./request-text-capture-from-image-consumer";
import { RegisterCustomerConsumer } from "./register-customer-consumer";
import { MakeRegisterSubscriptionReference } from "@/infra/factories/make-register-subscription-reference";

const queue = RedisQueue.getInstance()

const processEssayAssessmentUsecase = MakeProcessEssayAssessment.make()
const processEnhanceWritingResourcesUsecase = MakeProcessEnhanceWritingResources.make()
const processExtractTextFromImageUsecase = MakeProcessExtractTextFromImage.make()
const registerSubscriptionReference = MakeRegisterSubscriptionReference.make()

new RequestEnhanceWritingConsumer(queue, processEnhanceWritingResourcesUsecase).handler()
new RequestEvaluateConsumer(queue, processEssayAssessmentUsecase).handler()
new RequestExtractFromImageConsumer(queue, processExtractTextFromImageUsecase).handler()
new RegisterCustomerConsumer(queue, registerSubscriptionReference).handler()
