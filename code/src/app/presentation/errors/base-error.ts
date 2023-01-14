export class BaseError extends Error {
  statusCode: number
  constructor (content: string, statusCode: number) {
    super(content)
    this.statusCode = statusCode
  }
}
