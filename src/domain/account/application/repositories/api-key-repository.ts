import { EntityId } from "@/core/domain/entity-id";
import { ApiKey } from "../../enterprise/entities/api-key";

export abstract class ApiKeyRepository {
  abstract create(apiKey: ApiKey): Promise<void>
  abstract getById(id: EntityId): Promise<ApiKey | null>
}