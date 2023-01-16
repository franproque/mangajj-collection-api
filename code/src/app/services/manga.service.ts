import { MangaModel } from '../domain/model/manga.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse, SearchParams } from '../infra/interfaces/pagination/pagination.interface'
import { MangaRepository } from '../infra/repositories/manga-repository'
import { MissingParamError } from '../presentation/errors'
import { JikanRepository} from '../infra/repositories-external/jikan.repository'
export class MangaService {
  private readonly mangaRepository: MangaRepository
  private readonly jikanRepository: JikanRepository
  constructor () {
    this.mangaRepository = new MangaRepository()
    this.jikanRepository = new JikanRepository()
  }

  async find (props: FindProps): Promise<MangaModel[]> {
    return await this.mangaRepository.find(props)
  }

  async findOne (props: FindProps): Promise<MangaModel|null> {
    const manga = await this.mangaRepository.find(props)
    return manga[0] ?? null
  }

  async addManga (manga: AddMangaModel): Promise<MangaModel> {
    return await this.mangaRepository.add(manga)
  }

  async validInputCreate (manga: AddMangaModel): Promise<boolean> {
    if (manga.title === '' || manga.title === undefined || manga.title === null) {
      throw new MissingParamError('title')
    }

    if (manga.description === '' || manga.description === undefined || manga.description === null) {
      throw new MissingParamError('description')
    }

    if (manga.image === '' || manga.image === undefined || manga.image === null) {
      throw new MissingParamError('image')
    }

    if (manga.volumes === undefined || manga.volumes === null) {
      throw new MissingParamError('volumes')
    }
    return true
  }

  async processAddManga (manga: AddMangaModel): Promise<MangaModel> {
    await this.validInputCreate(manga)

    return await this.addManga(manga)
  }

  async validInputUpdate (manga: UpdateMangaModel): Promise<boolean> {
    if (manga.title === '' || manga.title === undefined || manga.title === null) {
      throw new MissingParamError('title')
    }

    if (manga.description === '' || manga.description === undefined || manga.description === null) {
      throw new MissingParamError('description')
    }

    if (manga.image === '' || manga.image === undefined || manga.image === null) {
      throw new MissingParamError('image')
    }

    if (manga.volumes === undefined || manga.volumes === null) {
      throw new MissingParamError('volumes')
    }
    return true
  }

  async processUpdateManga (manga: UpdateMangaModel): Promise<MangaModel> {
    await this.validInputCreate(manga)
    return await this.addManga(manga)
  }

  async pagination (pagination: PaginationMangaModel): Promise<PaginationResponse<MangaModel>> {
    const query: SearchParams[] = []

    if (pagination.search !== undefined && pagination.search !== null && pagination.search !== '') {
      query.push({
        param: 'title',
        type: 'ilike',
        value: pagination.search
      })
    }
    const resultado = await this.mangaRepository.pagination({
      limit: pagination.limit,
      model: 'mangas',
      page: pagination.page,
      search: query
    })

    if(resultado.data.data.length === 0) {
      const mangas = await this.jikanRepository.findManga(pagination.page, pagination.limit, pagination.search)
      for(let manga of mangas.data) {
        if(manga.volumes !== null && manga.title !== null && manga.synopsis!==null && manga.images!==null && manga.status!==null) {
        await this.processAddManga({
          description: manga.synopsis,
          idExterno: manga.mal_id.toString(),
          image: manga.images.jpg.image_url,
          title: manga.title,
          volumes: manga.volumes,
          status: manga.status
        })
      }
      }

      const resultado = await this.mangaRepository.pagination({
        limit: pagination.limit,
        model: 'mangas',
        page: pagination.page,
        search: query
      })

      return resultado
    } else {
      return resultado
    }
  }
}

export interface UpdateMangaModel {
  id: number
  title: string
  description: string
  image: string
  volumes: number
  idExterno: string
  status: string
}
export interface AddMangaModel {
  title: string
  description: string
  image: string
  volumes: number
  idExterno: string
  status: string
}

export interface PaginationMangaModel {
  page: number
  limit: number
  search: string
}
