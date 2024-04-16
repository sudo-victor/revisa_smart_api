import { GetTextCaptureRecordByIdUsecase } from "@/domain/essay/application/usecases/get-text-capture-record-by-id-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class GetTextCaptureRecordByIdController {
  constructor(
    private usecase: GetTextCaptureRecordByIdUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { params } = req
    const { id } = z.object({
      id: z.string().uuid()
    }).parse(params)
    const result = await this.usecase.execute({ id })
    return res.status(200).json({ result })
  }
}