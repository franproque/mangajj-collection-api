import { CollectionService } from '../../../../app/services/collection.service'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequestAuth, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/collections',
  method: 'get',
  name: 'listar minhas collections',
  controller: 'ListarCollectionController',
  description: 'Listagem de collections',
  auth: true,
  middlewares: []
}
export class ListarCollectionController implements Controller {
  private readonly collectionService: CollectionService

  constructor () {
    this.collectionService = new CollectionService()
  }

  async handle (httpRequest: HttpRequestAuth): Promise<HttpResponse> {
    try {
      const { limit = '20', page = '1', search = '' } = httpRequest.query
      const result = await this.collectionService.pagination({
        limit: Number(limit),
        page: Number(page),
        search: search,
        user: httpRequest.user.email,
        relations: ['manga', 'volumes']
      })

      return success(result)
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
