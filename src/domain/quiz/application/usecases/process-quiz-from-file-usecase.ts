import { EntityId } from "@/core/domain/entity-id"
import { QuizRequestRepository } from "../repositories/quiz-request-repository"
import { AiGateway } from "@/domain/essay/application/gateways/ai-gateway"
import { AiTemplateService } from "@/domain/essay/enterprise/services/ai-template-service"
import { FileRepository } from "../repositories/file-repository"
import { Quiz } from "../../enterprise/entities/quiz"
import { QuizRepository } from "../repositories/quiz-repository"

export class ProcessQuizFromFileUsecase {
  constructor(
    private quizRepository: QuizRepository,
    private quizRequestRepository: QuizRequestRepository,
    private fileRepository: FileRepository,
    private aiGateway: AiGateway
  ) {}  

  async execute(props: Input): Promise<Output> {
    console.log(`Start ProcessQuizFromFileUsecase: `, props)
    const quizRequest = await this.quizRequestRepository.getById(new EntityId(props.id))
    if (!quizRequest) throw new Error("Quiz request not found")
    const file = await this.fileRepository.getById(quizRequest.fileId)
    if (!file) throw new Error("File not found")
    const question = AiTemplateService.getQuizFromFileQuestion()
    const answer = await this.aiGateway.generateQuiz(question, file)
    const quiz = Quiz.create({
      title: answer.title,
      creator_id: quizRequest.creatorId,
      questions: answer.questions.map(question => ({
        prompt: question.prompt,
        options: JSON.stringify(question.options),
        correct_answer: question.correct_answer,
        difficulty: question.difficulty
      }))
    })
    quizRequest.complete(quiz.id)
    await this.quizRepository.create(quiz)
    await this.quizRequestRepository.save(quizRequest)
    console.log(`Finish ProcessQuizFromFileUsecase`)
    return {}
  }
}

type Input = {
  id: string
}

type Output = {}