import { JwtToken } from "@/domain/account/application/token/jwt-token";
import { sign } from "jsonwebtoken"

export class JWTToken extends JwtToken {
  generate(payload: any): string {
    return sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
  }
}