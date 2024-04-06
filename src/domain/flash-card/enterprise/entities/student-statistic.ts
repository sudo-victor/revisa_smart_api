import { Entity } from "@/core/domain/entity-base";
import { EntityId } from "@/core/domain/entity-id";

export interface StudentStatisticsProps {
  student_id: EntityId;
  flash_cards_studied_amount: number;
  accuracy_rate: number;
  last_session_at: Date;
}

export class StudentStatistics extends Entity<StudentStatisticsProps> {
  get studentId() {
    return this.props.student_id;
  }

  get flashCardsStudied() {
    return this.props.flash_cards_studied_amount;
  }

  get accuracyRate() {
    return this.props.accuracy_rate;
  }

  get lastSession() {
    return this.props.last_session_at;
  }

  static create(props: StudentStatisticsProps, id?: EntityId) {
    const studentStatisticsId = id ?? new EntityId();
    const studentStatistics = new StudentStatistics(props, studentStatisticsId);
    return studentStatistics;
  }
}
