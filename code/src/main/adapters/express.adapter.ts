import { Controller, HttpRequest, HttpRequestAuth, HttpResponse } from '../../app/presentation/protocolos'
import { NextFunction, Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const httpRequest: HttpRequest| HttpRequestAuth = {
      body: request.body,
      query: request.query,
      params: request.params,
      headers: request.headers,
      nextFunction: next,
      user: request.user
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
