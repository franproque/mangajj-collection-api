import { config } from 'dotenv'
config()

export const server = {
  port: parseInt(process.env.PORT ?? '3000')
}

export const production = {
  isProd: (process.env.PRODUCTION === 'true')
}

export const database = {
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'root',
  synchronize: (process.env.DB_SYNCHRONIZE === 'true'),
  logging: (process.env.DB_LOGGING === 'true')
}

export const urls = {
  appUrl: process.env.APP_URL ?? 'http://localhost:9090'
}
