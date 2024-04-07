import { RequestEnhanceWritingResourcesUsecase } from "@/domain/essay/application/usecases/request-enhance-writing-resouces-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class RequestEnhanceWritingResourcesController {
  
  constructor(
    private usecase: RequestEnhanceWritingResourcesUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { body } = req
    const { theme, author_id } = await z.object({
      theme: z.string(),
      author_id: z.string()
    }).parseAsync(body)
    const result = await this.usecase.execute({ theme, author_id })
    return res.status(202).json({ result })
  }
}