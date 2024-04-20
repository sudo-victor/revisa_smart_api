import { Subscription } from "@/domain/subscription/enterprise/entities/subscription";
import { Subscription as PrismaSubscription } from "@prisma/client"

export class PrismaSubscriptionMapper {
  static toPrisma(subscription: Subscription): PrismaSubscription {
    return {
      id: subscription.id.value,
      gateway: subscription.gateway,
      status: subscription.status,
      customer_id: subscription.customerId ?? null,
      sub_id: subscription.subId ?? null,
      user_id: subscription.userId.value
    }
  }
}