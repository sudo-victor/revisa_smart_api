import { StudentSigninUsecase } from "@/domain/account/application/usecases/student-signin-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class StudentSigninController {
  constructor(
    private usecase: StudentSigninUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { body } = req
    const { email, cpf, password } = await z.object({
      email: z.string().email().optional(),
      cpf: z.string().optional(),
      password: z.string()
    }).parseAsync(body)
    const result = await this.usecase.execute({ email, cpf, password })
    return res.status(200).json({ result })
  }
}