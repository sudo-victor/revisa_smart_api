import { Request, Response } from "express";
import { z } from "zod"

import { RequestEvaluateEssayUsecase } from "@/domain/essay/application/usecases/request-evaluate-essay-usecase";

export class RequestEvaluateEssayController {
  constructor(
    private usecase: RequestEvaluateEssayUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { body } = req
    const { content, kind, title, student_id, topic_id } = z.object({
      kind: z.enum(['enem']),
      title: z.string(),
      content: z.string(),
      student_id: z.string(),
      topic_id: z.string().optional(),
    }).parse(body)
    const result = await this.usecase.execute({ content, kind, title, student_id, topic_id })
    return res.status(202).json({ result })
  }

}