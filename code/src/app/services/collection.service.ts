import { CollectionModel } from '../domain/model/collection.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
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
}

export interface AddCollectionModel {
  manga: number
  user: string
}
