import { Connection, createConnection, getConnection } from 'typeorm'
import { database } from '../config/variables'
import { join } from 'path'
const connect = async (): Promise<Connection> => {
  const connect = {
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database
  }
  return await createConnection({

    type: 'postgres',
    ...connect,
    synchronize: database.synchronize,
    logging: database.logging,
    entities: [
      join(__dirname, '../../app/domain/entities/*{.ts,.js}')
    ]
  })
}
export const client = (): any => getConnection()
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypeOrmHelpers = {
  client: null as unknown as Connection,
  connect: async (): Promise<void> => {
    await connect()
  },
  disconnect: async (): Promise<void> => {
    await TypeOrmHelpers.client.close()
  }
}
