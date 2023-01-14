import { IconeModel } from './icone.model'

export interface ArquivoModel {
  id: number
  mimetype: string
  nomeoriginal: string
  tamanho: number
  nome: string
  path: string
  mtime: Date
  dt_criacao: Date
  dt_atualizacao: Date
  icones?: IconeModel[]
}
