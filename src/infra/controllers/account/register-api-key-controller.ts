import { RegisterApiKeyUsecase } from "@/domain/account/application/usecases/register-api-key-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class RegisterApiKeyController {
  constructor(
    private usecase: RegisterApiKeyUsecase
  ) {}
  async handler(req: Request, res: Response) {
    const { nickname } = z.object({
      nickname: z.string()
    }).parse(req.body)
    const result = await this.usecase.execute({ nickname })
    return res.json({ result })
  }
}