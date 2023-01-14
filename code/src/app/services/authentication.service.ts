import { TokenUserService } from './token.service'
import { UserService } from './user.service'

export class AuthenticationService {
  private readonly userService: UserService
  private readonly tokenUserService: TokenUserService

  constructor () {
    this.userService = new UserService()
    this.tokenUserService = new TokenUserService()
  }

  async login (email: string, senha: string): Promise<string> {
    const user = await this.userService.findByEmailAndPassword(email, senha)
    console.log(user)
    return await this.tokenUserService.generateTokenUser(user)
  }
}
