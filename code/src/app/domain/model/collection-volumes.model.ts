import { CollectionModel } from './collection.model'

export interface CollectionVolumesModel {
  id: number
  collection?: CollectionModel
  volumeNumero: number
  dt_criacao: Date
}
