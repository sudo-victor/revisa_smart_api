import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface TopicProps {
  title: string
  description: string
  exam_kind: string
}

export class Topic extends Entity<TopicProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get examKind() {
    return this.props.exam_kind
  }

  static create(props: TopicProps, id?: EntityId) {
    const topic = new Topic(props, id)
    return topic
  }
}
