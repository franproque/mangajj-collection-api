import { MangaService } from '../../../../app/services/manga.service'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'
export const routeInfo = {
  path: '/mangas',
  method: 'get',
  name: 'listar mangas',
  controller: 'ListarMangaController',
  description: 'Listagem de mangas',
  auth: true,
  middlewares: []
}
export class ListarMangaController implements Controller {
  private readonly mangaService: MangaService

  constructor () {
    this.mangaService = new MangaService()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = '20', page = '1', search = '' } = httpRequest.query
      const result = await this.mangaService.pagination({
        limit: Number(limit),
        page: Number(page),
        search
      })

      return success(result)
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
