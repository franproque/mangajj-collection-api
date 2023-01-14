import { PermissionsModel } from './permissions.model'
import { UserModel } from './user.model'

/* eslint-disable @typescript-eslint/naming-convention */
export interface PositionsModel {
  slug: string
  name: string
  description: string
  created_at: string
  updated_at: string
  users?: UserModel[]
  permissions?: PermissionsModel[]
}

export const FIELDS = [
  'slug',
  'name',
  'description',
  'created_at',
  'updated_at',
  'users',
  'permissions'
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
  users: 'Usuários',
  permissions: 'Permissões'
}
export const FIELD_TYPE = {
  slug: 'text',
  name: 'text',
  description: 'text',
  created_at: 'datetime',
  updated_at: 'datetime',
  users: 'table',
  permissions: 'table-edit'
}
export const FIELD_OPTIONS = {
}
export const FIELD_MASK = {}
export const EXCLUDED_FIELDS = []
export const FIELD_RELATIONS = {
}
export const FIELDS_CREATE_HIDDEN = ['slug', 'secretkeys', 'created_at', 'updated_at']
export const FIELDS_HIDDEN_TABLE = ['slug', 'secretkeys', 'created_at', 'updated_at', 'users', 'permissions']
