import { BaseError } from './base-error'

export class FolderFileError extends BaseError {
  constructor (message: string) {
    super(`Pasta ou arquivo não encontrado ${message}`, 422)
  }
}
