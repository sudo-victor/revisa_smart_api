import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient()

prismaClient
  .$connect()
  .then(()=>{console.log('💽 Database is connected')})