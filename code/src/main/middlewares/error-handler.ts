import { Request, Response, NextFunction } from 'express'
import { BaseError } from '../../app/presentation/errors/base-error'

export function errorHandler (error: BaseError, req: Request, res: Response, next: NextFunction): Response {
  return res.status(!isNaN(error.statusCode) ? error.statusCode : 500).send({
    error: error.message,
    stack: error.stack,
    name: error.name
  })
}
