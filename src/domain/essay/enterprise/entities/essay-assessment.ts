import { Entity } from "@/core/domain/entity-base";
import { Competence, CompetenceCreate, CompetenceProps } from "./competence";
import { Optional } from "@/@types/optional";
import { EssayAssessmentStatus, EssayAssessmentStatusValues } from "../value-objects/essay-assessment-status";
import { EntityId } from "@/core/domain/entity-id";
import { EvaluateEssayEvent } from "../events/evaluate-essay-event";
import { Topic } from "./topic";

export interface EssayAssessmentProps {
  status: EssayAssessmentStatus;
  essay_kind: 'enem';
  essay_title: string;
  essay_content: string;
  total_score: number | null;
  competences: Competence[];
  created_at: Date;
  student_id: EntityId
  topic: Topic | null
}

export type EssayAssessmentCreate = EssayAssessmentProps & {
  status: EssayAssessmentStatusValues | string
  competences: CompetenceCreate[];
}

export class EssayAssessment extends Entity<EssayAssessmentProps> {
  get topic() {
    return this.props.topic
  }

  get studentId() {
    return this.props.student_id
  }

  get createdAt() {
    return this.props.created_at
  }

  get competences() {
    return this.props.competences
  }

  get totalScore() {
    return this.props.total_score
  }

  get status() {
    return this.props.status
  }

  get essayKind() {
    return this.props.essay_kind
  }

  get essayTitle() {
    return this.props.essay_title
  }

  get essayContent() {
    return this.props.essay_content
  }

  static create(props: Optional<EssayAssessmentCreate, 'created_at' | 'status' | 'competences' | 'total_score'>, id?: EntityId) {
    const entity = new EssayAssessment({
      ...props,
      status: new EssayAssessmentStatus((props.status ?? 'pending') as EssayAssessmentStatusValues),
      created_at: new Date(),
      competences: [],
      total_score: props.total_score ??null,
    }, id)
    
    return entity
  }

  process() {
    this.status.process()
    this.notify(new EvaluateEssayEvent(
      this.id.value
    ))
  }

  answer(data: EssayAssessmentCreate) {
    this.props.total_score = data.total_score
    if (data.status === "error") {
      this.status.completeWithError()
    } else {
      this.status.completeWithSuccess()
    }
  }
}