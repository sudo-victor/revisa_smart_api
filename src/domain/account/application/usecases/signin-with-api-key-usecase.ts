import { EntityId } from "@/core/domain/entity-id"
import { ApiKeyRepository } from "../repositories/api-key-repository"
import { StudentRepostory } from "../repositories/student-repository"
import { CompareHasher } from "../cryptography/compare-hasher"
import { JwtToken } from "../token/jwt-token"

export class SigninWithApiKeyUsecase {
  constructor(
    private apiKeyRepository: ApiKeyRepository,
    private studentRepository: StudentRepostory,
    private hasher: CompareHasher,
    private token: JwtToken
  ) {}
  
  async execute(props: Input): Promise<Output> {
    const apiKey = await this.apiKeyRepository.getById(new EntityId(props.key))
    if (!apiKey) throw new Error("Nonauthorized")
    if (!this.hasher.compare(props.secret_key, apiKey.secret)) throw new Error("Nonauthorized")
    const student = await this.studentRepository.findByPhone(props.phone)
    if (!student) throw new Error("Nonauthorized")
    const token = this.token.generate({ phone: props.phone })
    return { token }
  }
}

type Input = {
  key: string
  secret_key: string
  phone: string
}

type Output = {}