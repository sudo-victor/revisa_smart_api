import { EntityId } from "@/core/domain/entity-id"
import { StudentRepostory } from "@/domain/account/application/repositories/student-repository"
import { PaymentGateway } from "../gateways/payment-gateway"
import { SubscriptionRepository } from "../repositories/subscription-repository"
import { Subscription } from "../../enterprise/entities/subscription"

export class RegisterSubscriptionReferenceUsecase {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private studentRepository: StudentRepostory,
    private payment: PaymentGateway,
  ) {}

  async execute(props: Input): Promise<Output> {
    const user = await this.studentRepository.findById(new EntityId(props.user_id))
    if (!user) throw new Error("User not found")
    const customer = await this.payment.createCustomer({
      cpf: user.cpf,
      email: user.email,
      name: user.fullname,
      phone: user.phone
    })
    const subscription = Subscription.create({
      gateway: 'ASAAS',
      user_id: user.id,
      customer_id: customer.id,
    })
    await this.subscriptionRepository.create(subscription)
  }
}

type Input = {
  user_id: string
}

type Output = void