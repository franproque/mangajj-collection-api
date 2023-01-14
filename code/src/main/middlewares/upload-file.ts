import { ArquivoServico } from '../../app/services/arquivo.service'
import { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'
import { join } from 'path'
import fs from 'fs'
const arquivoService = new ArquivoServico()
export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const form: any = new formidable.IncomingForm()
  const path = join(__dirname, '../../../arquivos')
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  form.uploadDir = path
  form.parse(req, async (err, fields, files) => {
    console.log(err)
    if (err !== undefined && err !== null) {
      next(err)
    }
    const keys = Object.keys(files)
    const filesCreated: any[] = []
    for (const key of keys) {
      const file = JSON.parse(JSON.stringify(files[key]))
      const result = await arquivoService.processAddArquivo({
        nome: file.newFilename,
        mimetype: file.mimetype,
        nomeoriginal: file.originalFilename,
        path: file.filepath,
        tamanho: file.size,
        mtime: file.mtime
      })
      filesCreated.push(result)
    }
    req.body = { ...fields, files: filesCreated }
    next()
  })
}
