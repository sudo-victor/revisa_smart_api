import DomainEvent from "@/core/domain/domain-event";

export class GenerateQuizFromFileEvent implements DomainEvent {
  name = "GenerateQuizFromFileEvent"
  constructor(
    public id: string,
  ) {}
}