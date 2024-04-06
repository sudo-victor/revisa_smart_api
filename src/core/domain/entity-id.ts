import { randomUUID } from "crypto"

export class EntityId {
  value: string
  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}