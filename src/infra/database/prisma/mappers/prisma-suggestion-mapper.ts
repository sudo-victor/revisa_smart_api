import { Suggestion } from "@/domain/essay/enterprise/entities/suggestion";
import { Suggestion as PrismaSuggestion } from "@prisma/client";

export class PrismaSuggestionMapper {
  static toPrisma(suggestion: Suggestion): PrismaSuggestion {
    return {
      competence_id: suggestion.competenceId.value,
      kind: suggestion.kind.toValue(),
      reason: suggestion.reason,
      reference: suggestion.reference,
      tip: suggestion.tip,
      id: suggestion.id.value
    }
  }
}