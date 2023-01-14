import { urls } from '../../main/config/variables'
import { ArquivoModel } from '../domain/model/arquivo.model'

export interface ArquivoDto {
  nome: string
  url: string
  mimetype: string
  tamanho: number
}

export function arquivoUrl (arquivo: ArquivoModel): string {
  return `${urls.appUrl}/arquivos/${arquivo.nome}`
}

export function arquivoUrlIcone (arquivo: ArquivoModel): ArquivoDto {
  return {
    nome: arquivo.nome,
    url: arquivoUrl(arquivo),
    mimetype: arquivo.mimetype,
    tamanho: arquivo.tamanho
  }
}

export function arquivosUrlIcone (arquivos: ArquivoModel[]): ArquivoDto[] {
  return arquivos.map(arquivo => arquivoUrlIcone(arquivo))
}
