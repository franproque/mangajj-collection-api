import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
  constructor (message: string) {
    super(`Not found ${message}`, 404)
    this.name = 'NotFoundError'
  }
}
