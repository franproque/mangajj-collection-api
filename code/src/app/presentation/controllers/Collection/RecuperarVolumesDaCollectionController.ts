import { CollectionService } from '../../../../app/services/collection.service'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequestAuth, HttpResponse } from '../../protocolos'
import { MissingParamError } from '../../errors'

export const routeInfo = {
  path: '/collections/:id',
  method: 'get',
  name: 'recuperar volumes de uma collection',
  controller: 'RecuperarVolumesDaCollectionControlle',
  description: 'recuperar volumes de uma collection',
  auth: true,
  middlewares: []
}
export class RecuperarVolumesDaCollectionControlle implements Controller {
  private readonly collectionService: CollectionService

  constructor () {
    this.collectionService = new CollectionService()
  }

  async handle (httpRequest: HttpRequestAuth): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      if (isNaN(Number(id))) {
        throw new MissingParamError('id')
      }
      const result = await this.collectionService.findOne({
        where: {
          user: httpRequest.user.email,
          id: Number(id)
        },
        relations: ['volumes', 'manga']
      })

      return success(result)
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
