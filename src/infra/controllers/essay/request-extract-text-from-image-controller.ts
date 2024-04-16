import { RequestExtractTextFromImageUsecase } from "@/domain/essay/application/usecases/request-extract-text-from-image-usecase";
import { Request, Response } from "express";

export class RequestExtractTextFromImageController {
  constructor(
    private usecase: RequestExtractTextFromImageUsecase
  ) {}

  async handler(req: Request, res: Response) {
    if (!req.file || !req.file.buffer) throw new Error('File not provided')
    const result = await this.usecase.execute({
      file_as_buffer: req.file.buffer
    })
    return res.status(200).json({ text: result })
  }
}
