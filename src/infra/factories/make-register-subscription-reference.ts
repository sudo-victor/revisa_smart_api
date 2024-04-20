import { RegisterSubscriptionReferenceUsecase } from "@/domain/subscription/application/usecases/register-subscription-reference-usecase";
import { PrismaSubscriptionRepository } from "../database/prisma/repositories/prisma-subscription-repository";
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository";
import { AsaasPaymentGateway } from "../gateways/payment/asaas-payment-gateway";
import { RegisterCustomerConsumer } from "../queue/consumers/register-customer-consumer";

export class MakeRegisterSubscriptionReference {
  static make() {
    const payment = new AsaasPaymentGateway()
    const studentRepository = new PrismaStudentRepository()
    const subscriptionRepository = new PrismaSubscriptionRepository()
    const registerSubscriptionReferenceUsecase = new RegisterSubscriptionReferenceUsecase(
      subscriptionRepository,
      studentRepository,
      payment
    )
    return registerSubscriptionReferenceUsecase
  }
}