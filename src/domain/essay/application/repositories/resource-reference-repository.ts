import { ResourceReference } from "../../enterprise/entities/resource-reference";

export abstract class ResourceReferenceRepository {
  abstract createMany(resourceReferences: ResourceReference[]): Promise<void>
  abstract getByWritingResourceId(id: string): Promise<ResourceReference[]>
}