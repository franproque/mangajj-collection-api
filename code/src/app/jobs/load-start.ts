import { PermissionsService } from '../services/permissions.service'
import { PositionsService } from '../services/positions.service'
import { UserService } from '../services/user.service'
const permissionsService = new PermissionsService()
const positionsService = new PositionsService()
const userService = new UserService()
const loadStart = async (): Promise<void> => {
  await permissionsService.loadPermissionsByFolder()
  await positionsService.loadPositions()
  await positionsService.loadPositionsDBToVariableGlobal()
  await userService.loadUser()
}

export default loadStart
