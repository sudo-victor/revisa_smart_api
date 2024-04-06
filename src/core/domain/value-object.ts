export class ValueObject<Value> {
  protected value: Value

  constructor (value: Value) {
    this.value = value
  }

  toValue (): Value {
    return this.value
  }

  isEqual (value: ValueObject<Value>): boolean {
    return JSON.stringify(this) === JSON.stringify(value)
  }
}
