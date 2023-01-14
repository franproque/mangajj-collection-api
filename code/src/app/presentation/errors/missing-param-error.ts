import { BaseError } from './base-error'

export class MissingParamError extends BaseError {
  constructor (paramName: string) {
    super(`Missing param ${paramName}`, 400)
    this.name = 'MissingParamError'
  }
}
