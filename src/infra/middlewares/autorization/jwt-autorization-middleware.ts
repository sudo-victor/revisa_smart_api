import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

export class JwtAutorizationMiddleware {
  static async handler(req: Request, res: Response, next: NextFunction) {
    const { headers } = req
    const authorization = headers["authorization"]
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authorization.replace("Bearer ", "")
    try {
      verify(token, process.env.JWT_SECRET as string)
      const decodedToken = decode(token) as any
      req.user = decodedToken
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}