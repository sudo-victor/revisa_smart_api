import { GetEssayDetailsMapper } from "../mappers/get-essay-details-mapper"
import { CompetenceRepository } from "../repositories/competence-repository"
import { EssayAssessmentRepository } from "../repositories/essay-assessment-repository"

export class GetEssayDetailsUsecase {
  
  constructor(
    private essayAssessmentRepository: EssayAssessmentRepository,
    private competenceRepository: CompetenceRepository
  ) {}

  async execute(props: Input): Promise<Output> {
    const essay = await this.essayAssessmentRepository.getByIdWithDetails(props.id)
    if (!essay) throw new Error("Essay not found")
    const competence = await this.competenceRepository.getByEssayAssessmentId(essay.id.value)
    return GetEssayDetailsMapper.toOutput(essay, competence)
  }
}

type Input = {
  id: string
}

type Output = {
  id: string
  title: string
  content: string
  kind: string
  status: string
  totalScore: number | null
  createdAt: Date
  competences: {
    id: string;
    name: string;
    score_achieved: number | null;
    possible_score: number | null;
    suggestions: {
      kind: string,
      reference: string,
      reason: string,
      tip: string,
    }[]
  }[]
}
