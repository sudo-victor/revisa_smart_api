import { User } from "@prisma/client";
import { Student } from "@/domain/account/enterprise/entities/student";
import { EntityId } from "@/core/domain/entity-id";

export class PrismaStudentMapper {
  static toPrisma(student: Student): User {
    return {
      cpf: student.cpf,
      email: student.email,
      fullname: student.fullname,
      id: student.id.value,
      password_hash: student.password,
      phone: student.phone,
      role: 'STUDENT',
      created_at: student.createdAt
    }
  }

  static toDomain(student: User): Student {
    return Student.create({
      cpf: student.cpf,
      email: student.email,
      fullname: student.fullname,
      password: student.password_hash,
      created_at: student.created_at,
      phone: student.phone ?? ""
    }, new EntityId(student.id))
  }
}