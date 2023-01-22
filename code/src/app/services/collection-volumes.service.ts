import { CollectionVolumesModel } from '../domain/model/collection-volumes.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { CollectionVolumesRepository } from '../infra/repositories/collection-volumes-repository'
import { CollectionService } from './collection.service'

export class CollectionVolumesService {
  private readonly collectionVolumesRepository: CollectionVolumesRepository
  private readonly collectionService: CollectionService
  constructor () {
    this.collectionVolumesRepository = new CollectionVolumesRepository()
    this.collectionService = new CollectionService()
  }

  async find (props: FindProps): Promise<CollectionVolumesModel[]> {
    return await this.collectionVolumesRepository.find(props)
  }

  async findOne (props: FindProps): Promise<CollectionVolumesModel|null> {
    const collectionVolumes = await this.collectionVolumesRepository.find(props)
    return collectionVolumes[0] ?? null
  }

  async addCollectionVolumes (collectionVolumes: AddCollectionVolumesModel): Promise<CollectionVolumesModel> {
    return await this.collectionVolumesRepository.add({
      volumeNumero: collectionVolumes.volume,
      collection: collectionVolumes.collection
    })
  }

  async delete (id: number): Promise<void> {
    await this.collectionVolumesRepository.delete({ id })
  }

  async processAddCollectionVolumes (collectionVolumes: AddCollectionVolumeAndCreateCollectionModel): Promise<CollectionVolumesModel|null> {
    let collectionSearch: number|undefined

    if (collectionVolumes.collection !== undefined && collectionVolumes.collection !== null) {
      const collectionResult = await this.collectionService.findOne({
        where: {
          id: collectionVolumes.collection,
          user: collectionVolumes.user
        }
      })

      if (collectionResult !== null) {
        collectionSearch = collectionResult.id
      }
    } else {
      const collectionResultManga = await this.collectionService.findOne({
        where: {
          user: collectionVolumes.user,
          manga: collectionVolumes.manga
        }
      })
      if (collectionResultManga !== null) {
        collectionSearch = collectionResultManga.id
      } else {
        const collectionResult = await this.collectionService.processAddCollection({
          manga: collectionVolumes.manga,
          user: collectionVolumes.user
        })

        collectionSearch = collectionResult.id
      }
    }

    const collectionVolumesResultSearch = await this.findOne({
      where: {
        collection: collectionSearch,
        volumeNumero: collectionVolumes.volume
      }
    })

    if (collectionVolumesResultSearch === null && collectionSearch !== undefined) {
      return await this.addCollectionVolumes({
        collection: collectionSearch,
        volume: collectionVolumes.volume
      })
    } else {
      await this.delete(collectionVolumesResultSearch?.id ?? 0)
      const resultadoDosVolumes = await this.find({
        where: {
          collection: collectionSearch
        }
      })

      if (resultadoDosVolumes.length === 0) {
        if (collectionSearch !== undefined) { await this.collectionService.delete(collectionSearch) }
      }
      return collectionVolumesResultSearch
    }
  }
}

export interface AddCollectionVolumesModel {
  collection: number
  volume: number
}

export interface AddCollectionVolumeAndCreateCollectionModel {
  collection?: number
  volume: number
  manga: number
  user: string
}
