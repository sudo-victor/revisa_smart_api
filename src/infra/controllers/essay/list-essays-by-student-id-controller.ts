import { ListEssaysByStudentIdUsecase } from "@/domain/essay/application/usecases/list-essays-by-student-id-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class ListEssaysByStudentIdController {
  constructor(
    private usecase: ListEssaysByStudentIdUsecase
  ) {}
  
  async handler(req: Request, res: Response) {
    const { params } = req
    const { student_id } = await z.object({
      student_id: z.string()
    }).parseAsync(params)
    const result = await this.usecase.execute({ student_id })
    return res.status(200).json(result)
  }
}