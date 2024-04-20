import { SubscriptionRepository } from "@/domain/subscription/application/repositories/subscription-repository";
import { Subscription } from "@/domain/subscription/enterprise/entities/subscription";
import { prismaClient } from "../client";
import { PrismaSubscriptionMapper } from "../mappers/prisma-subscription-mapper";

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async create(subscription: Subscription): Promise<void> {
    await prismaClient.subscription.create({
      data: PrismaSubscriptionMapper.toPrisma(subscription)
    })
  }
}