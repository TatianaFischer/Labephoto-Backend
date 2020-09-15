import * as jwt from "jsonwebtoken";

// import { SetupError } from "../error/SetupError";

export class Authenticator {
  public verifyToken(token: string): TokenData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;

    return {
      id: data.id,
    };
  }

  public generateToken(
    dataInput: TokenData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: dataInput.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }
}

export interface TokenData {
  id: string;
}
