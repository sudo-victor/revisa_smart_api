import { CompetenceRepository } from "@/domain/essay/application/repositories/competence-repository";
import { Competence } from "@/domain/essay/enterprise/entities/competence";
import { prismaClient } from "../client";
import { PrismaCompetenceMapper } from "../mappers/prisma-competence-mapper";
import { PrismaSuggestionMapper } from "../mappers/prisma-suggestion-mapper";

export class PrismaCompetenceRepository implements CompetenceRepository {
  async getByEssayAssessmentId(essayAssessmentId: string): Promise<Competence[]> {
    const competences = await prismaClient.competence.findMany({
      where: { essay_assessment_id: essayAssessmentId },
      include: { suggestions: true }
    })
    return competences.map(PrismaCompetenceMapper.toDomain)
  }

  async create(competence: Competence): Promise<void> {
    await prismaClient.competence.create({
      data: PrismaCompetenceMapper.toPrisma(competence)
    })
    await prismaClient.suggestion.createMany({
      data: competence.suggestions.map(PrismaSuggestionMapper.toPrisma)
    })
  }

  async createMany(competences: Competence[]): Promise<void> {
    const competencesMapped = competences.map(PrismaCompetenceMapper.toPrisma)
    const suggestionsMapped = competences.map(c => c.suggestions).flat().map(PrismaSuggestionMapper.toPrisma)
    await prismaClient.competence.createMany({
      data: competencesMapped
    })
    await prismaClient.suggestion.createMany({
      data: suggestionsMapped
    })
  }
}