
import { PositionsModel } from '../domain/model/positions.model'
import { UserModel } from '../domain/model/user.model'
import { TokenTools } from '../tools/token.tools'

export class TokenUserService {
  private readonly tokenTools: TokenTools
  constructor () {
    this.tokenTools = new TokenTools()
  }

  async generateTokenUser (user: UserModel): Promise<string> {
    return await this.tokenTools.generateToken(JSON.parse(JSON.stringify({
      email: user.email,
      position: user.position
    })), 'franciscofodade++++', '900h')
  }

  async verifyTokenUser (token: string): Promise<UserToken| null> {
    return await this.tokenTools.decodeToken(token, 'franciscofodade++++')
  }
}

export interface UserToken {
  email: string
  nome: string
  position: PositionsModel
}
