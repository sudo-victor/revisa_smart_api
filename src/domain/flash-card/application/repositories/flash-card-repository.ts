import { FlashCard } from "../../enterprise/entities/flash-card";

export abstract class FlashCardRepository {
  abstract save(flash_card: FlashCard): Promise<void>
}