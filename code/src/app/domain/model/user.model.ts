import { PositionsModel } from './positions.model'

export interface UserModel {
  email: string
  dt_criacao: Date
  dt_atualizacao: Date
  position?: PositionsModel
  senha: string
}
