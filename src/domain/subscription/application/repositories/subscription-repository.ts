import { Subscription } from "../../enterprise/entities/subscription";

export abstract class SubscriptionRepository {
  abstract create(subscription: Subscription): Promise<void>
}