import * as bcryptjs from "bcryptjs";

export class HashManager {
  public async hash(text: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcryptjs.genSalt(rounds);
    const result = await bcryptjs.hash(text, salt);
    return result;
  }

  public async compare(text: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(text, hash);
  }
}
