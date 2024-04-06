import { RegisterStudentUsecase } from "@/domain/account/application/usecases/register-student-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class RegisterStudentController {

  constructor(
    private usecase: RegisterStudentUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { body } = req
    const { cpf, email, password, fullname } = await z.object({
      fullname: z.string(),
      email: z.string().email(),
      cpf: z.string(),
      password: z.string(),
    }).parseAsync(body)
    await this.usecase.execute({
      cpf, email, password, fullname
    })
    return res.status(201).json()
  }
}