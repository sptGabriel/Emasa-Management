type ResponseType = string | boolean | object | undefined

export class CommandResponse {
  readonly value: ResponseType

  private constructor(value: ResponseType,) {
    this.value = value
  }

  static withValue(value: ResponseType): CommandResponse {
    return new CommandResponse(value)
  }
}