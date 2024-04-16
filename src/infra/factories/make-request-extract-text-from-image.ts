import { RequestExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/request-extract-text-from-image-usecase";
import { RequestExtractTextFromImageController } from "../controllers/essay/request-extract-text-from-image-controller";
import { RedisQueue } from "../queue/redis/redis-queue";
import { PrismaTextCaptureRecordRepository } from "../database/prisma/repositories/prisma-text-capture-record-repository";
import { S3Storage } from "../storage/s3-storage";

export class MakeRequestExtractTextFromImage {
  static make() {
    const storage = new S3Storage()
    const textCaptureRecordRepository = new PrismaTextCaptureRecordRepository()
    const extractTextFromImageUsecase = new RequestExtractTextFromImageUsecase(
      textCaptureRecordRepository,
      RedisQueue.getInstance(),
      storage
    )
    const extractTextFromImageController = new RequestExtractTextFromImageController(extractTextFromImageUsecase)
    return extractTextFromImageController
  }
}