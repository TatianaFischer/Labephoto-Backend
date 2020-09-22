import { ImageDatabase } from "../data/ImageDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { SetupError } from "../error/SetupError";
import { Image } from "../model/Image";
import { Authenticator } from "../services/Authenticator";

export class GetImageByIdBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private authenticator: Authenticator
  ) {}

  public async execute(id: string, token: string): Promise<Image> {
    if (!id || !token) {
      throw new SetupError("Invalid");
    }

    const verifyToken = this.authenticator.verifyToken(token);

    if (!verifyToken) {
      throw new InvalidInputError("Invalid Token");
    }

    const image = await this.imageDatabase.getImageById(id);

    return image;
  }
}
