import { Column, Entity } from 'typeorm'
import Permissions from './permissions'
import Positions from './positions'

@Entity({ synchronize: false, name: 'positions_permissions_permissions' })
export default class PositionsPermissionsPermissions {
  @Column('varchar', { name: 'positionsSlug', primary: true })
  positionsSlug: Positions

  @Column('varchar', { name: 'permissionsSlug', primary: true })
  permissionsSlug: Permissions
}
