import express from 'express'
import setupRoute from './routes'
import setupMiddleware from './middlewares'
import { errorHandler } from '../middlewares/error-handler'
const app = express()
setupMiddleware(app)
setupRoute(app)
app.use(errorHandler)
export { app }
