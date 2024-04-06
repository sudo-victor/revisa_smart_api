import { Student } from "../../enterprise/entities/student";

export abstract class StudentRepostory {
  abstract findByCpfOrEmail(params: { cpf: string; email: string }): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}