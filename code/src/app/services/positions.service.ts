import { PermissionsModel } from '../domain/model/permissions.model'
import { PositionsModel } from '../domain/model/positions.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse } from '../infra/interfaces/pagination/pagination.interface'
import { PositionsPermissionsRepository } from '../infra/repositories/positions-permissions-repository'
import { PositionsRepository } from '../infra/repositories/positions-repository'
import { PermissionsService } from './permissions.service'
import { positionsGlobal } from '../../main/config/global'

export class PositionsService {
  private readonly positionsRepository: PositionsRepository
  private readonly permissionsService: PermissionsService
  private readonly positionsPermissionsRepository: PositionsPermissionsRepository
  constructor () {
    this.positionsRepository = new PositionsRepository()
    this.permissionsService = new PermissionsService()
    this.positionsPermissionsRepository = new PositionsPermissionsRepository()
  }

  async find (props: FindProps): Promise<PositionsModel[]> {
    return await this.positionsRepository.find(props)
  }

  async addPositions (content: AddPositionsModel): Promise<PositionsModel> {
    const slug = content.name.toLowerCase().replace(/\s+/g, '-')
    const created = await this.positionsRepository.add({ ...content, slug })
    void this.loadPositionsDBToVariableGlobal()

    return created
  }

  async updatePositions (slug: string, content: UpdatePositionsModel): Promise<void> {
    await this.positionsPermissionsRepository.delete({ positionsSlug: slug })
    for (const permission of content.permissions) {
      await this.positionsPermissionsRepository.add({
        positionsSlug: slug,
        permissionsSlug: permission.slug
      })
    }
    const { permissions, ...result } = content
    await this.positionsRepository.update({ slug }, result)
    void this.loadPositionsDBToVariableGlobal()
  }

  async deletePositions (slug: string): Promise<void> {
    await this.positionsRepository.delete({ slug })
  }

  async paginationPositions (content: PaginationPositions): Promise<PaginationResponse<PositionsModel>> {
    const query: any[] = []

    if (content.search !== undefined) {
      query.push({
        type: 'ilike',
        param: 'name',
        value: content.search
      })
    }

    return await this.positionsRepository.pagination({
      limit: content.limit,
      page: content.page,
      model: 'positions',
      order: {
        name: 'ASC'
      },
      search: query,
      relations: content.relations
    })
  }

  async getPositionsBySlug (slug: string): Promise<PositionsModel| null> {
    const positions = await this.positionsRepository.find({
      where: {
        slug
      },
      relations: ['permissions']
    })

    if (positions.length === 0) {
      return null
    }
    return positions[0]
  }

  async validPositionExists (name: string): Promise<boolean> {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    return (await this.getPositionsBySlug(slug)) !== null
  }

  async loadPositions (): Promise<void> {
    const postionsCreate = [{
      name: 'Administrador',
      description: 'Administrador do sistema, usuário com acesso total ao sistema'
    }]
    const permissions = await this.permissionsService.find({})
    for (const position of postionsCreate) {
      if (!(await this.validPositionExists(position.name))) {
        await this.addPositions({
          permissions,
          ...position
        })
      } else {
        const slug = position.name.toLowerCase().replace(/\s+/g, '-')
        await this.updatePositions(slug, { permissions })
      }
    }
  }

  async loadPositionsDBToVariableGlobal (): Promise<void> {
    const positions = await this.find({
      relations: ['permissions']
    })

    for (const position of positions) {
      positionsGlobal[position.slug] = position.permissions?.map(permission => permission.slug)
    }
  }
}

interface PaginationPositions {
  limit: number
  page: number
  search?: string
  relations?: string[]
}
interface UpdatePositionsModel {
  description?: string
  permissions: PermissionsModel[]
}
interface AddPositionsModel {
  name: string
  description: string
  permissions?: PermissionsModel[]
}
