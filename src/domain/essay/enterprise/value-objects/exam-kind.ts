import { ValueObject } from "@/core/domain/value-object";

export type ExamKindValues = "ENEM" | "VESTIBULAR"

export class ExamKind extends ValueObject<ExamKindValues> {}