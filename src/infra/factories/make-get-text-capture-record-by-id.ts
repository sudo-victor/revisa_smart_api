import { GetTextCaptureRecordByIdUsecase } from "@/domain/essay/application/usecases/get-text-capture-record-by-id-usecase";
import { GetTextCaptureRecordByIdController } from "../controllers/essay/get-text-capture-record-by-id-controller";
import { PrismaTextCaptureRecordRepository } from "../database/prisma/repositories/prisma-text-capture-record-repository";

export class MakeGetTextCaptureRecordById {
  static make() {
    const repository = new PrismaTextCaptureRecordRepository()
    const usecase = new GetTextCaptureRecordByIdUsecase(repository)
    const controller = new GetTextCaptureRecordByIdController(usecase)
    return controller
  }
}