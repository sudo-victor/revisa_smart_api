import { RequestEvaluateConsumer } from "./request-evaluate-consumer";
import { RequestEnhanceWritingConsumer } from "./request-enhance-writing-consumer";
import { MakeProcessEssayAssessment } from "@/infra/factories/make-process-essay-assessment";
import { MakeProcessEnhanceWritingResources } from "@/infra/factories/make-process-enhance-writing-resources";
import { MakeProcessExtractTextFromImage } from "@/infra/factories/make-process-extract-text-from-image";
import { RequestExtractFromImageConsumer } from "./request-text-capture-from-image-consumer";
import { RegisterCustomerConsumer } from "./register-customer-consumer";
import { MakeRegisterSubscriptionReference } from "@/infra/factories/make-register-subscription-reference";
import { RequestQuizFromFileConsumer } from "./request-quiz-from-file-consumer";
import { MakeProcessQuizFromFile } from "@/infra/factories/make-process-quiz-from-file";
import { SQSQueue } from "../sqs/sqs-queue";

const queue = SQSQueue.getInstance()

const processEssayAssessmentUsecase = MakeProcessEssayAssessment.make()
const processEnhanceWritingResourcesUsecase = MakeProcessEnhanceWritingResources.make()
const processExtractTextFromImageUsecase = MakeProcessExtractTextFromImage.make()
const registerSubscriptionReference = MakeRegisterSubscriptionReference.make()
const processQuizFromFile = MakeProcessQuizFromFile.make()

// new RequestEnhanceWritingConsumer(queue, processEnhanceWritingResourcesUsecase).handler()
// new RequestEvaluateConsumer(queue, processEssayAssessmentUsecase).handler()
// new RequestExtractFromImageConsumer(queue, processExtractTextFromImageUsecase).handler()
// new RegisterCustomerConsumer(queue, registerSubscriptionReference).handler()
new RequestQuizFromFileConsumer(queue, processQuizFromFile).handler()