import { Entity } from "@/core/domain/entity-base";
import { SuggestionKind } from "../value-objects/suggestion-kind";
import { EntityId } from "@/core/domain/entity-id";

export interface SuggestionProps {
  kind: SuggestionKind;
  reference: string;
  reason: string;
  tip: string;
  competence_id: EntityId;
}

export class Suggestion extends Entity<SuggestionProps> {
  get competenceId() {
    return this.props.competence_id
  }

  get kind() {
    return this.props.kind
  }

  get reference() {
    return this.props.reference
  }

  get reason() {
    return this.props.reason
  }

  get tip() {
    return this.props.tip
  }

  static create(props: SuggestionProps, id?: EntityId) {
    const suggestion = new Suggestion(props, id)
    return suggestion
  }
}