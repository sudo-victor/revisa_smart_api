import { EntityId } from "@/core/domain/entity-id";
import { EssayAssessment } from "@/domain/essay/enterprise/entities/essay-assessment";
import { Topic } from "@/domain/essay/enterprise/entities/topic";
import { EssayAssessment as PrismaEssayAssessment, Topic as PrismaTopic } from "@prisma/client";

export class PrismaEssayAssessmentMapper {
  static toPrisma(essayAssessment: EssayAssessment): PrismaEssayAssessment {
    return {
      kind: essayAssessment.essayKind,
      title: essayAssessment.essayTitle,
      content: essayAssessment.essayContent,
      status: essayAssessment.status.toValue(),
      total_score: essayAssessment.totalScore,
      created_at: essayAssessment.createdAt,
      id: essayAssessment.id.value,
      topic_id: essayAssessment.topic ? essayAssessment.topic.id.value : null,
      user_id: essayAssessment.studentId.value
    }
  }

  static toDomain(essay: PrismaEssayAssessment & { topic: PrismaTopic | null }): EssayAssessment {
    return EssayAssessment.create({
      essay_content: essay.content,
      essay_kind: essay.kind as any,
      essay_title: essay.title,
      total_score: essay.total_score,
      created_at: essay.created_at,
      status: essay.status as any,
      student_id: new EntityId(essay.user_id),
      topic: essay.topic ? Topic.create({...essay.topic}, new EntityId(essay.topic.id)) : null
    }, new EntityId(essay.id))
  }
}