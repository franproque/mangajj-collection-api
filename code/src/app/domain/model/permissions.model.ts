import { PositionsModel } from './positions.model'

/* eslint-disable @typescript-eslint/naming-convention */
export interface PermissionsModel {
  slug: string
  name: string
  description: string
  created_at: Date
  updated_at: Date
  positions?: PositionsModel[]
}

export const FIELDS = [
  'slug',
  'name',
  'description',
  'created_at',
  'updated_at',
  'positions'
]
export const CREATE_REQUIRE = [
]
export const UPDATE_REQUIRE = [
]

// Utilize as funcionalidades abaixo somente se for possuir uma interface grafica
export const FIELD_NAMES = {
  slug: 'Slug',
  name: 'Nome',
  description: 'Descrição',
  created_at: 'Criado em',
  updated_at: 'Atualizado em',
  positions: 'Cargos'
}
export const FIELD_TYPE = {
  slug: 'text',
  name: 'text',
  description: 'text',
  created_at: 'datetime',
  updated_at: 'datetime',
  positions: 'table'
}
export const FIELD_OPTIONS = {
}
export const FIELD_MASK = {}
export const EXCLUDED_FIELDS = []
export const FIELD_RELATIONS = {
}
export const FIELDS_CREATE_HIDDEN = ['slug', 'created_at', 'updated_at', 'positions']
export const FIELDS_HIDDEN_TABLE = ['created_at', 'updated_at', 'positions']
