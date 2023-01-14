import bcrypt from 'bcrypt'
export class HashTools {
  async hash (value: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)
    // eslint-disable-next-line @typescript-eslint/return-await
    return await bcrypt.hash(value, salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
