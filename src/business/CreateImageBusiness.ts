import { Image, ImageInputDTO, TagsInputDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { TagsDatabase } from "../data/TagsDatabase";

import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidInputError } from "../error/InvalidInputError";
import { SetupError } from "../error/SetupError";

export class CreateImageBusiness {
  constructor(
    private imageDatabase: ImageDatabase,
    private tagsDatabase: TagsDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public async execute(
    imgInputDatas: ImageInputDTO,
    imageTagsName: string[],
    token: string
  ) {
    if (
      !imgInputDatas.subtitle ||
      !imgInputDatas.createdDate ||
      !imgInputDatas.file ||
      !imgInputDatas.collection
    ) {
      throw new InvalidInputError("Missing datas");
    }

    if (!token) {
      throw new SetupError("Invalid token");
    }

    const verifyToken = await this.authenticator.verifyToken(token);
    console.log("teste");
    if (!verifyToken.id) {
      throw new InvalidInputError("Invalid Id");
    }
    console.log("Business", verifyToken.id); ///////////////////////////

    const tagId = await this.tagsDatabase.getTagsIdByName(imageTagsName);
    console.log("tagId"); ////////
    if (!tagId) {
      throw new InvalidInputError("Invalid Tag");
    }

    const imageId = this.idGenerator.generate();
    await this.imageDatabase.createImg(
      new Image(
        imageId,
        imgInputDatas.subtitle,
        verifyToken.id,
        imgInputDatas.createdDate,
        imgInputDatas.file,
        imgInputDatas.collection
      )
    );

    await this.tagsDatabase.insertTagsToImage(imageId, tagId);
    // console.log(imageTagsName, token, imgInputDatas); //////////////
  }
}
