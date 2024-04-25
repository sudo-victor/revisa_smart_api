import { FileRepository } from "@/domain/quiz/application/repositories/file-repository";
import { File } from "@/domain/quiz/enterprise/entities/file";
import { prismaClient } from "../client";
import { PrismaFileMapper } from "../mappers/prisma-file-mapper";
import { EntityId } from "@/core/domain/entity-id";

export class PrismaFileRepository implements FileRepository {
  async getById(id: EntityId): Promise<File | null> {
    const file = await prismaClient.file.findUnique({
      where: { id: id.value }
    })
    return file ? PrismaFileMapper.toDomain(file) : null
  }

  async create(file: File): Promise<void> {
    await prismaClient.file.create({
      data: PrismaFileMapper.toPrisma(file)
    })
  }
}