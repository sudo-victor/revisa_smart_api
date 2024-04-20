import { Optional } from "@/@types/optional";
import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface SubscriptionProps {
  customer_id?: string
  sub_id?: string
  gateway: string
  status: string
  user_id: EntityId
}

export class Subscription extends Entity<SubscriptionProps> {
  get customerId() {
    return this.props.customer_id
  }

  get subId() {
    return this.props.sub_id
  }

  get gateway() {
    return this.props.gateway
  }

  get status() {
    return this.props.status
  }

  get userId() {
    return this.props.user_id
  }

  static create(props: Optional<SubscriptionProps, 'status'>, id?: EntityId) {
    const subscription = new Subscription({
      status: 'pending',
      ...props,
    }, id)
    return subscription
  }
}