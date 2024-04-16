import { randomUUID } from "crypto"
import { ApiKey } from "../../enterprise/entities/api-key"
import { EncryptHasher } from "../cryptography/encrypt-hasher"
import { ApiKeyRepository } from "../repositories/api-key-repository"

export class RegisterApiKeyUsecase {
  constructor(
    private apiKeyRepository: ApiKeyRepository,
    private hasher: EncryptHasher
  ) {}

  async execute(props: Input): Promise<Output> {
    const secret = `sk_${randomUUID()}`
    const apiKey = ApiKey.create({
      nickname: props.nickname,
      secret: this.hasher.encrypt(secret),
    })
    await this.apiKeyRepository.create(apiKey)
    return {
      key: apiKey.id.value,
      secret
    }
  }
}

type Input = {
  nickname: string
}

type Output = {
  key: string
  secret: string
}