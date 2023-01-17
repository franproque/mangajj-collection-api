import { CollectionModel } from '../domain/model/collection.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse, SearchParams } from '../infra/interfaces/pagination/pagination.interface'
import { CollectionRepository } from '../infra/repositories/collection-repository'
import { MissingParamError } from '../presentation/errors'

export class CollectionService {
  private readonly collectionRepository: CollectionRepository

  constructor () {
    this.collectionRepository = new CollectionRepository()
  }

  async find (props: FindProps): Promise<CollectionModel[]> {
    return await this.collectionRepository.find(props)
  }

  async findOne (props: FindProps): Promise<CollectionModel|null> {
    const collection = await this.collectionRepository.find(props)
    return collection[0] ?? null
  }

  async addCollection (collection: AddCollectionModel): Promise<CollectionModel> {
    return await this.collectionRepository.add(collection)
  }

  async validInputCreate (collection: AddCollectionModel): Promise<boolean> {
    if (collection.manga === undefined || collection.manga === null) {
      throw new MissingParamError('manga')
    }

    if (collection.user === '' || collection.user === undefined || collection.user === null) {
      throw new MissingParamError('user')
    }
    return true
  }

  async processAddCollection (collection: AddCollectionModel): Promise<CollectionModel> {
    await this.validInputCreate(collection)
    return await this.addCollection(collection)
  }

  async pagination (props: PaginationCollectionModel): Promise<PaginationResponse<CollectionModel>> {
    const query: SearchParams[] = [{
      param: 'user',
      type: 'equal',
      value: props.user
    }]

    if (props.search !== undefined && props.search !== null && props.search !== '') {
      query.push({
        param: 'title',
        type: 'ilike',
        subfiltro: {
          manga: {
            title: ''
          }
        },
        value: props.search
      })
    }

    return await this.collectionRepository.pagination({
      limit: props.limit,
      model: 'collection',
      page: props.page,
      search: query,
      relations: props.relations
    })
  }
}

export interface AddCollectionModel {
  manga: number
  user: string
}

export interface PaginationCollectionModel {
  limit: number
  page: number
  search: string
  relations: string[]
  user: string
}
