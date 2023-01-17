import { PaginationResponseRepository } from '../interfaces/pagination/pagination-response-count'
import { PaginationFormatResponse, PaginationParams, PaginationResponse } from '../interfaces/pagination/pagination.interface'
import { getRepository, ILike, Repository } from 'typeorm'
import { FindProps } from '../interfaces/find-props.interface'
import { production } from '../../../main/config/variables'

export class BaseRepository {
  private readonly model: string
  constructor (model: string) {
    this.model = model
  }

  async instanceRepository (): Promise<Repository<any>> {
    const model = (await import(`../../domain/entities/${this.model}.${production.isProd ? 'js' : 'ts'}`)).default
    const repository = getRepository(model)

    return repository
  }

  async add (content: any): Promise<any> {
    const repository = await this.instanceRepository()
    return await repository.save(content)
  }

  async delete (content: any): Promise<void> {
    const repository = await this.instanceRepository()
    await repository.delete(content)
  }

  async find (props: FindProps): Promise<any[]> {
    const repository = await this.instanceRepository()
    return await repository.find(props)
  }

  montedObject (array: string[], object: any, field: string, search: any): any {
    for (const value of array) {
      object[value] = value
    }
    return object
  }

  async paginationBase (props: PaginationParams): Promise<PaginationResponseRepository> {
    const repository = await this.instanceRepository()
    const where: any[] = []
    const resultIlike = props.search.filter((value) => value.type === 'ilike')
    for (const value of resultIlike) {
      let object: any = {}
      if (value.subfiltro === undefined) {
        object[value.param] = ILike(`%${(value.value ?? '').toString()}%`)
      } else {
        object = this.montedObject(value.subfiltro, object, value.param, ILike(`%${(value.value ?? '').toString()}%`))
      }
      where.push(object)
    }

    const resultEqual = props.search.filter((value) => value.type === 'equal')

    for (const value of resultEqual) {
      if (where.length > 0) {
        for (let i = 0; i < where.length; i++) {
          where[i][value.param] = value.value
        }
      } else {
        const object: any = {}
        object[value.param] = value.value
        where.push(object)
      }
    }
    const queryResult = await repository.findAndCount({
      skip: props.limit * (props.page - 1),
      take: props.limit,
      relations: (props.relations ?? {}),
      where: where,
      order: (props.order ?? {})
    })
    return {
      data: queryResult[0],
      total: queryResult[1]
    }
  }

  async update (params: any, content: any): Promise<any> {
    const repository = await this.instanceRepository()
    return await repository.update(params, content)
  }

  async pagination (props: PaginationParams): Promise<PaginationResponse<any>> {
    const pagination = await this.paginationBase(props)
    const totalPages = ((pagination.total % props.limit) === 0 ? (pagination.total / props.limit) : parseInt(((pagination.total / props.limit) + 1).toString()))

    const paginationFormat: PaginationFormatResponse<any> = {
      data: pagination.data,
      total: pagination.total,
      from: (props.page === 1 ? 1 : ((props.page * props.limit) / 2) + 1),
      first_page_url: `/api/${props.model}?page=1&limit=${props.limit}`,
      path: `/api/${props.model}`,
      to: props.page * props.limit,
      per_page: props.limit,
      last_page: totalPages,
      current_page: props.page,
      last_page_url: `/api/${props.model}?page=${totalPages}&limit=${props.limit}`,
      next_page_url: (props.page < totalPages ? `/api/${props.model}?page=${props.page + 1}&limit=${props.limit}` : ''),
      prev_page_url: (props.page > 1 ? `/api/${props.model}?page=${props.page - 1}&limit=${props.limit}` : '')
    }
    return {
      success: true,
      data: paginationFormat
    }
  }
}
