import { TextCaptureRecordRepository } from "@/domain/essay/application/repositories/text-capture-record-repository";
import { TextCaptureRecord } from "@/domain/essay/enterprise/entities/text-capture-record";
import { prismaClient } from "../client";
import { PrismaTextCaptureRecordMapper } from "../mappers/prisma-text-capture-record-mapper";

export class PrismaTextCaptureRecordRepository extends TextCaptureRecordRepository {
  async create(textCaptureRecord: TextCaptureRecord): Promise<void> {
    await prismaClient.textCaptureRecord.create({
      data: PrismaTextCaptureRecordMapper.toPrisma(textCaptureRecord)
    })
  }

  async save(textCaptureRecord: TextCaptureRecord): Promise<void> {
    await prismaClient.textCaptureRecord.update({
      where: { id: textCaptureRecord.id.value },
      data: PrismaTextCaptureRecordMapper.toPrisma(textCaptureRecord)
    })
  }

  async getById(id: string): Promise<TextCaptureRecord | null> {
    const textCaptureRecord = await prismaClient.textCaptureRecord.findUnique({
      where: { id }
    })
    return textCaptureRecord
      ? PrismaTextCaptureRecordMapper.toDomain(textCaptureRecord)
      : null
  }
}