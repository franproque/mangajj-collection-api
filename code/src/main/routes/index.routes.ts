/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Express, Router } from 'express'
import { adaptRoute } from '../adapters/express.adapter'
import fg from 'fast-glob'
import { join } from 'path'
import { RouterInfo } from '../../app/presentation/protocolos/route-info'

export default async (app: Express): Promise<void> => {
  const router = Router()
  let controllers = fg.sync(join(__dirname, '../../app/presentation/controllers/**{.ts,.js}'))
  controllers = controllers.concat(fg.sync(join(__dirname, '../../pluguins/**/app/presentation/controllers/**{.ts,.js}')))
  controllers.map(async (file) => {
    const fileImport = (await import(`${file}`))
    let routeInfo: RouterInfo|undefined
    let controller: any
    const middlewares: any[] = []
    for (const key in fileImport) {
      if (key === 'routeInfo') {
        routeInfo = fileImport[key]
      } else {
        controller = new fileImport[key]()
      }
    }
    if (routeInfo !== undefined) {
      if (routeInfo.auth) {
        middlewares.push((await import(join(__dirname, '../middlewares/auth-middleware'))).default(routeInfo.name))
      }
      for (const middleware of routeInfo.middlewares) {
        middlewares.push((await import(join(__dirname, `../middlewares/${middleware}`))).default)
      }
      router[routeInfo.method](routeInfo.path, middlewares, adaptRoute(controller))
    }
  })
  app.use(router)
}
