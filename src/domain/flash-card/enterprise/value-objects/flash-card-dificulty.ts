import { ValueObject } from "@/core/domain/value-object";

export class FlashCardDificulty extends ValueObject<number> {
  private constructor(value: number) {
    super(value)
  }

  static create(value: number) {
    if (value < 0 && value > 5) throw new Error('Flash card dificulty value is invalid')
    return new FlashCardDificulty(value)
  }
}