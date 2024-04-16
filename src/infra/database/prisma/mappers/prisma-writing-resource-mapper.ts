import { EntityId } from "@/core/domain/entity-id";
import { ResourceReference } from "@/domain/essay/enterprise/entities/resource-reference";
import { WritingResource } from "@/domain/essay/enterprise/entities/writing-resource";
import { ResourceReferenceKind } from "@/domain/essay/enterprise/value-objects/resource-reference-kind";
import { WritingResourceStatus } from "@/domain/essay/enterprise/value-objects/writing-resource-status";
import { WritingResource as PrismaWritingResource } from "@prisma/client";

export class PrismaWritingResourceMapper {
  static toPrisma(resource: WritingResource): PrismaWritingResource {
    return {
      id: resource.id.value,
      theme: resource.theme,
      status: resource.status.toValue(),
      thesis: resource.thesis,
      author_id: resource.authorId,
    }
  }

  static toDomain(resource: PrismaWritingResource): WritingResource {
    return WritingResource.create({
      author_id: new EntityId(resource.author_id),
      theme: resource.theme,
      thesis: resource.thesis ?? "",
    }, new EntityId(resource.id))
  }

  static toDomainWithDetails(resource: any): WritingResource {
    return WritingResource.create(
      {
        theme: resource.theme,
        thesis: resource.thesis ?? "",
        status: new WritingResourceStatus(resource.status as any) as any,
        author_id: new EntityId(resource.author_id),
        references: resource.resource_references.map((reference: any) => {
          return ResourceReference.create({
            kind: new ResourceReferenceKind(reference.kind as any) as any,
            title: reference.title,
            value: reference.value,
            writing_resource_id: new EntityId(reference.writing_resource_id)
          }, new EntityId(reference.id))
        })
      },
      new EntityId(resource.id))
  }
}