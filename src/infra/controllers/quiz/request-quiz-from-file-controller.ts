import { Request, Response } from "express";
import { RequestQuizFromFileUsecase } from "@/domain/quiz/application/usecases/request-quiz-from-file-usecase";

export class RequestQuizFromFileController {
  constructor(private usecase: RequestQuizFromFileUsecase) {}

  async handler(req: Request, res: Response) {
    if (!req.file || !req.file.buffer) throw new Error('File not provided')
    const result = await this.usecase.execute({
      mimetype: req.file.mimetype,
      file_as_buffer: req.file.buffer,
      creator_id: req.user.id
    })
    return res.status(200).json({ result })
  }
}