import { StudentRepostory } from "@/domain/account/application/repositories/student-repository";
import { Student } from "@/domain/account/enterprise/entities/student";
import { prismaClient } from "../client";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

export class PrismaStudentRepository implements StudentRepostory {
  async findByCpfOrEmail(params: { cpf: string; email: string; }): Promise<Student | null> {
    const student = await prismaClient.user.findFirst({
      where: { OR: [{ cpf: params.cpf }, { email: params.email }], role: 'STUDENT' }
    })
    return student ? PrismaStudentMapper.toDomain(student) : null
  }

  async create(student: Student): Promise<void> {
    await prismaClient.user.create({
      data: PrismaStudentMapper.toPrisma(student)
    })
  }
}