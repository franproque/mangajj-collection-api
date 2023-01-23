import { CollectionModel } from './collection.model'
import { GeneroModel } from './genero.model'

export interface MangaModel {
  id: number
  title: string
  description: string
  image: string
  volumes: number | null
  idExterno: string
  collections?: CollectionModel[]
  status: string
  genero?:GeneroModel[] 
}
