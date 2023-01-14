import { MangaModel } from '../domain/model/manga.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { MangaRepository } from '../infra/repositories/manga-repository'
import { MissingParamError } from '../presentation/errors'

export class MangaService {
  private readonly mangaRepository: MangaRepository

  constructor () {
    this.mangaRepository = new MangaRepository()
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
}

export interface UpdateMangaModel {
  id: number
  title: string
  description: string
  image: string
  volumes: number
  idExterno: string
}
export interface AddMangaModel {
  title: string
  description: string
  image: string
  volumes: number
  idExterno: string
}
