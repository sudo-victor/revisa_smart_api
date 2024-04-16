import { SigninWithApiKeyUsecase } from "@/domain/account/application/usecases/signin-with-api-key-usecase";
import { SigninWithApiKeyController } from "../controllers/account/signin-with-api-key-controller";
import { PrismaApiKeyRepository } from "../database/prisma/repositories/prisma-api-key-repository";
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository";
import { Hasher } from "../cryptography/hasher";
import { JWTToken } from "../token/jwt-token";

export class MakeSigninWithApiKey {
  static make() {
    const studentRepository = new PrismaStudentRepository()
    const apiKeyRepository = new PrismaApiKeyRepository()
    const hasher = new Hasher()
    const token = new JWTToken()
    const usecase = new SigninWithApiKeyUsecase(apiKeyRepository, studentRepository, hasher, token)
    const controller = new SigninWithApiKeyController(usecase)
    return controller
  }
}