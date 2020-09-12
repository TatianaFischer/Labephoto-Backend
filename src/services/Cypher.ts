import * as bcryptjs from "bcryptjs";
import { SetupError } from "../error/SetupError";

export class Cypher {
  private cost(): number {
    if (!process.env.BCRYPT_COST) {
      throw new SetupError(
        "Missing cypher cost. Did you remember to create .env file?"
      );
    }

    return Number(process.env.BCRYPT_COST);
  }

  public async hash(text: string): Promise<string> {
    const salt = await bcryptjs.genSalt(this.cost());
    const result = bcryptjs.hash(text, salt);
    return result;
  }

  public async compare(text: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(text, hash);
  }
}
