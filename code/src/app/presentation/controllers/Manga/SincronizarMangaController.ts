import { MangaService } from '../../../../app/services/manga.service'
import { MissingParamError } from '../../errors'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/sincronizar/mangas',
  method: 'get',
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
      
      void this.mangaService.sincronizarMangas()

      return success({
        message: 'Mangas sincronizados com sucesso',
      })


    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
