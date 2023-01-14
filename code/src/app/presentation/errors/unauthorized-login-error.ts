import { BaseError } from './base-error'

export class UnauthorizedLoginError extends BaseError {
  constructor () {
    super('Verifique suas credenciais e tente novamente.', 401)
  }
}
