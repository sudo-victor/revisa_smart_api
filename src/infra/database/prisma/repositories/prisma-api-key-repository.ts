import { ApiKeyRepository } from "@/domain/account/application/repositories/api-key-repository";
import { ApiKey } from "@/domain/account/enterprise/entities/api-key";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";

export class PrismaApiKeyRepository implements ApiKeyRepository {
  async getById(id: EntityId): Promise<ApiKey | null> {
    const apiKey = await prismaClient.apiKey.findUnique({
      where: { id: id.value }
    })
    return apiKey ? ApiKey.create({
      nickname: apiKey.nickname,
      secret: apiKey.secret,
      created_at: apiKey.created_at
    }, new EntityId(apiKey.id)) : null
  }
  async create(apiKey: ApiKey): Promise<void> {
    await prismaClient.apiKey.create({
      data: {
        id: apiKey.id.value,
        nickname: apiKey.nickname,
        secret: apiKey.secret,
        created_at: apiKey.createdAt
      }
    })
  }
}