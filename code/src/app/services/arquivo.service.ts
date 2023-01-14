import { ArquivoModel } from '../domain/model/arquivo.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse } from '../infra/interfaces/pagination/pagination.interface'
import { ArquivoRepository } from '../infra/repositories/arquivo-repository'
import { MissingParamError } from '../presentation/errors'

export class ArquivoServico {
  private readonly arquivoRepository: ArquivoRepository
  constructor () {
    this.arquivoRepository = new ArquivoRepository()
  }

  async add (arquivo: AddArquivoModel): Promise<ArquivoModel> {
    const arquivoCriado = await this.arquivoRepository.add(arquivo)
    return arquivoCriado
  }

  async find (props: FindProps): Promise<ArquivoModel[]> {
    const arquivos = await this.arquivoRepository.find(props)
    return arquivos
  }

  async findById (id: number): Promise<ArquivoModel | null> {
    const arquivo = await this.find({ where: { id } })
    return arquivo[0] ?? null
  }

  async delete (id: number): Promise<void> {
    await this.arquivoRepository.delete({ id })
  }

  async paginationArquivo (props: paginationArquivo): Promise<PaginationResponse<ArquivoModel[]>> {
    const query: any[] = []

    if (props.search !== undefined) {
      query.push({
        type: 'ilike',
        param: 'nomeoriginal',
        value: props.search
      })
    }

    return await this.arquivoRepository.pagination({
      page: props.page,
      limit: props.limit,
      order: props.order,
      relations: props.relations,
      search: query,
      model: 'arquivos'
    })
  }

  validInputCreate (arquivo: AddArquivoModel): boolean {
    if (arquivo.mimetype === undefined || arquivo.mimetype === '' || arquivo.mimetype === null) {
      throw new MissingParamError('mimetype')
    }
    if (arquivo.nomeoriginal === undefined || arquivo.nomeoriginal === '' || arquivo.nomeoriginal === null) {
      throw new MissingParamError('nomeoriginal')
    }
    if (arquivo.tamanho === undefined || arquivo.tamanho === null) {
      throw new MissingParamError('tamanho')
    }
    if (arquivo.nome === undefined || arquivo.nome === '' || arquivo.nome === null) {
      throw new MissingParamError('nome')
    }

    if (arquivo.path === undefined || arquivo.path === '' || arquivo.path === null) {
      throw new MissingParamError('path')
    }

    if (arquivo.mtime === undefined || arquivo.mtime === null) {
      throw new MissingParamError('mtime')
    }
    if (typeof arquivo.tamanho !== 'number') {
      throw new MissingParamError('tamanho')
    }
    return true
  }

  async processAddArquivo (arquivo: AddArquivoModel): Promise<ArquivoModel> {
    this.validInputCreate(arquivo)
    const arquivoCriado = await this.add(arquivo)
    return arquivoCriado
  }
}

export interface paginationArquivo {
  page: number
  limit: number
  search?: string
  order?: string
  relations?: string[]
}
export interface AddArquivoModel {
  mimetype: string
  nomeoriginal: string
  tamanho: number
  nome: string
  path: string
  mtime: Date
}
