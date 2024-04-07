import { EssayAssessmentCreate } from "../../enterprise/entities/essay-assessment";
import { ResourceReferenceProps } from "../../enterprise/entities/resource-reference";

export abstract class AiGateway {
  abstract evaluateEssay(question: string): Promise<{ essay_assessment: EssayAssessmentCreate }>
  abstract enhanceWritingResources(question: string): Promise<{ references: ResourceReferenceProps[] }>
}