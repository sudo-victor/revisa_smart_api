import { ValueObject } from "@/core/domain/value-object";

export type ResourceReferenceOptions = 'quote' | 'move' | 'book' | 'historical_fact' | 'tv_show'

export class ResourceReferenceKind extends ValueObject<ResourceReferenceOptions> {}