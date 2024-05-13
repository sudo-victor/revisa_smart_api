import { EntityId } from "@/core/domain/entity-id"
import { QuizRepository } from "../repositories/quiz-repository"

export class GetQuizByIdUsecase {
  constructor(private quizRepository: QuizRepository) {}
  
  async execute(props: Input): Promise<Output> {
    const quiz = await this.quizRepository.getById(new EntityId(props.id))
    if(!quiz) throw new Error("Quiz not found")
    return {
      id: quiz.id.value,
      title: quiz.title,
      createdAt: quiz.createdAt,
      questions: quiz.questions.map(question => ({
        id: question.id.value,
        prompt: question.prompt,
        options: JSON.parse(question.options),
        difficulty: question.difficulty
      }))
    }
  }
}

type Input = {
  id: string
}

type Output = {
  id: string
  title: string
  createdAt: Date
  questions: {
    id: string
    prompt: string
    options: string[]
    difficulty: number
  }[]
}
