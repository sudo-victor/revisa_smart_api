import { CreateTopicUsecase } from "@/domain/essay/application/usecases/create-topic-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class CreateTopicController {
  constructor(
    private usecase: CreateTopicUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { body } = req
    const { title, description, exam_kind } = await z.object({
      title: z.string(),
      description: z.string(),
      exam_kind: z.string()
    }).parseAsync(body)
    await this.usecase.execute({ title, description, exam_kind })
    res.status(201).json()
  }

}