import { Entity } from "@/core/domain/entity-base";
import { Suggestion, SuggestionProps } from "./suggestion";
import { EntityId } from "@/core/domain/entity-id";
import { SuggestionKind } from "../value-objects/suggestion-kind";

export interface CompetenceProps {
  name: string;
  score_achieved: number | null;
  possible_score: number | null;
  suggestions: Suggestion[];
  essay_assessment_id: EntityId;
}

export type CompetenceCreate = CompetenceProps & {
  suggestions: SuggestionProps[]
}

export class Competence extends Entity<CompetenceProps> {
  get essayAssessmentId() {
    return this.props.essay_assessment_id
  }

  get name() {
    return this.props.name
  }

  get scoreAchieved() {
    return this.props.score_achieved
  }

  get possibleScore() {
    return this.props.possible_score
  }

  get suggestions() {
    return this.props.suggestions
  }

  static create(props: CompetenceCreate, id?: EntityId) {
    const competenceId = id ?? new EntityId()

    const suggestions = props.suggestions.map(suggestion => {
      return Suggestion.create({
        ...suggestion,
        kind: new SuggestionKind(suggestion.kind as any),
        competence_id: competenceId
      } as any as SuggestionProps, suggestion.id ? new EntityId(suggestion.id as any as string) : undefined)
    })

    const competence = new Competence({
      ...props,
      suggestions 
    }, competenceId)
    return competence
  }
}