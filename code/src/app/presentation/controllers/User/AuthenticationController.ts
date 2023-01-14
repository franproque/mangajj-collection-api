import { AuthenticationService } from '../../../../app/services/authentication.service'
import { MissingParamError } from '../../errors'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller } from '../../protocolos'
import { PessoaService } from '../../../services/pessoa.service'
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
  private readonly pessoaService: PessoaService
  constructor () {
    this.authenticationService = new AuthenticationService()
    this.pessoaService = new PessoaService()
  }

  async handle (httpRequest: any): Promise<any> {
    try {
      const { email, senha } = httpRequest.body
      if (email === undefined || senha === undefined) {
        throw new MissingParamError('email ou senha')
      }

      const [token, pessoas] = await Promise.all([this.authenticationService.login(email, senha), this.pessoaService.find({
        where: {
          user: email
        }
      })])

      return success({ token, peoples: pessoas.length > 0 })
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
