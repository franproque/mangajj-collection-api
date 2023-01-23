import { MangaService } from '../../../../app/services/manga.service'
import { MissingParamError } from '../../errors'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/mangas/:id/volumes',
  method: 'put',
  name: 'atualizar qauntidade volumes',
  controller: 'AtualizarQuantidadeDeVolumesMangaController',
  description: 'Atualizar quantidade de mangas',
  auth: true,
  middlewares: []
}
export class AtualizarQuantidadeDeVolumesMangaController implements Controller {
  private readonly mangaService: MangaService

  constructor () {
    this.mangaService = new MangaService()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { quantidadeVolumes } = httpRequest.body

      if(isNaN(parseInt(id))) {
        throw new MissingParamError('id')
      }

      if(isNaN(parseInt(quantidadeVolumes))) {
        throw new MissingParamError('quantidadeVolumes')
      }
      const result = await this.mangaService.updateVolumes(
        id,
        quantidadeVolumes
      )

      return success(result)


    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
