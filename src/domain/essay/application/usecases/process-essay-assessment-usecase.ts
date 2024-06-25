import { sleep } from "@/core/utils/sleep"
import { Competence, CompetenceCreate } from "../../enterprise/entities/competence"
import { AiTemplateService } from "../../enterprise/services/ai-template-service"
import { AiGateway } from "../gateways/ai-gateway"
import { CompetenceRepository } from "../repositories/competence-repository"
import { EssayAssessmentRepository } from "../repositories/essay-assessment-repository"

export class ProcessEssayAssessmentUsecase {
  constructor(
    private essayAssessmentRepository: EssayAssessmentRepository,
    private competenceRepository: CompetenceRepository,
    private aiGateway: AiGateway
  ) { }

  async execute(props: Input): Promise<Output> {
    await sleep(500)
    const essayAssessment = await this.essayAssessmentRepository.getByIdWithDetails(props.id)
    if (!essayAssessment) throw new Error('Essay not found')
    const question = AiTemplateService.getEssayAssessmentQuestion({
      kind: essayAssessment?.essayKind ?? "",
      title: essayAssessment?.essayTitle ?? "",
      content: essayAssessment?.essayContent ?? ""
    })
    const { essay_assessment: answer } = await this.aiGateway.evaluateEssay(question)
    essayAssessment.answer(answer)
    const competencesToCreate = answer.competences.map((competence: CompetenceCreate) => {
      return Competence.create({
        ...competence,
        essay_assessment_id: essayAssessment.id
      })
    })
    await this.competenceRepository.createMany(competencesToCreate)
    await this.essayAssessmentRepository.save(essayAssessment)
    console.log(`Finish evaluate essay`)
    return { id: essayAssessment.id.value }
  }
}

type Input = {
  id: string
}

type Output = {
  id: string
}