import { RequestQuizFromFileUsecase } from "@/domain/quiz/application/usecases/request-quiz-from-file-usecase";
import { RequestQuizFromFileController } from "../controllers/quiz/request-quiz-from-file-controller";
import { PrismaQuizRequestRepository } from "../database/prisma/repositories/prisma-quiz-request-repository";
import { S3Storage } from "../storage/s3-storage";
import { PrismaFileRepository } from "../database/prisma/repositories/prisma-file-repository";
import { SQSQueue } from "../queue/sqs/sqs-queue";
import { SNSQueue } from "../queue/sns/sns-queue";

export class MakeQuizFromFile {
  static make() {
    const fileRepository = new PrismaFileRepository()
    const quizRequestRepository = new PrismaQuizRequestRepository()
    const storage = new S3Storage()
    const usecase = new RequestQuizFromFileUsecase(
      quizRequestRepository,
      fileRepository,
      storage,
      SNSQueue.getInstance()
    )
    const controller = new RequestQuizFromFileController(usecase)
    return controller
  }
}