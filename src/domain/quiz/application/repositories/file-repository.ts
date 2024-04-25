import { EntityId } from "@/core/domain/entity-id";
import { File } from "../../enterprise/entities/file";

export abstract class FileRepository {
  abstract create(file: File): Promise<void>
  abstract getById(id: EntityId): Promise<File | null>
}