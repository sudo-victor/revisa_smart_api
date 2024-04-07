import { WritingResource } from "../../enterprise/entities/writing-resource";

export abstract class WritingResourceRepository {
  abstract create(resource: WritingResource): Promise<void>
  abstract getById(id: string): Promise<WritingResource | null>
  abstract getByIdWithDetails(id: string): Promise<WritingResource | null>
}