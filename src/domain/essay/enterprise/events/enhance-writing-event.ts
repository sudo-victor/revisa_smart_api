import DomainEvent from "@/core/domain/domain-event";

export class EnhanceWritingEvent implements DomainEvent {
  name = "EnhanceWritingEvent"
  constructor(
    public id: string,
  ) {}
}