import { UserService } from '../../../services/user.service'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/users',
  method: 'post',
  name: 'sign user',
  controller: 'SignUserController',
  description: 'Criação de usuário',
  auth: false,
  middlewares: []
}

export class SignUserController implements Controller {
  private readonly userService: UserService
  constructor () {
    this.userService = new UserService()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      httpRequest.body.position = 'administrador'
      const bodyValid = await this.userService.createValidInput(httpRequest.body)
      await this.userService.addUser(bodyValid)
      return success({
        message: 'Usuário criado com sucesso'
      })
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
