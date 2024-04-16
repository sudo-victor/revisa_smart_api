import { RequestExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/request-extract-text-from-image-usecase";
import { RequestExtractTextFromImageController } from "../controllers/essay/request-extract-text-from-image-controller";
import { RedisQueue } from "../queue/redis/redis-queue";
import { PrismaTextCaptureRecordRepository } from "../database/prisma/repositories/prisma-text-capture-record-repository";

export class MakeRequestExtractTextFromImage {
  static make() {
    const textCaptureRecordRepository = new PrismaTextCaptureRecordRepository()
    const extractTextFromImageUsecase = new RequestExtractTextFromImageUsecase(
      textCaptureRecordRepository,
      RedisQueue.getInstance()
    )
    const extractTextFromImageController = new RequestExtractTextFromImageController(extractTextFromImageUsecase)
    return extractTextFromImageController
  }
}