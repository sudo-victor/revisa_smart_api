import { Request, Response } from "express";
import { z } from "zod";
import { GetWritingResourcesDetailsUsecase } from "@/domain/essay/application/usecases/get-writing-resources-details-usecase";

export class GetWritingResourcesDetailsController {
  constructor(
    private usecase: GetWritingResourcesDetailsUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { params } = req
    const { id } = await z.object({
      id: z.string().uuid()
    }).parseAsync(params)
    const result = await this.usecase.execute({ id })
    return res.status(200).json({ result })
  }
}