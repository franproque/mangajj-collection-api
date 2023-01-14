export interface RouterInfo {
  path: string
  method: string
  name: string
  controller: string
  description: string
  auth: boolean
  middlewares: Middlewares[]
}

type Middlewares = 'upload-file'
