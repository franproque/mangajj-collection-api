import { server } from './config/variables'
import { TypeOrmHelpers } from './config/conexao-db'
import loadStart from '../app/jobs/load-start'

TypeOrmHelpers.connect().then(async () => {
  await loadStart()

  const { app } = await import ('./config/app')
  app.listen(server.port, () => {
    console.log(`Servidor iniciado com sucesso.  http://localhost:${server.port}`)
  })
}).catch((error) => {
  console.log(error)
})
