import { AuthenticationService } from '../../../../app/services/authentication.service'
import { MissingParamError } from '../../errors'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller } from '../../protocolos'
export const routeInfo = {
  path: '/authentication',
  method: 'post',
  name: 'authentication user',
  controller: 'AuthenticationController',
  description: 'Permite o suário se autenticar',
  auth: false,
  middlewares: []
}
export class AuthenticationController implements Controller {
  private readonly authenticationService: AuthenticationService
  constructor () {
    this.authenticationService = new AuthenticationService()
  }

  async handle (httpRequest: any): Promise<any> {
    try {
      const { email, senha } = httpRequest.body
      if (email === undefined || senha === undefined) {
        throw new MissingParamError('email ou senha')
      }

      const [token] = await Promise.all([this.authenticationService.login(email, senha)])

      return success({ token })
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
