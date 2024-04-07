import { WritingResourceRepository } from "@/domain/essay/application/repositories/writing-resource-repository";
import { WritingResource } from "@/domain/essay/enterprise/entities/writing-resource";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";
import { WritingResourceStatus } from "@/domain/essay/enterprise/value-objects/writing-resource-status";
import { ResourceReference } from "@/domain/essay/enterprise/entities/resource-reference";
import { ResourceReferenceKind } from "@/domain/essay/enterprise/value-objects/resource-reference-kind";

export class PrismaWritingResourceRepository implements WritingResourceRepository {
  async getByIdWithDetails(id: string): Promise<WritingResource | null> {
    const writingResource = await prismaClient.writingResource.findUnique({
      where: { id },
      include: { resource_references: true }
    })
    return writingResource
      ? WritingResource.create(
        {
          theme: writingResource.theme,
          status: new WritingResourceStatus(writingResource.status as any) as any,
          author_id: new EntityId(writingResource.author_id),
          references: writingResource.resource_references.map(reference => {
            return ResourceReference.create({
              kind: new ResourceReferenceKind(reference.kind as any) as any,
              title: reference.title,
              value: reference.value,
              writing_resource_id: new EntityId(reference.writing_resource_id)
            }, new EntityId(reference.id))
          })
        },
        new EntityId(writingResource.id))
      : null
  }

  async getById(id: string): Promise<WritingResource | null> {
    const writingResource = await prismaClient.writingResource.findUnique({
      where: {
        id
      }
    })
    return writingResource ? WritingResource.create({
      author_id: new EntityId(writingResource.author_id),
      theme: writingResource.theme,
    }, new EntityId(id)) : null
  }

  async create(resource: WritingResource): Promise<void> {
    await prismaClient.writingResource.create({
      data: {
        id: resource.id.value,
        theme: resource.theme,
        author_id: resource.authorId,
      }
    })
  }
}