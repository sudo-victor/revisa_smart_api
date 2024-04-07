export abstract class CompareHasher {
  abstract compare(value: string, hash: string): Promise<boolean> | boolean
}