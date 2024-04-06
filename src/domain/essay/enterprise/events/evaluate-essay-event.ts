import DomainEvent from "@/core/domain/domain-event";

export class EvaluateEssayEvent implements DomainEvent {
  name = "EvaluateEssayEvent"
  constructor(
    public id: string,
  ) {}
}