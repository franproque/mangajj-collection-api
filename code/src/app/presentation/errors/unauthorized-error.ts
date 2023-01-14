import { BaseError } from './base-error'

export class UnauthorizedError extends BaseError {
  constructor () {
    super('Não possui permissão para acesso', 401)
  }
}
