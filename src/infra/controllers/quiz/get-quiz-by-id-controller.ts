import { GetQuizByIdUsecase } from "@/domain/quiz/application/usecases/get-quiz-by-id-usecase";
import { Request, Response } from "express";

export class GetQuizByIdController {
  constructor(private usecase: GetQuizByIdUsecase) {}
  async handler(req: Request, res: Response) {
    const result = await this.usecase.execute({ id: req.params.id })
    return res.json({ result })
  }
}