import { EssayAssessment } from "../../enterprise/entities/essay-assessment";

export abstract class EssayAssessmentRepository {
  abstract create(essayAssessment: EssayAssessment): Promise<void>
  abstract save(essayAssessment: EssayAssessment): Promise<void>
  abstract getById(id: string): Promise<EssayAssessment | null>
  abstract getByIdWithDetails(id: string): Promise<EssayAssessment | null>
  abstract getByStudentId(studentId: string): Promise<EssayAssessment[]>
  abstract getByStudentIdWithDetails(studentId: string): Promise<EssayAssessment[]>
}