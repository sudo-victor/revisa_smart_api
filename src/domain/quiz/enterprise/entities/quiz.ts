import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { Question, QuestionProps } from "./question";
import { Optional } from "@/@types/optional";

export interface QuizProps {
  title: string
  creator_id: EntityId
  questions: Question[]
  created_at: Date
}

export interface CreateQuizProps {
  title: string
  creator_id: EntityId
  questions: Question[] | QuestionProps[]
  created_at: Date
}

export class Quiz extends Entity<QuizProps> {
  get title() {
    return this.props.title
  }

  get creatorId() {
    return this.props.creator_id
  }

  get questions() {
    return this.props.questions
  }

  get createdAt() {
    return this.props.created_at
  }

  static create(props: Optional<CreateQuizProps, 'created_at'>, id?: EntityId) {
    const questions = props.questions.map((question: any) => {
      return Question.create({
        difficulty: question.difficulty,
        options: question.options,
        prompt: question.prompt,
        correct_answer: question.correct_answer
      })
    }) as any as Question[]
    const quiz = new Quiz({
      created_at: new Date(),
      ...props,
      questions,
    }, id)
    return quiz
  }
}