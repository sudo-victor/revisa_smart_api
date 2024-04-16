import { Entity } from "@/core/domain/entity-base";
import { ResourceReference } from "./resource-reference";
import { EntityId } from "@/core/domain/entity-id";
import { Optional } from "@/@types/optional";
import { WritingResourceStatus, WritingResourceStatusOptions } from "../value-objects/writing-resource-status";
import { EnhanceWritingEvent } from "../events/enhance-writing-event";

export interface WritingResourceProps {
  theme: string;
  thesis: string;
  author_id: EntityId
  status: WritingResourceStatus,
  references: ResourceReference[]
}

export interface WritingResourceCreateProps {
  theme: string;
  thesis: string;
  author_id: EntityId
  status: WritingResourceStatusOptions
  references: ResourceReference[]
}

export class WritingResource extends Entity<WritingResourceProps> {
  get theme() {
    return this.props.theme
  }

  get thesis() {
    return this.props.thesis
  }

  get authorId() {
    return this.props.author_id.value
  }

  get status() {
    return this.props.status
  }

  get references() {
    return this.props.references
  }

  static create(props: Optional<WritingResourceCreateProps, 'references' | 'status'>, id?: EntityId) {
    const writingResource = new WritingResource({
      ...props,
      status: new WritingResourceStatus((props.status ?? 'pending') as WritingResourceStatusOptions),
      references: props.references ?? []
    }, id)
    return writingResource
  }

  process() {
    this.status.process()
    this.notify(new EnhanceWritingEvent(
      this.id.value
    ))
  }
}