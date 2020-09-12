import * as jwt from "jsonwebtoken";
import { User } from "../model/User";
import { SetupError } from "../error/SetupError";

export class Authenticator {
  private secretKey(): string {
    if (!process.env.JWT_SECRET_KEY) {
      throw new SetupError(
        "Missing authorization secret key. Did you remember to create .env file?"
      );
    }

    return process.env.JWT_SECRET_KEY;
  }

  public generateToken(dataInput: AuthenticationData): string {
    return jwt.sign(dataInput, this.secretKey());
  }

  public verifyToken(token: string): AuthenticationData {
    const payload = jwt.verify(token, this.secretKey()) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
}
