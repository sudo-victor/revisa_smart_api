import { Aggregate } from "./aggregate-base"
import { EntityId } from "./entity-id"

export abstract class Entity<Props> extends Aggregate {
  id: EntityId
  protected props: Props

  constructor(props: Props, id?: EntityId) {
    super()
    this.props = props
    this.id = id ?? new EntityId()
  }
}