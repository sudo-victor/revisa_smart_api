import DomainEvent from "@/core/domain/domain-event";

export class ExtractTextFromImageEvent implements DomainEvent {
  name = "ExtractTextFromImageEvent"
  constructor(
    public id: string,
  ) {}
}