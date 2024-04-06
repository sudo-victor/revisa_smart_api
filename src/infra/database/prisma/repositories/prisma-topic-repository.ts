import { TopicRepository } from "@/domain/essay/application/repositories/topic-repository";
import { Topic } from "@/domain/essay/enterprise/entities/topic";
import { prismaClient } from "../client";
import { EntityId } from "@/core/domain/entity-id";

export class PrismaTopicRepository implements TopicRepository {
  async getById(id: string): Promise<Topic | null> {
    const topic = await prismaClient.topic.findUnique({ where: { id }})
    return topic ? Topic.create({
      exam_kind: topic.exam_kind,
      title: topic.title,
      description: topic.description,
    }, new EntityId(topic.id)) : null
  }

  async create(topic: Topic): Promise<void> {
    await prismaClient.topic.create({
      data: {
        id: topic.id.value,
        title: topic.title,
        description: topic.description,
        exam_kind: topic.examKind as any,
      }
    })
  }
}