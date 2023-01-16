import { MangaService } from '../../../../app/services/manga.service'
import { MissingParamError } from '../../errors'
import { serverError, success } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocolos'

export const routeInfo = {
  path: '/mangas/:id',
  method: 'get',
  name: 'pegar manga mangas',
  controller: 'PegarMangaPeloIdController',
  description: 'Pegar manga pelo id de mangas',
  auth: true,
  middlewares: []
}
export class PegarMangaPeloIdController implements Controller {
  private readonly mangaService: MangaService

  constructor () {
    this.mangaService = new MangaService()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      if (isNaN(parseInt(id))) {
        throw new MissingParamError('id')
      }
      const result = await this.mangaService.findOne({
        where: { id: Number(id) }
      })

      return success(result)
    } catch (error) {
      return serverError(httpRequest.nextFunction, error)
    }
  }
}
