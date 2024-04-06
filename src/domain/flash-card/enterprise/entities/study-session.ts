import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface StudySessionProps {
  student_id: EntityId;
  started_at: Date;
  ended_at: Date;
  flash_cards_answered_amount: number;
  correct_answers_amount: number;
}

export class StudySession extends Entity<StudySessionProps> {
  get userId() {
    return this.props.student_id;
  }

  get startTime() {
    return this.props.started_at;
  }

  get endTime() {
    return this.props.ended_at;
  }

  get flashCardsAnsweredAmount() {
    return this.props.flash_cards_answered_amount;
  }

  get correctAnswersAmount() {
    return this.props.correct_answers_amount;
  }

  static create(props: StudySessionProps, id?: EntityId) {
    const studySessionId = id ?? new EntityId();
    const studySession = new StudySession(props, studySessionId);
    return studySession;
  }
}
