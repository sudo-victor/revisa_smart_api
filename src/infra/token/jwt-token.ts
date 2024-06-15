import { JwtToken } from "@/domain/account/application/token/jwt-token";
import { sign } from "jsonwebtoken"
import { env } from "../env";

export class JWTToken extends JwtToken {
  generate(payload: any): string {
    return sign(
      payload,
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN }
    )
  }
}