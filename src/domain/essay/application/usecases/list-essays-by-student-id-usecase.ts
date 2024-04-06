import { EssayAssessmentRepository } from "../repositories/essay-assessment-repository"

export class ListEssaysByStudentIdUsecase {
  
  constructor(
    private essayAssessmentRepository: EssayAssessmentRepository
  ) {}

  async execute(props: Input): Promise<Output> {
    const essays = await this.essayAssessmentRepository.getByStudentId(props.student_id)
    return {
      essays: essays.map(essay => {
        return {
          id: essay.id.value,
          title: essay.essayTitle,
          kind: essay.essayKind,
          status: essay.status.toValue(),
          score: essay.totalScore
        }
      })
    }
  }
}

type Input = {
  student_id: string
}

type Output = {}