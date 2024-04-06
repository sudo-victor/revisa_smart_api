import DomainEvent from "@/core/domain/domain-event";
import { Queue } from "@/domain/essay/application/queue/queue";
import { Student } from "../../enterprise/entities/student"
import { StudentRepostory } from "../repositories/student-repository";
import { EncryptHasher } from "../cryptography/encrypt-hasher";

export class RegisterStudentUsecase {

  constructor(
    private studentRepository: StudentRepostory,
    private hasher: EncryptHasher,
    private queue: Queue
  ) { }

  async execute(props: Input): Promise<Output> {
    const alreadyExists = await this.studentRepository.findByCpfOrEmail({
      email: props.email, cpf: props.cpf
    });
    if (alreadyExists) throw new Error('Student already exists')
    const student = Student.create({
      ...props, password: this.hasher.encrypt(props.password)
    })
    student.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    await this.studentRepository.create(student)
    return { id: student.id.value }
  }
}

type Input = {
  fullname: string
  email: string
  cpf: string
  password: string
}

type Output = {
  id: string
}