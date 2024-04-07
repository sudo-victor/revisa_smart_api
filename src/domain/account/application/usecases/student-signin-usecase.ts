import { CompareHasher } from "../cryptography/compare-hasher";
import { StudentRepostory } from "../repositories/student-repository";
import { JwtToken } from "../token/jwt-token";

export class StudentSigninUsecase {
  
  constructor(
    private studentRepository: StudentRepostory,
    private compareHash: CompareHasher,
    private token: JwtToken
  ) {}
  
  async execute(props: Input): Promise<Output> {
    const student = await this.studentRepository.findByCpfOrEmail({
      cpf: props.cpf ?? "",
      email: props.email ?? ""
    })
    if (!student) throw new Error("Student not found")
    const passwordIsValid = await this.compareHash.compare(props.password, student.password)
    if (!passwordIsValid) throw new Error("Student not found")
    const token = this.token.generate({ id: student.id.value })
    return { token }
  }
}

type Input = {
  email?: string
  cpf?: string
  password: string
}

type Output = {
  token: string
}