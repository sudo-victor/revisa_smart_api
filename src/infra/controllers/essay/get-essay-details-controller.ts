import { GetEssayDetailsUsecase } from "@/domain/essay/application/usecases/get-essay-details-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class GetEssayDetailsController {
  
  constructor(
    private usecase: GetEssayDetailsUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { params } = req
    const { id } = await z.object({
      id: z.string().uuid()
    }).parseAsync(params)
    const result = await this.usecase.execute({ id })
    res.status(200).json(result)
  }
}