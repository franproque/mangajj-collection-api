import { CollectionModel } from './collection.model'

export interface MangaModel {
  id: number
  title: string
  description: string
  image: string
  volumes: number
  idExterno: string
  collections?: CollectionModel[]
}
