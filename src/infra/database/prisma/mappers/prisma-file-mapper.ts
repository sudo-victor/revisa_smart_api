import { EntityId } from "@/core/domain/entity-id";
import { File } from "@/domain/quiz/enterprise/entities/file";
import { File as PrismaFile } from "@prisma/client";

export class PrismaFileMapper {
  static toPrisma(file: File): PrismaFile {
    return {
      id: file.id.value,
      filename: file.filename,
      mimetype: file.mimetype,
    }
  }

  static toDomain(file: PrismaFile): File {
    return File.create({
      mimetype: file.mimetype,
      filename: file.filename
    }, new EntityId(file.id))
  }
}