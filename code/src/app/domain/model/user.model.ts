/* eslint-disable @typescript-eslint/naming-convention */
import { CategoriaModel } from './categoria.model'
import { ContaModel } from './conta.model'
import { PessoaModel } from './pessoa.model'
import { PositionsModel } from './positions.model'

export interface UserModel {
  email: string
  dt_criacao: Date
  dt_atualizacao: Date
  position?: PositionsModel
  pessoas?: PessoaModel[]
  senha: string
  categorias?: CategoriaModel[]
  contas?: ContaModel[]
}
