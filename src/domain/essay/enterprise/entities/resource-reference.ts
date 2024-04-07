import { Entity } from "@/core/domain/entity-base";
import { ResourceReferenceKind } from "../value-objects/resource-reference-kind";
import { EntityId } from "@/core/domain/entity-id";

export interface ResourceReferenceProps {
  kind: ResourceReferenceKind
  title: string
  value: string
  writing_resource_id: EntityId
}

export class ResourceReference extends Entity<ResourceReferenceProps> {
  get writingResourceId() {
    return this.props.writing_resource_id.value
  }

  get kind() {
    return this.props.kind.toValue()
  }

  get title() {
    return this.props.title
  }

  get value() {
    return this.props.value
  }

  static create(props: ResourceReferenceProps, id?: EntityId) {
    const resourceReference = new ResourceReference({
      ...props
    }, id)
    return resourceReference
  }
}