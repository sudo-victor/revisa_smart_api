import { SigninWithApiKeyUsecase } from "@/domain/account/application/usecases/signin-with-api-key-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class SigninWithApiKeyController { 
  constructor(
    private usecase: SigninWithApiKeyUsecase
  ) {}
  async handler(req: Request, res: Response) {
    const { key, secret_key, phone } = z.object({
      key: z.string(),
      secret_key: z.string(),
      phone: z.string()
    }).parse(req.body)
    const result = await this.usecase.execute({ key, secret_key, phone })
    return res.json({ result })
  }
}