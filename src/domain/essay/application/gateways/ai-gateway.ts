import { File } from "@/domain/quiz/enterprise/entities/file";
import { EssayAssessmentCreate } from "../../enterprise/entities/essay-assessment";
import { ResourceReferenceProps } from "../../enterprise/entities/resource-reference";

interface GenerateQuizResponse {
  title: string
  questions: {
    prompt: string
    options: string
    correct_answer: string
    difficulty: number
  }[]
}

export abstract class AiGateway {
  abstract evaluateEssay(question: string): Promise<{ essay_assessment: EssayAssessmentCreate }>
  abstract enhanceWritingResources(question: string): Promise<{ references: ResourceReferenceProps[] }>
  abstract adjustExtractedText(question: string): Promise<{ content: string }>
  abstract generateQuiz(question: string, file: File): Promise<GenerateQuizResponse>
}