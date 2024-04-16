import { EntityId } from "@/core/domain/entity-id";
import { TextCaptureRecord } from "@/domain/essay/enterprise/entities/text-capture-record";
import { TextCaptureRecordStatus } from "@/domain/essay/enterprise/value-objects/text-capture-record-status";
import { TextCaptureRecord as PrismaTextCaptureRecord } from "@prisma/client"

export class PrismaTextCaptureRecordMapper {
  static toPrisma(textCaptureRecord: TextCaptureRecord): PrismaTextCaptureRecord {
    return {
      id: textCaptureRecord.id.value,
      status: textCaptureRecord.status.toValue(),
      content: textCaptureRecord.content,
      created_at: textCaptureRecord.createdAt,
      photo_path: textCaptureRecord.photoPath,
      author_id: textCaptureRecord.authorId.value
    }
  }

  static toDomain(textCaptureRecord: PrismaTextCaptureRecord): TextCaptureRecord {
    return TextCaptureRecord.create({
        content: textCaptureRecord.content,
        status: new TextCaptureRecordStatus(textCaptureRecord.status as any),
        photo_path: textCaptureRecord.photo_path,
        created_at: textCaptureRecord.created_at,
        author_id: new EntityId(textCaptureRecord.author_id ?? "")
      }, new EntityId(textCaptureRecord.id))
  }
}