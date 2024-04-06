import { EntityId } from "@/core/domain/entity-id";
import { Competence } from "@/domain/essay/enterprise/entities/competence";
import { Competence as PrismaCompetence, Suggestion as PrismaSuggestion } from "@prisma/client";

export class PrismaCompetenceMapper {
  static toPrisma(competence: Competence): PrismaCompetence {
    return {
      id: competence.id.value,
      name: competence.name,
      possible_score: competence.possibleScore,
      score_achieved: competence.scoreAchieved,
      essay_assessment_id: competence.essayAssessmentId.value
    }
  }

  static toDomain(competence: PrismaCompetence & { suggestions?: PrismaSuggestion[] }): Competence {
    return Competence.create({
      name: competence.name as string,
      score_achieved: competence.score_achieved,
      possible_score: competence.possible_score,
      essay_assessment_id: new EntityId(competence.essay_assessment_id),
      suggestions: competence?.suggestions?.map(s => ({ ...s, competence_id: competence.id })) ?? [] as any
    }, new EntityId(competence.id))
  }
}