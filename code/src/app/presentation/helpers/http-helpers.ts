import { InvalidParamError, MissingParamError, NotFoundError, UnauthorizedError } from '../errors'
import { BaseError } from '../errors/base-error'
import { HttpResponse } from '../protocolos'
export const serverError = (next: Function, error: BaseError): HttpResponse => {
  console.log(error)
  return {
    statusCode: error.statusCode|500,
    body: {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  }
}

export const missingParam = (paramName: string): HttpResponse => {
  const error = new MissingParamError(paramName)
  return {
    statusCode: 400,
    body: {
      name: error.name,
      message: error.message
    }
  }
}

export const invalidParam = (paramName: string): HttpResponse => {
  const error = new InvalidParamError(paramName)
  return {
    statusCode: 400,
    body: {
      name: error.name,
      message: error.message
    }
  }
}

export const success = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: { data }
  }
}

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: { data: data }
  }
}

export const notFound = (message: string): HttpResponse => {
  const error = new NotFoundError(message)
  return {
    statusCode: 404,
    body: {
      name: error.name,
      message: error.message
    }
  }
}

export const notAuthorization = (): HttpResponse => {
  const error = new UnauthorizedError()
  return {
    statusCode: 401,
    body: {
      name: error.name,
      message: error.message
    }
  }
}
