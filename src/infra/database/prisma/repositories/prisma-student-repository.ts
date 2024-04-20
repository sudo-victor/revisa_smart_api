import { StudentRepostory } from "@/domain/account/application/repositories/student-repository";
import { Student } from "@/domain/account/enterprise/entities/student";
import { prismaClient } from "../client";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";
import { EntityId } from "@/core/domain/entity-id";
import { StudentCreatedEvent } from "@/domain/account/enterprise/events/student-created-event";

export class PrismaStudentRepository implements StudentRepostory {
  async findByPhone(phone: string): Promise<Student | null> {
    const student = await prismaClient.user.findFirst({
      where: { phone }
    })
    return student ? PrismaStudentMapper.toDomain(student) : null
  }

  async findById(id: EntityId): Promise<Student | null> {
    const student = await prismaClient.user.findFirst({
      where: { id: id.value }
    })
    return student ? PrismaStudentMapper.toDomain(student) : null
  }

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
    student.notify(new StudentCreatedEvent(student.id.value))
  }
}