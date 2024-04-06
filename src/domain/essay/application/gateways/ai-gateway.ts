import { EssayAssessmentCreate } from "../../enterprise/entities/essay-assessment";

export abstract class AiGateway {
  abstract evaluateEssay(question: string): Promise<{ essay_assessment: EssayAssessmentCreate }>
}