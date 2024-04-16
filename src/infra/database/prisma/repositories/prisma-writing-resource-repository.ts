import { WritingResourceRepository } from "@/domain/essay/application/repositories/writing-resource-repository";
import { WritingResource } from "@/domain/essay/enterprise/entities/writing-resource";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";
import { WritingResourceStatus } from "@/domain/essay/enterprise/value-objects/writing-resource-status";
import { ResourceReference } from "@/domain/essay/enterprise/entities/resource-reference";
import { ResourceReferenceKind } from "@/domain/essay/enterprise/value-objects/resource-reference-kind";
import { PrismaWritingResourceMapper } from "../mappers/prisma-writing-resource-mapper";

export class PrismaWritingResourceRepository implements WritingResourceRepository {
  async getByIdWithDetails(id: string): Promise<WritingResource | null> {
    const writingResource = await prismaClient.writingResource.findUnique({
      where: { id },
      include: { resource_references: true }
    })
    return writingResource
      ? PrismaWritingResourceMapper.toDomainWithDetails(writingResource)
      : null
  }

  async getById(id: string): Promise<WritingResource | null> {
    const writingResource = await prismaClient.writingResource.findUnique({
      where: {
        id
      }
    })
    return writingResource ? PrismaWritingResourceMapper.toDomain(writingResource) : null
  }

  async create(resource: WritingResource): Promise<void> {
    await prismaClient.writingResource.create({
      data: PrismaWritingResourceMapper.toPrisma(resource)
    })
  }
}