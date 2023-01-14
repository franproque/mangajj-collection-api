import { UserModel } from '../domain/model/user.model'
import { FindProps } from '../infra/interfaces/find-props.interface'
import { PaginationResponse } from '../infra/interfaces/pagination/pagination.interface'
import { UserRepository } from '../infra/repositories/user-repository'
import { MissingParamError } from '../presentation/errors'
import { UnauthorizedLoginError } from '../presentation/errors/unauthorized-login-error'
import { HashTools } from '../tools/hash.tools'
import { ValidatorTools } from '../tools/validator.tools'

export class UserService {
  private readonly userRepository: UserRepository
  private readonly hashTools: HashTools
  private readonly validatorTools: ValidatorTools
  constructor () {
    this.userRepository = new UserRepository()
    this.hashTools = new HashTools()
    this.validatorTools = new ValidatorTools()
  }

  async addUser (content: AddUserModel): Promise<UserModel> {
    const passwordHash = await this.hashTools.hash(content.senha)
    content.senha = passwordHash
    return await this.userRepository.add(content)
  }

  async find (props: FindProps): Promise<UserModel[]> {
    return await this.userRepository.find(props)
  }

  async findByEmail (email: string): Promise<UserModel| null> {
    const users = await this.find({
      where: {
        email
      },
      relations: ['position']
    })
    return users[0] ?? null
  }

  async findByEmailAndPassword (email: string, password: string): Promise<UserModel> {
    const user = await this.findByEmail(email)
    if (user !== null) {
      const isValid = await this.hashTools.compare(password, user.senha)
      if (isValid) {
        return user
      }
    }
    throw new UnauthorizedLoginError()
  }

  async deleteUser (email: string): Promise<void> {
    await this.userRepository.delete({ email })
  }

  async updateUser (email: string, content: UpdateUserModel): Promise<void> {
    await this.userRepository.update({ email }, content)
  }

  async updatePassword (email: number, password: string): Promise<void> {
    const passwordHash = await this.hashTools.hash(password)
    await this.userRepository.update({ email }, { password: passwordHash })
  }

  async updateEmail (email: number, novoEmail: string): Promise<void> {
    await this.userRepository.update({ email }, { email: novoEmail })
  }

  async updatePosition (email: string, position: string): Promise<void> {
    await this.userRepository.update({ email }, { position })
  }

  async paginationUser (content: PaginationUser): Promise<PaginationResponse<UserModel>> {
    const query: any[] = []

    if (content.search !== undefined) {
      query.push({
        name: 'nome',
        value: content.search,
        type: 'ilike'
      })

      query.push({
        name: 'email',
        value: content.search,
        type: 'ilike'
      })
    }

    return await this.userRepository.pagination({
      page: content.page,
      limit: content.limit,
      model: 'user',
      search: query,
      order: content.order,
      relations: content.relations
    })
  }

  async loadUser (): Promise<void> {
    const users = await this.findByEmail('conta@sandbox.inf.br')
    if (users === null) {
      await this.addUser({
        email: 'conta@sandbox.inf.br',
        nome: 'Admin',
        senha: 'conta123',
        position: 'administrador'
      })
    }
  }

  async createValidInput (content: AddUserModel): Promise<AddUserModel> {
    if (content.email === undefined || content.email === '') {
      throw new MissingParamError('Email não informado')
    }
    if (content.senha === undefined || content.senha === '') {
      throw new MissingParamError('Senha não informada')
    }

    if (content.position === undefined || content.position === '') {
      throw new MissingParamError('Cargo não informado')
    }

    if (!(await this.validatorTools.validateEmail(content.email))) {
      throw new MissingParamError('Email inválido')
    }
    return content
  }
}

interface PaginationUser {
  page: number
  limit: number
  search?: string
  order?: any
  relations?: string[]
}
interface UpdateUserModel {
  nome?: string
  email?: string
  senha?: string
  position?: string
}
interface AddUserModel {
  nome: string
  email: string
  senha: string
  position: string
}
