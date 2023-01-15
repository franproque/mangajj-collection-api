import { PermissionsModel } from '../domain/model/permissions.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse } from '../infra/interfaces/pagination/pagination.interface'
import { PermissionsRepository } from '../infra/repositories/permissions-repository'
import fg from 'fast-glob'
import { join } from 'path'
export class PermissionsService {
  private readonly permissionsRepository: PermissionsRepository
  constructor () {
    this.permissionsRepository = new PermissionsRepository()
  }

  async find (props: FindProps): Promise<PermissionsModel[]> {
    return await this.permissionsRepository.find(props)
  }

  async addPermissions (content: AddPermissionsModel): Promise<PermissionsModel> {
    const slug = content.name.toLowerCase().replace(/\s+/g, '-')
    return await this.permissionsRepository.add({ ...content, slug })
  }

  async paginationPermissions (content: PaginationPermissions): Promise<PaginationResponse<PermissionsModel>> {
    const query: any[] = []
    if (content.search !== undefined) {
      query.push({
        type: 'ilike',
        param: 'name',
        value: content.search
      })
    }
    return await this.permissionsRepository.pagination({
      limit: content.limit,
      page: content.page,
      model: 'permissions',
      relations: content.relations,
      search: query
    })
  }

  async loadPermissionsByFolder (folder?: string): Promise<void> {
    let arquivos: string[] = []
    arquivos = fg.sync(join(__dirname, '../presentation/controllers/**/*Controller{.ts,.js}'))
    
    for (const path of arquivos) {
      const { routeInfo }: any = (await import(path))
      const slug = routeInfo.name.toLowerCase().replace(/\s+/g, '-')
      const permission = await this.find({
        where: {
          slug
        }
      })

      if (permission.length === 0) {
        await this.addPermissions({
          name: routeInfo.name,
          description: routeInfo.description
        })
      }
    }
  }
}

interface PaginationPermissions {
  limit: number
  page: number
  search?: string
  relations?: string[]
}
interface AddPermissionsModel {
  name: string
  description: string
}
