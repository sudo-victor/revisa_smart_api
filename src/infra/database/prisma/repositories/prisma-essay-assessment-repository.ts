import { EssayAssessmentRepository } from "@/domain/essay/application/repositories/essay-assessment-repository";
import { EssayAssessment } from "@/domain/essay/enterprise/entities/essay-assessment";
import { prismaClient } from "../client";
import { PrismaEssayAssessmentMapper } from "../mappers/prisma-essay-assessment-mapper";

export class PrismaEssayAssessmentRepository extends EssayAssessmentRepository {
  async getByStudentId(studentId: string): Promise<EssayAssessment[]> {
    const essays = await prismaClient.essayAssessment.findMany({
      where: { user_id: studentId}
    })
    return essays.map(PrismaEssayAssessmentMapper.toDomain as any)
  }

  async getByStudentIdWithDetails(studentId: string): Promise<EssayAssessment[]> {
    const essays = await prismaClient.essayAssessment.findMany({
      where: { user_id: studentId },
      include: { topic: true }
    })
    return essays.map((essay) => (PrismaEssayAssessmentMapper.toDomain(essay)))
  }

  async create(essayAssessment: EssayAssessment): Promise<void> {
    await prismaClient.essayAssessment.create({
      data: PrismaEssayAssessmentMapper.toPrisma(essayAssessment)
    })
  }

  async save(essayAssessment: EssayAssessment): Promise<void> {
    await prismaClient.essayAssessment.update({
      where: {
        id: essayAssessment.id.value,
      },
      data: PrismaEssayAssessmentMapper.toPrisma(essayAssessment)
    })
  }

  async getById(id: string): Promise<EssayAssessment | null> {
    const essay = await prismaClient.essayAssessment.findUnique({
      where: { id },
    })

    return essay ? PrismaEssayAssessmentMapper.toDomain(essay as any) : null
  }

  async getByIdWithDetails(id: string): Promise<EssayAssessment | null> {
    const essay = await prismaClient.essayAssessment.findUnique({
      where: { id },
      include: { topic: true }
    })
    return essay ? PrismaEssayAssessmentMapper.toDomain(essay as any) : null
  }
}