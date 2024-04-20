import { ProcessExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/process-extract-text-from-image-usecase"
import { PrismaTextCaptureRecordRepository } from "../database/prisma/repositories/prisma-text-capture-record-repository"
import { S3Storage } from "../storage/s3-storage"
import { MockAiGateway } from "../gateways/ai/mock-ai-gateway"

export class MakeProcessExtractTextFromImage {
  static make() {
    const aiGateway = new MockAiGateway()
    const storage = new S3Storage()
    const textCaptureRecordRepository = new PrismaTextCaptureRecordRepository()
    const processExtractTextFromImageUsecase = new ProcessExtractTextFromImageUsecase(
      textCaptureRecordRepository,
      aiGateway,
      storage
    )
    return processExtractTextFromImageUsecase
  }
}