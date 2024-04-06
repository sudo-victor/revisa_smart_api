import { Topic } from "../../enterprise/entities/topic"
import { TopicRepository } from "../repositories/topic-repository"

export class CreateTopicUsecase {
  
  constructor(
    private topicRepository: TopicRepository
  ) {}

  async execute(props: Input) {
    const topic = Topic.create({
      description: props.description,
      exam_kind: props.exam_kind,
      title: props.title
    })
    await this.topicRepository.create(topic)
    return {
      id: topic.id.value
    }
  }
}

type Input = {
  description: string
  exam_kind: string
  title: string
}

type Output = {}