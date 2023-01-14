import { cpf } from 'cpf-cnpj-validator'
import { validate } from 'email-validator'
import validPhone from 'validar-telefone'
export class ValidatorTools {
  async validateEmail (email: string): Promise<boolean> {
    return validate(email)
  }

  async validateCPF (cpfNumber: string): Promise<boolean> {
    return cpf.isValid(cpfNumber)
  }

  async cleanCPF (cpfNumber: string): Promise<string> {
    return cpf.strip(cpfNumber)
  }

  async formatCPF (cpfNumber: string): Promise<string> {
    return cpf.format(cpfNumber)
  }

  async validatePhone (phone: string): Promise<boolean> {
    return validPhone(phone, {
      validarTamanho: true,
      bloquearPadroesIncomuns: true,
      permitirCelular: true
    })
  }
}
