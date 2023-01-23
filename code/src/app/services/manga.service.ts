import { MangaModel } from '../domain/model/manga.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse, SearchParams } from '../infra/interfaces/pagination/pagination.interface'
import { MangaRepository } from '../infra/repositories/manga-repository'
import { MissingParamError } from '../presentation/errors'
import { JikanRepository } from '../infra/repositories-external/jikan.repository'
import { GeneroService } from './genero.service'
export class MangaService {
  private readonly mangaRepository: MangaRepository
  private readonly jikanRepository: JikanRepository
  private readonly generoService: GeneroService
  constructor () {
    this.mangaRepository = new MangaRepository()
    this.jikanRepository = new JikanRepository()
    this.generoService = new GeneroService()
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
    if (manga.title === undefined || manga.title === null) {
      throw new MissingParamError('title')
    }

    if (manga.description === undefined || manga.description === null) {
      throw new MissingParamError('description')
    }

    if (manga.image === undefined || manga.image === null) {
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
    if (manga.title === undefined || manga.title === null) {
      throw new MissingParamError('title')
    }

    if (manga.description === undefined || manga.description === null) {
      throw new MissingParamError('description')
    }

    if (manga.image === undefined || manga.image === null) {
      throw new MissingParamError('image')
    }

    if (manga.volumes === undefined || manga.volumes === null) {
      throw new MissingParamError('volumes')
    }
    return true
  }

  //async processUpdateManga (manga: UpdateMangaModel): Promise<MangaModel> {
    //await this.validInputCreate(manga)
    //return await this.addManga(manga)
  //}

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
  
   
      return resultado
    
  }

  async updateVolumes (id: number, volumes: number): Promise<MangaModel> {
    const manga = await this.findOne({
      where: {
        id
      }
    })

    if(manga === null) {
      throw new Error('Manga não encontrado')
    }

    if(manga.volumes === null) {
      manga.volumes = volumes
    }
    if(manga.volumes < volumes) {
      manga.volumes = volumes
    }

    await this.mangaRepository.update({ id}, manga)

    return manga
  }

  async sincronizarMangas (): Promise<void> {
    let page = 1
    let mangas = await this.jikanRepository.findManga(page,25)
    let total = mangas.pagination.last_visible_page
    while(page < mangas.pagination.last_visible_page) {
      console.log(page/total*100 + '%')

       let mangasSearch = await this.jikanRepository.findManga(page,25)

      for (const manga of mangasSearch.data) {
        const mangaExiste = await this.findOne({
          where: {
            idExterno: manga.mal_id.toString()
          }
        })
        if(mangaExiste === null) {
          const generosIds:number[] = []

          for (const genero of manga.genres) {
          generosIds.push((await this.generoService.processAddGenero({
              name: genero.name,
          })).id)  

          await this.addManga({
            title: manga.title?? '',
            description: manga.synopsis?? '',
            image: manga.images.jpg.image_url,
            volumes: manga.volumes?? null,
            idExterno: manga.mal_id.toString(),
            status: manga.status,
            generos: generosIds,
          })
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 3000))
    page++

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
  volumes?: number | null
  idExterno: string
  status: string
  generos: number[]
}

export interface PaginationMangaModel {
  page: number
  limit: number
  search: string
}
