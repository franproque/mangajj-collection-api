import { v4 } from 'uuid'
export class UuidTools {
  generate (): string {
    return v4()
  }
}
