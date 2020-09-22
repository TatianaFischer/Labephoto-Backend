import { ImageDatabase } from "../data/ImageDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { SetupError } from "../error/SetupError";
import { Image } from "../model/Image";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class GetImagesBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private authenticator: Authenticator
  ) {}

  public async execute(token: string): Promise<any> {
    if (!token) {
      throw new SetupError("Invalid token");
    }

    const verifyToken = this.authenticator.verifyToken(token);

    if (!verifyToken) {
      throw new InvalidInputError("Invalid Token");
    }

    const allImages: Image[] = await this.imageDatabase.getAllImages();

    return allImages;
  }
}
