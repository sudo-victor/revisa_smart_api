import { Topic } from "../../enterprise/entities/topic";

export abstract class TopicRepository {
  abstract create(topic: Topic): Promise<void>
  abstract getById(id: string): Promise<Topic | null>
}