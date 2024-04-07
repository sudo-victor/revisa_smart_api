import { ResourceReferenceRepository } from "@/domain/essay/application/repositories/resource-reference-repository";
import { ResourceReference } from "@/domain/essay/enterprise/entities/resource-reference";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";
import { ResourceReferenceKind } from "@/domain/essay/enterprise/value-objects/resource-reference-kind";

export class PrismaResourceReferenceRepository implements ResourceReferenceRepository {
  async getByWritingResourceId(id: string): Promise<ResourceReference[]> {
    const references = await prismaClient.resourceReference.findMany({
      where: { writing_resource_id: id }
    })
    return references.map((reference) => 
      ResourceReference.create({
        kind: new ResourceReferenceKind(reference.kind.toLocaleLowerCase() as any),
        title: reference.title,
        value: reference.value,
        writing_resource_id: new EntityId(reference.writing_resource_id)
      }, new EntityId(reference.id))
    )
  }

  async createMany(resourceReferences: ResourceReference[]): Promise<void> {
    await prismaClient.resourceReference.createMany({
      data: resourceReferences.map((resourceReference) => {
        return {
          id: resourceReference.id.value,
          title: resourceReference.title,
          value: resourceReference.value,
          writing_resource_id: resourceReference.writingResourceId,
          kind: resourceReference.kind.toUpperCase() as any,
        }
      })
    })
  }
}