import DomainEvent from "@/core/domain/domain-event";

export class StudentCreatedEvent implements DomainEvent {
  name = "StudentCreatedEvent"
  constructor(
    public id: string,
  ) {}
}