import * as jwt from "jsonwebtoken";

// import { SetupError } from "../error/SetupError";

export class Authenticator {
  public generateToken(dataInput: TokenData, expiresIn: string = "2d"): string {
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

  public verifyToken(token: string): TokenData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;

    const result = {
      id: data.id,
    };

    return result;
  }
}

interface TokenData {
  id: string;
}
