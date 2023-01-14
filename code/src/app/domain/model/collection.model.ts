import { MangaModel } from './manga.model'
import { UserModel } from './user.model'

export interface CollectionModel {
  id: number
  manga?: MangaModel
  user?: UserModel
  dt_criacao: Date
}
