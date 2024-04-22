import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface QuestionProps {
  prompt: string
  options: string
  difficulty: number
  correct_answer: string
}

export class Question extends Entity<QuestionProps> {
  get prompt() {
    return this.props.prompt
  }

  get options() {
    return this.props.options
  }

  get difficulty() {
    return this.props.difficulty
  }

  get correctAnswer() {
    return this.props.correct_answer
  }

  static create(props: QuestionProps, id?: EntityId) {
    const question = new Question({
      ...props
    }, id)
    return question
  }
}