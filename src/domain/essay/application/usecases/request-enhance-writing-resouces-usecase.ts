import DomainEvent from "@/core/domain/domain-event"
import { Queue } from "../queue/queue"
import { WritingResource } from "../../enterprise/entities/writing-resource"
import { WritingResourceRepository } from "../repositories/writing-resource-repository"
import { EntityId } from "@/core/domain/entity-id"

export class RequestEnhanceWritingResourcesUsecase {
  constructor(
    private writingResourceRepository: WritingResourceRepository,
    private queue: Queue
  ) {}

  async execute(props: Input): Promise<Output> {
    const resource = WritingResource.create({
      theme: props.theme,
      author_id: new EntityId(props.author_id)
    })
    resource.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    resource.process()
    await this.writingResourceRepository.create(resource)
    return {
      id: resource.id.value
    }
  }
}

type Input = {
  theme: string
  author_id: string
}

type Output = {
  id: string
}