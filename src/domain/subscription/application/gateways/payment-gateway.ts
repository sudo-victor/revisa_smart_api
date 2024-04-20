
export interface RequestCreateCustomerDTO {
  name: string
  cpf: string
  email: string
  phone: string
}

export interface ResponseCreateCustomerDTO {
  id: string
}


export abstract class PaymentGateway {
  abstract createCustomer(params: RequestCreateCustomerDTO): Promise<ResponseCreateCustomerDTO>
}