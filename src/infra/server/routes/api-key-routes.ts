import { MakeRegisterApiKey } from "@/infra/factories/make-register-api-key";
import { MakeSigninWithApiKey } from "@/infra/factories/make-signin-with-api-key";
import { Router } from "express";

const signinWithApiKey = MakeSigninWithApiKey.make()
const registerApiKey = MakeRegisterApiKey.make()

const apiKeyRoutes = Router()

apiKeyRoutes.post("/", registerApiKey.handler.bind(registerApiKey))
apiKeyRoutes.post("/auth", signinWithApiKey.handler.bind(signinWithApiKey))

export { apiKeyRoutes }