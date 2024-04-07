import { ValidateUserByPhoneUsecase } from "@/domain/account/application/usecases/validate-user-by-phone-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class ValidateUserByPhoneController {

  constructor(
    private usecase: ValidateUserByPhoneUsecase
  ) {}

  async handler(req: Request, res: Response) {
    const { query } = req
    const { phone } = await z.object({
      phone: z.string()
    }).parseAsync(query)
    const result = await this.usecase.execute({ phone })
    return res.status(200).json({ result })
  }
}