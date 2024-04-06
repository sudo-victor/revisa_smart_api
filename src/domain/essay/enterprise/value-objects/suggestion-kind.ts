import { ValueObject } from "@/core/domain/value-object";

export class SuggestionKind extends ValueObject<'error' | 'tip'> {}