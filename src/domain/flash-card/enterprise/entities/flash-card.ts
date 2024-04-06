import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";
import { FlashCardDificulty } from "../value-objects/flash-card-dificulty";
import { Optional } from "@/@types/optional";

export interface FlashCardProps {
  category_id: EntityId;
  question: string;
  answer: string;
  explanation?: string;
  difficulty: FlashCardDificulty;
  author_id?: EntityId;
  created_at: Date;
}

export interface FlashCardCreateProps {
  category_id: string;
  question: string;
  answer: string;
  explanation?: string;
  difficulty: number;
  author_id?: string;
  created_at: Date;
}

export class FlashCard extends Entity<FlashCardProps> {
  get categoryId() {
    return this.props.category_id;
  }

  get question() {
    return this.props.question;
  }

  get answer() {
    return this.props.answer;
  }

  get explanation() {
    return this.props.explanation;
  }

  get difficulty() {
    return this.props.difficulty;
  }

  get authorId() {
    return this.props.author_id;
  }

  get createdAt() {
    return this.props.created_at;
  }

  static create(props: Optional<FlashCardCreateProps, 'created_at'>, id?: EntityId) {
    const flashCardId = id ?? new EntityId();
    const flashCard = new FlashCard({
      ...props,
      category_id: new EntityId(props.category_id),
      author_id: new EntityId(props.author_id),
      difficulty: FlashCardDificulty.create(props.difficulty),
      created_at: props.created_at ?? new Date(),
    }, flashCardId);
    return flashCard;
  }
}
