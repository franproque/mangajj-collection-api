import { UserToken } from '../../../app/services/token.service'

export interface HttpRequest {
  body?: any
  params?: any
  query?: any
  headers?: any
  nextFunction: Function
}
export interface HttpRequestAuth extends HttpRequest {
  user: UserToken
}
export interface HttpResponse {
  statusCode: number
  body: any
}
