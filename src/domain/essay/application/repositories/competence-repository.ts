import { Competence } from "../../enterprise/entities/competence";

export abstract class CompetenceRepository {
  abstract create(competence: Competence): Promise<void>
  abstract createMany(competences: Competence[]): Promise<void>
  abstract getByEssayAssessmentId(essayAssessmentId: string): Promise<Competence[]>
}