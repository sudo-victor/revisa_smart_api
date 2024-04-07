import { StudentRepostory } from "../repositories/student-repository"

export class ValidateUserByPhoneUsecase {
  
  constructor(
    private studentRepository: StudentRepostory
  ) {}
  
  async execute(props: Input): Promise<Output> {
    const student = await this.studentRepository.findByPhone(props.phone)
    return { is_valid: !!student }
  }
}

type Input = {
  phone: string
}

type Output = {
  is_valid: boolean
}