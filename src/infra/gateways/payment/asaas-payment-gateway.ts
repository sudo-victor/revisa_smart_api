import axios from "axios"
import { PaymentGateway, RequestCreateCustomerDTO, ResponseCreateCustomerDTO } from "@/domain/subscription/application/gateways/payment-gateway";
import { env } from "@/infra/env";

export class AsaasPaymentGateway implements  PaymentGateway {
  async createCustomer(params: RequestCreateCustomerDTO): Promise<ResponseCreateCustomerDTO> {
    const response = await axios.post("https://sandbox.asaas.com/api/v3/customers", {
      name: params.name,
      cpfCnpj: params.cpf,
      email: params.email,
      mobilePhone: params.phone
    }, {
      headers: {
        "access_token": env.PAYMENT_KEY
      }
    })
    return {
      id: response.data.id
    }
  }
}