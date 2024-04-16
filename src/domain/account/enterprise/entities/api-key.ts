import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

interface ApiKeyProps {
  nickname: string
  secret: string
  created_at: Date
}

export class ApiKey extends Entity<ApiKeyProps> {
  get nickname() {
    return this.props.nickname
  }

  get secret() {
    return this.props.secret
  }

  get createdAt() {
    return this.props.created_at
  }

  static create(props: Optional<ApiKeyProps, 'created_at'>, id?: EntityId) {
    const apiKey = new ApiKey({
      created_at: new Date(),
      ...props,
    }, id)
    return apiKey
  }
}
