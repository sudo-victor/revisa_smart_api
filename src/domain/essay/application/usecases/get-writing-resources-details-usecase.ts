import { WritingResourceRepository } from "../repositories/writing-resource-repository"

export class GetWritingResourcesDetailsUsecase {
  constructor(
    private writingResourceRepository: WritingResourceRepository
  ) {}

  async execute(props: Input): Promise<Output> {
    const writingResource = await this.writingResourceRepository.getByIdWithDetails(props.id)
    if (!writingResource) throw new Error("Writing resource not found")
    return {
      id: writingResource.id.value,
      theme: writingResource.theme,
      references: writingResource.references.map((reference) => ({
        kind: reference.kind,
        title: reference.title,
        value: reference.value,
      }))
    }
  }
}

type Input = {
  id: string
}

type Output = {
  id: string
  theme: string
  references: {
    kind: string
    title: string
    value: string
  }[]
}