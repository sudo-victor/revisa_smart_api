import { Competence } from "../../enterprise/entities/competence"
import { EssayAssessment } from "../../enterprise/entities/essay-assessment"

export class GetEssayDetailsMapper {
  static toOutput(essay: EssayAssessment, competences: Competence[]) {
    return {
      id: essay.id.value,
      title: essay.essayTitle,
      content: essay.essayContent,
      kind: essay.essayKind,
      competences: competences.map((competence) => {
        return {
          id: competence.id.value,
          name: competence.name,
          score_achieved: competence.scoreAchieved,
          possible_score: competence.possibleScore,
          suggestions: competence.suggestions.map(suggestion => ({
            kind: suggestion.kind.toValue(),
            reference: suggestion.reference,
            reason: suggestion.reason,
            tip: suggestion.tip,
          }))
        }
      }),
      status: essay.status.toValue(),
      totalScore: essay.totalScore,
      createdAt: essay.createdAt,
    }
  }
}