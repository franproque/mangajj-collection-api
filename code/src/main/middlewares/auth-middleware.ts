import { NextFunction, Request, Response } from 'express'
import { TokenUserService } from '../../app/services/token.service'
import { positionsGlobal } from '../config/global'
const tokenService = new TokenUserService()
const authMiddleware = (name: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const authorization = req.headers.authorization
    if (authorization !== undefined && authorization !== null && authorization !== '') {
      const token = authorization.split(' ')[1]
      if (token === undefined || token === null || token === '') {
        res.status(401).json({ message: 'Token inválido' })
      }
      const user = await tokenService.verifyTokenUser(token)

      if (user === null && user === undefined) {
        res.status(401).json({ message: 'Token inválido' })
      }

      if (user?.position?.slug !== undefined) {
        const position = user?.position
        if (positionsGlobal[position.slug].findIndex(value => value === slug) !== -1) {
          req.user = user
          next()
        } else {
          res.status(422).json({ message: 'Você não tem permissão para acessar essa rota' })
        }
      } else {
        res.status(401).json({ message: 'Token inválido' })
      }
    } else {
      return res.status(401).json({
        error: 'Token inválido'
      })
    }
  }
}

export default authMiddleware
