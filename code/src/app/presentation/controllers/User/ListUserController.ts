import { UserService } from '../../../../app/services/user.service'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/users',
  method: 'get',
  name: 'list user',
  controller: 'ListUserController',
  description: 'Listagem de usuários',
  auth: true,
  middlewares: []
}
export class ListUserController implements Controller {
  private readonly userService: UserService
  constructor () {
    this.userService = new UserService()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = '10', page = '1', search = '', relations = '' } = httpRequest.query
      let relationsArray: string[] = []
      if (relations !== undefined && relations !== '' && relations !== null) {
        relationsArray = relations.split(';')
      }

      const users = await this.userService.paginationUser({
        limit: parseInt(limit),
        page: parseInt(page),
        search,
        relations: relationsArray
      })
      return success(users)
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
