import { RegisterApiKeyUsecase } from "@/domain/account/application/usecases/register-api-key-usecase";
import { RegisterApiKeyController } from "../controllers/account/register-api-key-controller";
import { PrismaApiKeyRepository } from "../database/prisma/repositories/prisma-api-key-repository";
import { Hasher } from "../cryptography/hasher";

export class MakeRegisterApiKey {
  static make() {
    const repository = new PrismaApiKeyRepository()
    const hasher = new Hasher()
    const usecase = new RegisterApiKeyUsecase(repository, hasher)
    const controller = new RegisterApiKeyController(usecase)
    return controller
  }
}