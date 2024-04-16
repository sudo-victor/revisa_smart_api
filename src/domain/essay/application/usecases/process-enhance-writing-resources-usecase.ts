import { sleep } from "@/core/utils/sleep"
import { WritingResourceRepository } from "../repositories/writing-resource-repository"
import { AiTemplateService } from "../../enterprise/services/ai-template-service"
import { AiGateway } from "../gateways/ai-gateway"
import { ResourceReference, ResourceReferenceProps } from "../../enterprise/entities/resource-reference"
import { ResourceReferenceRepository } from "../repositories/resource-reference-repository"
import { EntityId } from "@/core/domain/entity-id"
import { ResourceReferenceKind } from "../../enterprise/value-objects/resource-reference-kind"

export class ProcessEnhanceWritingResourcesUsecase {
  constructor(
    private writingResourceRepository: WritingResourceRepository,
    private resourceReferenceRepository: ResourceReferenceRepository,
    private aiGateway: AiGateway
  ) { }

  async execute(props: Input): Promise<Output> {
    console.log(`Start process enhance writing resources: `, props)
    await sleep(500)
    const writingResource = await this.writingResourceRepository.getById(props.id)
    if (!writingResource) throw new Error("Request to enhance writing resources not found")
    const question = AiTemplateService.getEnhanceWritingResourceQuestion({
      theme: writingResource.theme,
      thesis: writingResource.thesis,
      amount: 5
    })
    const { references: answer } = await this.aiGateway.enhanceWritingResources(question)
    const referencesToCreate = answer.map((reference: ResourceReferenceProps) => {
      return ResourceReference.create({
        kind: new ResourceReferenceKind(reference.kind as any),
        title: reference.title,
        value: reference.value,
        writing_resource_id: new EntityId(writingResource.id.value)
      })
    })
    await this.resourceReferenceRepository.createMany(referencesToCreate)
    console.log(`Finish process enhance writing resources`)
    return {}
  }
}

type Input = {
  id: string
}

type Output = {}