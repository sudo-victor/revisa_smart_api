import DomainEvent from "@/core/domain/domain-event"
import { EssayAssessment } from "../../enterprise/entities/essay-assessment"
import { EssayAssessmentRepository } from "../repositories/essay-assessment-repository"
import { Queue } from "../queue/queue"
import { EntityId } from "@/core/domain/entity-id"
import { TopicRepository } from "../repositories/topic-repository"

export class RequestEvaluateEssayUsecase {
  constructor(
    private essayAssessmentRepository: EssayAssessmentRepository,
    private topicRepository: TopicRepository,
    private queue: Queue
  ) {}

  async execute(props: Input): Promise<Output> {
    if (!props.topic_id && !props.title) throw new Error("Title is required")
    const topic = props.topic_id ? await this.topicRepository.getById(props?.topic_id) : null
    if (props.topic_id && !topic) throw new Error("Topic not found")
    const essayAssessment = EssayAssessment.create({
      student_id: new EntityId(props.student_id),
      essay_title: props.topic_id ? topic?.title as string : props.title as string,
      essay_content: props.content,
      essay_kind: props.kind,
      topic
    })
    essayAssessment.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    essayAssessment.process()
    await this.essayAssessmentRepository.create(essayAssessment)
    return { id: essayAssessment.id.value }
  }
}

type Input = {
  student_id: string,
  topic_id?: string,
  kind: 'enem',
  title?: string,
  content: string,
}

type Output = {
  id: string
}