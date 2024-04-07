export abstract class JwtToken {
  abstract generate(payload: any): string
}