import { created, serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequestAuth, HttpResponse } from '../../protocolos'
import { CollectionVolumesService } from '../../../../app/services/collection-volumes.service'

export const routeInfo = {
  path: '/collections-volumes',
  method: 'post',
  name: 'adicionar ou remover volume de uma collection',
  controller: 'AdicionarOrRemoveCollectionVolumeController',
  description: 'Adicionar or remover volume',
  auth: true,
  middlewares: []
}
export class AdicionarOrRemoveCollectionVolumeController implements Controller {
  private readonly collectionVolumesService: CollectionVolumesService

  constructor () {
    this.collectionVolumesService = new CollectionVolumesService()
  }

  async handle (httpRequest: HttpRequestAuth): Promise<HttpResponse> {
    try {
      const body = httpRequest.body

      body.user = httpRequest.user.email
      const result = await this.collectionVolumesService.processAddCollectionVolumes(body)

      if (result === null) {
        return success({
          message: 'Volume removido com sucesso'
        })
      } else {
        return created(result)
      }
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
