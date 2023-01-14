import jwt from 'jsonwebtoken'
export class TokenTools {
  async generateToken (data: any, privateKey: string, expire: string): Promise<string> {
    console.log(data, privateKey, expire)
    return jwt.sign({ ...data }, privateKey, { expiresIn: expire })
  }

  async decodeToken (token: string, privateKey: string): Promise<any|null> {
    return jwt.verify(token, privateKey, function (err, decoded) {
      if (err !== null) {
        return null
      }
      return decoded
    })
  }
}
