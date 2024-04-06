import { FlashCard } from "../../enterprise/entities/flash-card";
import { FlashCardRepository } from "../repositories/flash-card-repository";

export class CreateCardUsecase {
  constructor(
    private flashCardRepository: FlashCardRepository
  ) {}

  async execute(props: Input): Promise<Output> {
    const card = FlashCard.create({
      answer: props.answer,
      category_id: props.category_id,
      question: props.question,
      explanation: props.explanation,
      author_id: props.author_id,
      difficulty: props.difficulty
    })
    await this.flashCardRepository.save(card)
    return {
      id: card.id.value
    }
  }

}

type Input = {
  category_id: string;
  question: string;
  answer: string;
  explanation?: string;
  difficulty: number;
  author_id?: string;
  created_at: Date;
}

type Output = {
  id: string
}